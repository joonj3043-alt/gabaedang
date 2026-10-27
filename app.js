'use strict';
(() => {
  const config = window.GABAEDANG || {};
  const $ = (s) => document.querySelector(s);
  const setText = (s, text) => document.querySelectorAll(s).forEach(el => { el.textContent = text; });
  const header = $('.header');
  const toggle = $('.menu-toggle');
  const nav = $('#navigation');
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', '메뉴 열기'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  matchMedia('(min-width:801px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  const scroll = () => header.classList.toggle('scrolled', window.scrollY > 70);
  window.addEventListener('scroll', scroll, { passive: true }); scroll();
  const dialog = $('.dialog');
  function notify(message) { $('#dialog-message').textContent = message; dialog.showModal(); }
  dialog.addEventListener('click', e => { if (e.target === dialog) { const b=dialog.getBoundingClientRect(); if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom) dialog.close(); } });
  function httpsUrl(value) { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch { return ''; } }
  const phone = typeof config.phone === 'string' ? config.phone.trim() : '';
  const validPhone = /^[+\d][\d ()-]{7,19}$/.test(phone);
  if (validPhone) setText('[data-phone-label]', phone);
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.contact === 'phone') {
      if (validPhone) window.location.href = 'tel:' + phone.replace(/[^+\d]/g, '');
      else notify('대표번호가 아직 등록되지 않았습니다. 현재 전화 상담을 연결할 수 없습니다.');
    } else {
      const url = httpsUrl(config.kakaoUrl);
      if (url && new URL(url).hostname === 'pf.kakao.com') window.open(url, '_blank', 'noopener,noreferrer');
      else notify('카카오톡 상담 채널이 아직 연결되지 않았습니다. 고객사 채널 확인 후 이용할 수 있습니다.');
    }
  }));
  const company = config.company || {};
  const fields = [company.legalName, company.ceo && '대표 ' + company.ceo, company.registration && '사업자등록번호 ' + company.registration, company.address, validPhone && '대표번호 ' + phone].filter(Boolean);
  if (fields.length) setText('[data-company-info]', fields.join(' · '));
  const privacy = config.privacy || {};
  if (privacy.retention) setText('[data-retention]', privacy.retention);
  if (privacy.controller) setText('[data-controller]', privacy.controller);
  if (privacy.contact) setText('[data-privacy-contact]', privacy.contact);
  const siteUrl = httpsUrl(config.siteUrl);
  if (siteUrl) {
    const base = siteUrl.endsWith('/') ? siteUrl : siteUrl + '/';
    const canonical = $('link[rel="canonical"]') || document.createElement('link'); canonical.rel = 'canonical'; canonical.href = new URL(location.pathname.split('/').pop() || 'index.html', base); document.head.append(canonical);
    $('meta[property="og:image"]').content = new URL('assets/hero-v2.webp', base).href;
  }
  const form = $('#inquiry');
  if (!form) return;
  const requested = new URLSearchParams(location.search).get('type');
  if ([...form.elements.type.options].some(o => o.value === requested)) form.elements.type.value = requested;
  const endpoint = httpsUrl(config.form?.endpoint);
  const ready = config.form?.enabled === true && !!endpoint && privacy.approved === true && !!privacy.controller && !!privacy.retention && !!privacy.contact;
  const submit = $('#submit-inquiry');
  if (ready) {
    submit.disabled = false; submit.textContent = '상담 문의 접수하기 →';
    $('#connection-notice').textContent = '문의 내용을 확인하고 개인정보 수집·이용에 동의한 뒤 접수해 주세요.';
    $('#form-status').textContent = '전송 결과는 이 영역에 안내됩니다.';
  }
  ['name', 'message'].forEach(key => form.elements[key].addEventListener('input', () => form.elements[key].setCustomValidity('')));
  let sending = false;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const status = $('#form-status');
    if (!ready) { status.textContent = '접수 서비스가 연결되지 않아 전송되지 않았습니다.'; return; }
    if (sending || form.elements.website.value) return;
    const nameField = form.elements.name;
    const messageField = form.elements.message;
    nameField.setCustomValidity(nameField.value.trim() ? '' : '이름을 입력해 주세요.');
    messageField.setCustomValidity(messageField.value.trim().length >= 10 ? '' : '공백을 제외한 문의 내용을 10자 이상 입력해 주세요.');
    if (!form.reportValidity()) return;
    sending = true;
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true; submit.textContent = '전송 중…';
    status.textContent = '접수 결과를 확인하고 있습니다. 창을 닫지 마세요.';
    const abort = new AbortController(); const timer = setTimeout(() => abort.abort(), 15000);
    try {
      const payload = {type:form.elements.type.value, name:form.elements.name.value.trim(), phone:form.elements.phone.value.trim(), region:form.elements.region.value.trim(), message:form.elements.message.value.trim(), consent:true};
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(payload), signal:abort.signal, credentials:'omit', redirect:'error'});
      const result = await response.json();
      if (!response.ok || result.ok !== true || typeof result.receiptId !== 'string' || !result.receiptId.trim()) throw new Error('unconfirmed');
      status.textContent = '문의가 접수되었습니다. 접수번호: ' + result.receiptId.slice(0,100); form.reset();
    } catch {
      status.textContent = '접수 완료를 확인하지 못했습니다. 입력 내용은 유지됩니다. 중복 접수를 방지하려면 상담 채널에서 접수 여부를 확인해 주세요.';
    } finally { clearTimeout(timer); sending = false; form.setAttribute('aria-busy', 'false'); submit.disabled = false; submit.textContent = '상담 문의 접수하기 →'; }
  });
})();
