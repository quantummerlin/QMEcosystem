/* The Blueprint Playbook - Shared JS */
(function () {
    'use strict';

    // Copy prompt to clipboard
    window.copyPrompt = function (btn) {
        const box = btn.closest('.prompt-box') || btn.closest('.prompt-template');
        const pre = box ? box.querySelector('.prompt-text') : null;
        if (!pre) return;

        navigator.clipboard.writeText(pre.textContent).then(function () {
            btn.classList.add('copied');
            btn.textContent = '✓ Copied!';
            showToast('Prompt copied to clipboard!');
            setTimeout(function () { btn.classList.remove('copied'); btn.textContent = '📋 Copy Prompt'; }, 2000);
        }).catch(function () {
            // Fallback
            var ta = document.createElement('textarea');
            ta.value = pre.textContent;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            btn.classList.add('copied');
            btn.textContent = '✓ Copied!';
            showToast('Prompt copied to clipboard!');
            setTimeout(function () { btn.classList.remove('copied'); btn.textContent = '📋 Copy Prompt'; }, 2000);
        });
    };

    function showToast(msg) {
        var toast = document.querySelector('.pb-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'pb-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2200);
    }

    // Smooth scroll for anchor links
    document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
})();
