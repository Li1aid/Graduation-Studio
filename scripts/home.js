/**
 * CoLab - Home Page Specific Functions
 * Coachmark提示系统 - 引导用户创建头像
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const profileAnchor = document.getElementById('profileAnchor') || document.querySelector('.profile-btn');
        const gateLinks = document.querySelectorAll('.gate-link');

        let cmEl = null;

        // ==================================================
        // 显示Coachmark提示
        // ==================================================
        function showCoachmark(labelText, onContinue) {
            if (!profileAnchor) {
                console.warn('Profile anchor not found');
                return;
            }

            // 如果已经显示,只需重新定位
            if (cmEl) {
                positionCoachmark(cmEl);
                return;
            }

            // 创建Coachmark元素
            cmEl = document.createElement('div');
            cmEl.className = 'coachmark';
            cmEl.innerHTML = `
                <div class="cm-title">Create your profile</div>
                <div>Please set up your profile (add an avatar) before opening <b>${labelText}</b>.</div>
                <div class="cm-actions">
                    <button class="cm-btn ghost" id="cmLater">Later</button>
                    <button class="cm-btn primary" id="cmCreate">Create profile</button>
                </div>
            `;

            document.body.appendChild(cmEl);
            positionCoachmark(cmEl);

            // 绑定按钮事件
            const createBtn = cmEl.querySelector('#cmCreate');
            const laterBtn = cmEl.querySelector('#cmLater');

            if (createBtn) {
                createBtn.addEventListener('click', function () {
                    window.location.href = 'Avatar1.html';
                });
            }

            if (laterBtn) {
                laterBtn.addEventListener('click', hideCoachmark);
            }

            // 监听窗口变化
            window.addEventListener('resize', onViewportChange);
            window.addEventListener('scroll', onViewportChange, { passive: true });

            // 延迟添加外部点击监听 (避免立即触发)
            setTimeout(function () {
                document.addEventListener('click', onDocClick, true);
            }, 0);
        }

        // ==================================================
        // 定位Coachmark到头像按钮下方，箭头指向头像
        // ==================================================
        function positionCoachmark(el) {
            if (!profileAnchor) return;

            const rect = profileAnchor.getBoundingClientRect();
            const gap = 10;
            const top = rect.bottom + gap + window.scrollY;
            const cmW = el.offsetWidth || 280;

            // 计算left位置 (居中对齐)
            let left = rect.left + rect.width / 2 - cmW / 2 + window.scrollX;

            // 确保不超出屏幕边界
            const minPad = 8;
            left = Math.max(
                minPad + window.scrollX,
                Math.min(left, window.scrollX + document.documentElement.clientWidth - cmW - minPad)
            );

            el.style.top = `${top}px`;
            el.style.left = `${left}px`;
            
            // 计算箭头位置：箭头应该指向头像按钮的中心
            // 按钮中心相对于Coachmark的位置
            const btnCenterX = rect.left + rect.width / 2;
            const cmLeftEdge = left + window.scrollX;
            const arrowLeftPercent = ((btnCenterX - cmLeftEdge) / cmW) * 100;
            
            // 设置箭头位置
            el.style.setProperty('--arrow-left', `${arrowLeftPercent}%`);
        }

        // ==================================================
        // 视口变化时重新定位
        // ==================================================
        function onViewportChange() {
            if (cmEl) {
                positionCoachmark(cmEl);
            }
        }

        // ==================================================
        // 处理外部点击关闭
        // ==================================================
        function onDocClick(e) {
            if (!cmEl) return;

            const within = cmEl.contains(e.target) || profileAnchor.contains(e.target);
            if (!within) {
                hideCoachmark();
            }
        }

        // ==================================================
        // 隐藏Coachmark
        // ==================================================
        function hideCoachmark() {
            if (!cmEl) return;

            // 移除事件监听
            document.removeEventListener('click', onDocClick, true);
            window.removeEventListener('resize', onViewportChange);
            window.removeEventListener('scroll', onViewportChange);

            // 移除元素
            cmEl.remove();
            cmEl = null;
        }

        // ==================================================
        // 拦截"需要创建头像"的链接点击
        // ==================================================
        gateLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const href = link.getAttribute('href') || '#';
                const label = link.getAttribute('data-label') || 'this page';

                // 检查是否已有头像 (根据avatarSelection判断)
                const hasAvatar = localStorage.getItem('avatarSelection');

                if (!hasAvatar) {
                    // 如果没有头像,显示Coachmark
                    showCoachmark(label, function () {
                        window.location.href = href;
                    });
                } else {
                    // 如果有头像,直接跳转
                    window.location.href = href;
                }
            });
        });

        // ==================================================
        // 可选：检测用户是否首次访问
        // ==================================================
        const isFirstVisit = !localStorage.getItem('hasVisitedHome');
        if (isFirstVisit) {
            localStorage.setItem('hasVisitedHome', 'true');
            // 可以在这里添加首次访问的欢迎提示
            console.log('Welcome to CoLab! 🎓');
        }
    });
})();
