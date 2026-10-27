const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
function setup({ready=true,response={ok:true,receiptId:'receipt-test'},httpOK=true,reject=false}={}){
 const node=()=>({textContent:'',disabled:true,classList:{toggle(){},remove(){},contains(){return false}},addEventListener(k,v){this[k]=v},setAttribute(){},getAttribute(){return 'false'},contains(){return false},focus(){},showModal(){},close(){},append(){}});
 const els=Object.fromEntries(['.header','.menu-toggle','#navigation','.dialog','#dialog-message','#inquiry','#submit-inquiry','#connection-notice','#form-status'].map(k=>[k,node()]));
 const form=els['#inquiry'];form.elements={type:{value:'배달 문의',options:[{value:'배달 문의'}]},name:{value:'테스트'},phone:{value:'01000000000'},region:{value:''},message:{value:'테스트 문의 내용입니다.'},consent:{checked:true},website:{value:''}};for (const field of Object.values(form.elements)) { field.setCustomValidity=function(message){this.error=message};field.addEventListener=function(){}; }form.reportValidity=()=>!Object.values(form.elements).some(f=>f.error);form.reset=()=>{form.wasReset=true};
 let calls=0;const config={company:{},form:{enabled:ready,endpoint:ready?'https://example.invalid/contact':''},privacy:{approved:true,controller:'검수',retention:'검수 기간',contact:'검수 담당'}};
 const window={GABAEDANG:config,scrollY:0,addEventListener(){}};const document={querySelector:k=>els[k],querySelectorAll:()=>[],addEventListener(){}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),{window,document,matchMedia:()=>({addEventListener(){}}),location:{search:''},URL,URLSearchParams,AbortController,setTimeout,clearTimeout,fetch:async()=>{calls++;if(reject)throw Error('network');return {ok:httpOK,json:async()=>response}}});
 return {form,els,get calls(){return calls},submit:()=>form.submit({preventDefault(){}})};
}
test('미연결 상태는 전송하지 않음',async()=>{const c=setup({ready:false});await c.submit();assert.equal(c.calls,0);assert.equal(c.els['#submit-inquiry'].disabled,true);assert.match(c.els['#form-status'].textContent,/전송되지/)});
test('저장 확인 응답과 접수번호가 있어야 성공',async()=>{const c=setup();await c.submit();assert.equal(c.calls,1);assert.equal(c.form.wasReset,true);assert.match(c.els['#form-status'].textContent,/receipt-test/)});
test('2xx만으로는 성공 표시하지 않음',async()=>{const c=setup({response:{success:true}});await c.submit();assert.equal(c.form.wasReset,undefined);assert.match(c.els['#form-status'].textContent,/확인하지 못/)});
test('서버 오류 시 입력 유지',async()=>{const c=setup({httpOK:false});await c.submit();assert.equal(c.form.wasReset,undefined);assert.equal(c.els['#submit-inquiry'].disabled,false)});
test('네트워크 실패 시 입력 유지',async()=>{const c=setup({reject:true});await c.submit();assert.equal(c.form.wasReset,undefined);assert.match(c.els['#form-status'].textContent,/확인하지 못/)});
test('스팸 필드가 채워지면 전송하지 않음',async()=>{const c=setup();c.form.elements.website.value='spam';await c.submit();assert.equal(c.calls,0)});

test('공백뿐인 이름은 전송하지 않음',async()=>{const c=setup();c.form.elements.name.value='   ';await c.submit();assert.equal(c.calls,0)});
test('공백뿐인 문의 내용은 전송하지 않음',async()=>{const c=setup();c.form.elements.message.value='            ';await c.submit();assert.equal(c.calls,0)});
test('빈 접수번호는 성공 처리하지 않음',async()=>{const c=setup({response:{ok:true,receiptId:'  '}});await c.submit();assert.equal(c.form.wasReset,undefined);assert.match(c.els['#form-status'].textContent,/확인하지 못/)});
