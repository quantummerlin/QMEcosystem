/**
 * qm-profiles.js — QM Universal Profile System
 *
 * Stores multiple user profiles in localStorage.
 * Each profile: emoji, displayName, fullBirthName, dob, tob, pob, timezone.
 * Exposes window.QMProfiles API used by qm-shell.js and individual reading tools.
 *
 * Auto-prefills common reading tool form inputs when a profile is active.
 */
(function () {
  'use strict';

  var STORE_KEY   = 'qm_profiles_v1';
  var ACTIVE_KEY  = 'qm_active_profile';

  /* ─── Colour tokens ───────────────────────────────────────────── */
  var C = {
    cyan:   '#00f5ff',
    gold:   '#ffd700',
    mag:    '#ff00ff',
    purple: '#9d00ff',
    pink:   '#ff6b9d',
    bg:     '#0a0a0f',
    surf:   '#0f0f1a',
    surf2:  '#141428',
    text:   '#f0e6ff',
    muted:  'rgba(240,230,255,.55)',
  };

  /* ─── Avatar emoji palette ────────────────────────────────────── */
  var AVATARS = [
    '🧙‍♂️','🌟','⭐','🔮','🌙','☀️','🌊','🔥','💫','✨',
    '🦋','🌹','🌺','🌸','🌿','🦉','🦅','🐉','🦁','🐺',
    '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓',
    '🧿','☯️','🔯','⚡','🌀','💎','🪄','🎯',
  ];

  /* ─── Storage helpers ─────────────────────────────────────────── */
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveAll(profiles) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(profiles)); } catch (e) {}
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ─── Public API ──────────────────────────────────────────────── */
  var _listeners = [];

  var QMProfiles = {
    getAll: function () { return loadAll(); },

    getActive: function () {
      var id = localStorage.getItem(ACTIVE_KEY);
      if (!id) return null;
      return loadAll().find(function (p) { return p.id === id; }) || null;
    },

    setActive: function (id) {
      localStorage.setItem(ACTIVE_KEY, id || '');
      _listeners.forEach(function (fn) { try { fn(QMProfiles.getActive()); } catch (e) {} });
    },

    save: function (profile) {
      var all = loadAll();
      if (!profile.id) {
        profile.id = uid();
        profile.createdAt = new Date().toISOString();
        all.push(profile);
      } else {
        var idx = all.findIndex(function (p) { return p.id === profile.id; });
        if (idx >= 0) all[idx] = profile;
        else all.push(profile);
      }
      saveAll(all);
      _listeners.forEach(function (fn) { try { fn(QMProfiles.getActive()); } catch (e) {} });
      return profile;
    },

    delete: function (id) {
      var all = loadAll().filter(function (p) { return p.id !== id; });
      saveAll(all);
      if (localStorage.getItem(ACTIVE_KEY) === id) {
        localStorage.setItem(ACTIVE_KEY, all.length ? all[0].id : '');
      }
      _listeners.forEach(function (fn) { try { fn(QMProfiles.getActive()); } catch (e) {} });
    },

    onChange: function (fn) { _listeners.push(fn); },
  };

  window.QMProfiles = QMProfiles;

  /* ─── CSS ─────────────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('qmp-styles')) return;
    var s = `
.qmp-panel {
  position:fixed;top:0;right:0;bottom:0;z-index:10100;
  width:360px;max-width:95vw;
  background:linear-gradient(180deg,${C.bg} 0%,${C.surf} 100%);
  border-left:1px solid rgba(0,245,255,.12);
  transform:translateX(100%);
  transition:transform .3s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;overflow:hidden;
  font-family:"Exo 2","Orbitron",sans-serif;
}
.qmp-panel.open { transform:translateX(0); }

/* Header */
.qmp-header {
  padding:20px;
  background:linear-gradient(135deg,rgba(0,245,255,.06),rgba(157,0,255,.06));
  border-bottom:1px solid rgba(0,245,255,.1);
  flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
}
.qmp-header-title {
  font-family:"Cinzel Decorative","Cinzel",serif;
  font-size:.95rem;color:${C.gold};
}
.qmp-header-sub {
  font-size:.6rem;color:${C.muted};letter-spacing:.08em;text-transform:uppercase;margin-top:2px;
}
.qmp-close {
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:50%;width:32px;height:32px;
  color:${C.muted};font-size:1rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
.qmp-close:hover { background:rgba(255,0,0,.15);border-color:rgba(255,80,80,.4);color:#ff8080; }

/* Scroll area */
.qmp-scroll {
  flex:1;overflow-y:auto;padding:16px;
}
.qmp-scroll::-webkit-scrollbar { width:3px; }
.qmp-scroll::-webkit-scrollbar-track { background:transparent; }
.qmp-scroll::-webkit-scrollbar-thumb { background:rgba(0,245,255,.2);border-radius:2px; }

/* Profile card */
.qmp-profile-card {
  background:${C.surf2};border:1px solid rgba(255,255,255,.06);
  border-radius:12px;padding:14px;margin-bottom:10px;
  display:flex;align-items:center;gap:12px;
  transition:border-color .2s;cursor:pointer;
  position:relative;
}
.qmp-profile-card:hover { border-color:rgba(0,245,255,.2); }
.qmp-profile-card.active {
  border-color:${C.cyan};
  background:linear-gradient(135deg,rgba(0,245,255,.08),rgba(157,0,255,.05));
  box-shadow:0 0 16px rgba(0,245,255,.1);
}
.qmp-avatar {
  width:46px;height:46px;border-radius:50%;
  background:linear-gradient(135deg,rgba(0,245,255,.15),rgba(157,0,255,.15));
  border:2px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:1.5rem;flex-shrink:0;
}
.qmp-profile-card.active .qmp-avatar { border-color:${C.cyan}; }
.qmp-profile-info { flex:1;min-width:0; }
.qmp-profile-name {
  font-size:.85rem;font-weight:600;color:${C.text};
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.qmp-profile-detail {
  font-size:.62rem;color:${C.muted};margin-top:3px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.qmp-active-badge {
  background:rgba(0,245,255,.12);border:1px solid rgba(0,245,255,.3);
  color:${C.cyan};font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;
  padding:2px 7px;border-radius:10px;flex-shrink:0;
}
.qmp-card-actions {
  display:flex;gap:6px;flex-shrink:0;
}
.qmp-card-btn {
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:6px;padding:4px 8px;color:${C.muted};
  font-size:.6rem;cursor:pointer;transition:all .18s;
  font-family:inherit;
}
.qmp-card-btn:hover { background:rgba(0,245,255,.1);border-color:${C.cyan};color:${C.cyan}; }
.qmp-card-btn.danger:hover { background:rgba(255,80,80,.1);border-color:rgba(255,80,80,.4);color:#ff8080; }

/* Add new button */
.qmp-add-btn {
  width:100%;padding:12px;margin-bottom:16px;
  background:linear-gradient(135deg,rgba(0,245,255,.08),rgba(157,0,255,.06));
  border:1px dashed rgba(0,245,255,.3);border-radius:12px;
  color:${C.cyan};
  font-family:"Orbitron",sans-serif;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;
  cursor:pointer;transition:all .22s;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.qmp-add-btn:hover {
  background:rgba(0,245,255,.14);
  box-shadow:0 0 16px rgba(0,245,255,.15);
}

/* Form */
.qmp-form {
  background:${C.surf2};border:1px solid rgba(0,245,255,.15);
  border-radius:12px;padding:16px;margin-bottom:10px;
}
.qmp-form-title {
  font-family:"Cinzel",serif;font-size:.8rem;color:${C.gold};
  margin:0 0 14px;
}
.qmp-avatar-grid {
  display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;
}
.qmp-avatar-opt {
  width:36px;height:36px;border-radius:8px;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  display:flex;align-items:center;justify-content:center;
  font-size:1.1rem;cursor:pointer;transition:all .15s;
}
.qmp-avatar-opt:hover { background:rgba(0,245,255,.1);border-color:rgba(0,245,255,.3); }
.qmp-avatar-opt.selected { background:rgba(0,245,255,.15);border-color:${C.cyan};box-shadow:0 0 8px rgba(0,245,255,.2); }

.qmp-field { margin-bottom:10px; }
.qmp-label {
  display:block;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;
  color:${C.muted};margin-bottom:4px;
}
.qmp-input {
  width:100%;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);border-radius:8px;
  padding:9px 12px;color:${C.text};
  font-family:"Exo 2",sans-serif;font-size:.82rem;
  outline:none;transition:border-color .2s;box-sizing:border-box;
  -webkit-appearance:none;
}
.qmp-input:focus { border-color:${C.cyan};box-shadow:0 0 0 2px rgba(0,245,255,.1); }
.qmp-input::placeholder { color:rgba(240,230,255,.25); }
/* Style date/time inputs */
.qmp-input[type="date"],.qmp-input[type="time"] {
  color-scheme:dark;
}
.qmp-form-row { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.qmp-form-actions { display:flex;gap:8px;margin-top:14px; }
.qmp-save-btn {
  flex:1;padding:10px;border-radius:8px;
  background:linear-gradient(135deg,${C.cyan},rgba(0,200,220,1));
  border:none;color:${C.bg};
  font-family:"Orbitron",sans-serif;font-size:.65rem;
  letter-spacing:.1em;text-transform:uppercase;font-weight:700;
  cursor:pointer;transition:all .2s;
}
.qmp-save-btn:hover { box-shadow:0 0 20px rgba(0,245,255,.4);transform:translateY(-1px); }
.qmp-cancel-btn {
  padding:10px 16px;border-radius:8px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
  color:${C.muted};font-family:inherit;font-size:.65rem;cursor:pointer;
  transition:all .2s;
}
.qmp-cancel-btn:hover { background:rgba(255,255,255,.1);color:${C.text}; }

/* Empty state */
.qmp-empty {
  text-align:center;padding:32px 16px;
}
.qmp-empty-icon { font-size:3rem;margin-bottom:12px; }
.qmp-empty-text {
  font-size:.85rem;color:${C.muted};line-height:1.6;margin-bottom:4px;
}
.qmp-empty-sub { font-size:.72rem;color:rgba(240,230,255,.3); }

/* Pre-fill toast */
.qmp-prefill-toast {
  position:fixed;bottom:60px;left:50%;transform:translateX(-50%) translateY(20px);
  z-index:10200;
  background:linear-gradient(135deg,rgba(0,245,255,.12),rgba(157,0,255,.1));
  border:1px solid rgba(0,245,255,.3);border-radius:12px;
  padding:12px 18px;display:flex;align-items:center;gap:12px;
  font-family:"Exo 2",sans-serif;font-size:.78rem;color:${C.text};
  backdrop-filter:blur(12px);
  opacity:0;transition:all .3s;pointer-events:none;
  white-space:nowrap;
}
.qmp-prefill-toast.show {
  opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto;
}
.qmp-prefill-toast-name { color:${C.cyan};font-weight:600; }
.qmp-prefill-yes {
  background:rgba(0,245,255,.15);border:1px solid rgba(0,245,255,.3);
  border-radius:6px;padding:4px 12px;color:${C.cyan};
  font-family:"Orbitron",sans-serif;font-size:.58rem;
  letter-spacing:.08em;cursor:pointer;transition:all .18s;
}
.qmp-prefill-yes:hover { background:rgba(0,245,255,.25); }
.qmp-prefill-no {
  background:none;border:none;color:${C.muted};
  font-size:.75rem;cursor:pointer;padding:4px;
}
`;
    var el = document.createElement('style');
    el.id = 'qmp-styles';
    el.textContent = s;
    document.head.appendChild(el);
  }

  /* ─── Panel DOM ───────────────────────────────────────────────── */
  var _panel = null;
  var _formMode = null; // null | 'new' | profileId

  function renderPanel() {
    if (!_panel) return;
    var active  = QMProfiles.getActive();
    var profiles = QMProfiles.getAll();

    var listHtml = '';
    if (profiles.length === 0) {
      listHtml = `
        <div class="qmp-empty">
          <div class="qmp-empty-icon">🌟</div>
          <div class="qmp-empty-text">No profiles yet.<br>Create your first profile to use your details across all readings.</div>
          <div class="qmp-empty-sub">Name · Date of Birth · Time · Place</div>
        </div>`;
    } else {
      listHtml = profiles.map(function (p) {
        var isActive = active && active.id === p.id;
        var detail = [
          p.dob ? fmtDate(p.dob) : '',
          p.tob ? p.tob : '',
          p.pob ? p.pob.split(',')[0] : '',
        ].filter(Boolean).join(' · ');
        return `
        <div class="qmp-profile-card${isActive ? ' active' : ''}" data-id="${p.id}">
          <div class="qmp-avatar">${p.avatar || '🌟'}</div>
          <div class="qmp-profile-info">
            <div class="qmp-profile-name">${esc(p.displayName)}</div>
            <div class="qmp-profile-detail">${esc(detail)}</div>
          </div>
          ${isActive ? '<span class="qmp-active-badge">Active</span>' : ''}
          <div class="qmp-card-actions">
            ${!isActive ? `<button class="qmp-card-btn" data-action="activate" data-id="${p.id}">Use</button>` : ''}
            <button class="qmp-card-btn" data-action="edit" data-id="${p.id}">✏️</button>
            <button class="qmp-card-btn danger" data-action="delete" data-id="${p.id}">🗑</button>
          </div>
        </div>`;
      }).join('');
    }

    var formHtml = '';
    if (_formMode !== null) {
      var editing = (_formMode !== 'new') ? profiles.find(function(p){return p.id===_formMode;}) : null;
      var fv = editing || { avatar: '🌟', displayName: '', fullBirthName: '', dob: '', tob: '', pob: '' };
      var avatarGrid = AVATARS.map(function (a) {
        return `<div class="qmp-avatar-opt${a===fv.avatar?' selected':''}" data-avatar="${a}">${a}</div>`;
      }).join('');
      formHtml = `
      <div class="qmp-form" id="qmpForm">
        <div class="qmp-form-title">${editing ? 'Edit Profile' : 'New Profile'}</div>
        <div class="qmp-avatar-grid">${avatarGrid}</div>
        <div class="qmp-field">
          <label class="qmp-label">Display Name *</label>
          <input class="qmp-input" id="qmpFDisplayName" placeholder="e.g. Sarah" value="${esc(fv.displayName)}">
        </div>
        <div class="qmp-field">
          <label class="qmp-label">Full Birth Name (for numerology)</label>
          <input class="qmp-input" id="qmpFFullName" placeholder="Full name as on birth certificate" value="${esc(fv.fullBirthName||'')}">
        </div>
        <div class="qmp-form-row">
          <div class="qmp-field">
            <label class="qmp-label">Date of Birth *</label>
            <input class="qmp-input" type="date" id="qmpFDob" value="${esc(fv.dob||'')}">
          </div>
          <div class="qmp-field">
            <label class="qmp-label">Time of Birth</label>
            <input class="qmp-input" type="time" id="qmpFTob" value="${esc(fv.tob||'')}">
          </div>
        </div>
        <div class="qmp-field">
          <label class="qmp-label">Place of Birth</label>
          <input class="qmp-input" id="qmpFPob" placeholder="City, Country" value="${esc(fv.pob||'')}">
        </div>
        <input type="hidden" id="qmpFId" value="${editing ? editing.id : ''}">
        <input type="hidden" id="qmpFAvatar" value="${esc(fv.avatar||'🌟')}">
        <div class="qmp-form-actions">
          <button class="qmp-save-btn" id="qmpSaveBtn">Save Profile</button>
          <button class="qmp-cancel-btn" id="qmpCancelBtn">Cancel</button>
        </div>
      </div>`;
    }

    var scroll = _panel.querySelector('.qmp-scroll');
    if (scroll) {
      scroll.innerHTML =
        (_formMode === null ? `<button class="qmp-add-btn" id="qmpAddBtn">+ Create New Profile</button>` : '') +
        formHtml +
        listHtml;
      wireFormEvents(scroll);
    }

    // Update topbar button
    updateTopbarBtn(active);
  }

  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function fmtDate(iso) {
    if (!iso) return '';
    var parts = iso.split('-');
    if (parts.length < 3) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return parts[2] + ' ' + months[parseInt(parts[1],10)-1] + ' ' + parts[0];
  }

  function wireFormEvents(scroll) {
    // Add new profile
    var addBtn = scroll.querySelector('#qmpAddBtn');
    if (addBtn) addBtn.addEventListener('click', function () {
      _formMode = 'new';
      renderPanel();
    });

    // Save
    var saveBtn = scroll.querySelector('#qmpSaveBtn');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      var displayName = scroll.querySelector('#qmpFDisplayName').value.trim();
      if (!displayName) { scroll.querySelector('#qmpFDisplayName').focus(); return; }
      var profile = {
        id:            scroll.querySelector('#qmpFId').value || null,
        avatar:        scroll.querySelector('#qmpFAvatar').value,
        displayName:   displayName,
        fullBirthName: scroll.querySelector('#qmpFFullName').value.trim(),
        dob:           scroll.querySelector('#qmpFDob').value,
        tob:           scroll.querySelector('#qmpFTob').value,
        pob:           scroll.querySelector('#qmpFPob').value.trim(),
      };
      if (!profile.id) profile.id = null;
      var saved = QMProfiles.save(profile);
      QMProfiles.setActive(saved.id);
      _formMode = null;
      renderPanel();
    });

    // Cancel
    var cancelBtn = scroll.querySelector('#qmpCancelBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', function () {
      _formMode = null; renderPanel();
    });

    // Avatar selection
    scroll.querySelectorAll('.qmp-avatar-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        scroll.querySelectorAll('.qmp-avatar-opt').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        var hiddenInput = scroll.querySelector('#qmpFAvatar');
        if (hiddenInput) hiddenInput.value = opt.dataset.avatar;
      });
    });

    // Profile card actions (activate, edit, delete)
    scroll.querySelectorAll('[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var action = btn.dataset.action;
        var id     = btn.dataset.id;
        if (action === 'activate') { QMProfiles.setActive(id); renderPanel(); }
        if (action === 'edit')     { _formMode = id; renderPanel(); }
        if (action === 'delete')   {
          if (confirm('Delete this profile?')) { QMProfiles.delete(id); renderPanel(); }
        }
      });
    });

    // Click card to activate (not on buttons)
    scroll.querySelectorAll('.qmp-profile-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('[data-action]')) return;
        QMProfiles.setActive(card.dataset.id);
        renderPanel();
        setTimeout(closePanel, 400);
      });
    });
  }

  /* ─── Panel open/close ────────────────────────────────────────── */
  function openPanel() {
    if (!_panel) createPanel();
    _formMode = null;
    renderPanel();
    _panel.classList.add('open');
    // show overlay (re-use qms-overlay if available)
    var ov = document.getElementById('qmsOverlay');
    if (ov) ov.classList.add('open');
  }

  function closePanel() {
    if (_panel) _panel.classList.remove('open');
    var ov = document.getElementById('qmsOverlay');
    if (ov) ov.classList.remove('open');
  }

  function createPanel() {
    _panel = document.createElement('div');
    _panel.className = 'qmp-panel';
    _panel.id = 'qmpPanel';
    _panel.innerHTML = `
      <div class="qmp-header">
        <div>
          <div class="qmp-header-title">🌟 Your Profiles</div>
          <div class="qmp-header-sub">Save once · Use everywhere</div>
        </div>
        <button class="qmp-close" id="qmpClose">✕</button>
      </div>
      <div class="qmp-scroll" id="qmpScroll"></div>`;
    document.body.appendChild(_panel);
    _panel.querySelector('#qmpClose').addEventListener('click', closePanel);

    // Close on overlay click
    var ov = document.getElementById('qmsOverlay');
    if (ov) ov.addEventListener('click', closePanel);
  }

  /* ─── Topbar button ───────────────────────────────────────────── */
  function updateTopbarBtn(active) {
    var btn = document.getElementById('qmpTopBtn');
    if (!btn) return;
    if (active) {
      btn.innerHTML = `<span style="font-size:1.1rem">${active.avatar||'🌟'}</span>`;
      btn.title = active.displayName;
      btn.style.borderColor = 'rgba(0,245,255,.4)';
      btn.style.background  = 'rgba(0,245,255,.1)';
    } else {
      btn.innerHTML = '👤';
      btn.title = 'Create Profile';
      btn.style.borderColor = 'rgba(255,255,255,.15)';
      btn.style.background  = 'rgba(255,255,255,.05)';
    }
  }

  /* ─── Auto-prefill ────────────────────────────────────────────── */
  var PREFILL_SELECTORS = {
    name:     ['input[name*="name" i]:not([type=hidden])',
                'input[id*="name" i]:not([type=hidden])',
                'input[placeholder*="your name" i]',
                'input[placeholder*="full name" i]'],
    dob:      ['input[type="date"]',
                'input[name*="dob" i]',
                'input[name*="birth" i]:not([name*="place" i]):not([name*="city" i])',
                'input[placeholder*="birth date" i]',
                'input[placeholder*="date of birth" i]',
                'input[placeholder*="birthdate" i]'],
    tob:      ['input[type="time"]',
                'input[name*="tob" i]',
                'input[name*="birth_time" i]',
                'input[placeholder*="time of birth" i]',
                'input[placeholder*="birth time" i]'],
    pob:      ['input[name*="pob" i]',
                'input[name*="birthplace" i]',
                'input[name*="birth_place" i]',
                'input[placeholder*="place of birth" i]',
                'input[placeholder*="city of birth" i]',
                'input[placeholder*="birth city" i]'],
  };

  function findInput(selectors) {
    for (var i = 0; i < selectors.length; i++) {
      try {
        var el = document.querySelector(selectors[i]);
        if (el && !el.closest('.qms-more') && !el.closest('.qmp-panel')) return el;
      } catch (e) {}
    }
    return null;
  }

  function tryPrefill(profile) {
    if (!profile) return;
    var filled = 0;
    var map = {
      name: profile.displayName || profile.fullBirthName,
      dob:  profile.dob,
      tob:  profile.tob,
      pob:  profile.pob,
    };
    Object.keys(map).forEach(function (key) {
      if (!map[key]) return;
      var input = findInput(PREFILL_SELECTORS[key]);
      if (input && !input.value) {
        input.value = map[key];
        input.dispatchEvent(new Event('input', {bubbles:true}));
        input.dispatchEvent(new Event('change', {bubbles:true}));
        filled++;
      }
    });
    return filled > 0;
  }

  function showPrefillToast(profile) {
    var existing = document.getElementById('qmpPrefillToast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'qmp-prefill-toast';
    toast.id = 'qmpPrefillToast';
    toast.innerHTML = `
      Use <span class="qmp-prefill-toast-name">${esc(profile.displayName)}</span>'s data for this reading?
      <button class="qmp-prefill-yes" id="qmpPrefillYes">Pre-fill ✓</button>
      <button class="qmp-prefill-no" id="qmpPrefillNo">✕</button>`;
    document.body.appendChild(toast);

    setTimeout(function () { toast.classList.add('show'); }, 50);

    toast.querySelector('#qmpPrefillYes').addEventListener('click', function () {
      tryPrefill(profile);
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    });
    toast.querySelector('#qmpPrefillNo').addEventListener('click', function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    });

    // Auto-hide after 8s
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 400);
    }, 8000);
  }

  function checkForPrefill() {
    var profile = QMProfiles.getActive();
    if (!profile) return;
    // Check if there are relevant empty inputs on the page
    var hasDob = !!findInput(PREFILL_SELECTORS.dob);
    var hasName = !!findInput(PREFILL_SELECTORS.name);
    if (hasDob || hasName) {
      setTimeout(function () { showPrefillToast(profile); }, 1200);
    }
  }

  /* ─── Public mount ────────────────────────────────────────────── */
  window.QMProfilesUI = {
    openPanel:  openPanel,
    closePanel: closePanel,
    updateTopbarBtn: function () { updateTopbarBtn(QMProfiles.getActive()); },
    checkForPrefill: checkForPrefill,
    injectCSS:  injectCSS,
  };

  // Auto-init CSS
  if (document.readyState !== 'loading') {
    injectCSS();
  } else {
    document.addEventListener('DOMContentLoaded', injectCSS);
  }

})();
