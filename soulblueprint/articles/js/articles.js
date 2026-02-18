/* ========================================================
   SOUL BLUEPRINT GUIDES — INTERACTIONS
   Copy-to-clipboard, scroll animations, progress, steps
   ======================================================== */

(function() {
    'use strict';

    // ---- Reading Progress Bar ----
    function initReadingProgress() {
        const bar = document.querySelector('.reading-progress-bar');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0;
            bar.style.width = pct + '%';
        }, { passive: true });
    }

    // ---- Copy to Clipboard ----
    function copyText(text, btn) {
        navigator.clipboard.writeText(text).then(() => {
            showCopied(btn);
        }).catch(() => {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showCopied(btn);
        });
    }

    function showCopied(btn) {
        if (!btn) return;
        const orig = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '✅ Copied!';
        showToast('Copied to clipboard!');
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = orig;
        }, 2500);
    }

    // ---- Toast Notification ----
    function showToast(msg) {
        let toast = document.getElementById('guides-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'guides-toast';
            toast.style.cssText = `
                position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
                background:#1a1a2e; color:#fff; padding:12px 24px; border-radius:999px;
                font-size:.9rem; font-weight:500; z-index:9999; opacity:0;
                transition: opacity .3s, transform .3s;
                box-shadow: 0 8px 30px rgba(0,0,0,.2);
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2500);
    }

    // ---- Prompt Copy Buttons ----
    function initPromptCopy() {
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.prompt-copy-btn');
            if (!btn) return;
            const box = btn.closest('.prompt-box');
            if (!box) return;
            const pre = box.querySelector('pre');
            if (pre) copyText(pre.textContent, btn);
        });
    }

    // ---- Collapsible Tutorial Steps ----
    function initSteps() {
        document.addEventListener('click', function(e) {
            const header = e.target.closest('.tutorial-step-header');
            if (!header) return;
            const step = header.closest('.tutorial-step');
            if (!step) return;
            step.classList.toggle('collapsed');
        });
    }

    // ---- Scroll Animations (fade-in-up, scale-in, slide-in-left) ----
    function initScrollAnimations() {
        const els = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left');
        if (!els.length) return;
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        els.forEach(el => io.observe(el));
    }

    // ---- Hero Stat Count-Up Animation ----
    function initCountUp() {
        const stats = document.querySelectorAll('.hub-hero-stat-number');
        if (!stats.length) return;
        let fired = false;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !fired) {
                    fired = true;
                    stats.forEach(el => {
                        const raw = el.textContent.trim();
                        const match = raw.match(/^(\d+)/);
                        if (match) {
                            const target = parseInt(match[1], 10);
                            const suffix = raw.replace(match[1], '');
                            const duration = 1600;
                            const start = performance.now();
                            const step = (now) => {
                                const progress = Math.min((now - start) / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                                el.textContent = Math.round(target * eased) + suffix;
                                if (progress < 1) requestAnimationFrame(step);
                            };
                            el.textContent = '0' + suffix;
                            requestAnimationFrame(step);
                        }
                    });
                    io.disconnect();
                }
            });
        }, { threshold: 0.3 });
        stats.forEach(s => io.observe(s));
    }

    // ---- Article List Stagger on Scroll ----
    function initListStagger() {
        const lists = document.querySelectorAll('.articles-list');
        if (!lists.length) return;
        if (!('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.articles-list-item');
                    items.forEach((item, i) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-12px)';
                        item.style.transition = `opacity .4s ease ${i * .05}s, transform .4s ease ${i * .05}s`;
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            });
                        });
                    });
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        lists.forEach(l => io.observe(l));
    }

    // ---- Smooth Scroll for Anchor Links ----
    function initSmoothScroll() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ---- Table of Contents Highlighting ----
    function initTOC() {
        const toc = document.querySelector('.article-toc');
        if (!toc) return;
        const headings = document.querySelectorAll('.article-body h2[id]');
        if (!headings.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    toc.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                    const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
                    if (link) link.classList.add('active');
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' });
        headings.forEach(h => io.observe(h));
    }

    // ---- Init Everything ----
    function init() {
        initReadingProgress();
        initPromptCopy();
        initSteps();
        initScrollAnimations();
        initCountUp();
        initListStagger();
        initSmoothScroll();
        initTOC();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
