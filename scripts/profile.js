/**
 * CoLab - Profile Dropdown Management
 * 个人资料下拉菜单 (动态创建并定位)
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const profileBtn = document.querySelector('.profile-btn');
        let profileDropdown = null;

        // 如果没有profile按钮,则不执行
        if (!profileBtn) {
            return;
        }

        // ==================================================
        // 检查登录状态 - 如果有avatarSelection说明已登录
        // ==================================================
        const isLoggedIn = localStorage.getItem('avatarSelection');

        // ==================================================
        // 初始化头像按钮 - 显示保存的头像或Sign Up提示
        // ==================================================
        function initializeProfileButton() {
            if (isLoggedIn) {
                // 已登录：显示用户头像
                const avatarData = localStorage.getItem('avatarSelection');
                if (avatarData) {
                    try {
                        const avatar = JSON.parse(avatarData);
                        if (avatar.avatarSrc) {
                            profileBtn.innerHTML = `<img src="${avatar.avatarSrc}" class="profile-btn-img" alt="Avatar">`;
                        }
                    } catch (e) {
                        console.warn('Failed to parse avatar data for profile button');
                    }
                }
            } else {
                // 未登录：显示Sign Up标志，添加未登录状态类
                profileBtn.classList.add('not-logged-in');
                profileBtn.innerHTML = `<svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>`;
                profileBtn.title = 'Sign Up';
            }
        }

        // 初始化按钮
        initializeProfileButton();

        // ==================================================
        // 创建个人资料下拉菜单
        // ==================================================
        function createProfileDropdown() {
            // 如果已存在,不重复创建
            if (document.getElementById('profileDropdown')) {
                return document.getElementById('profileDropdown');
            }

            const dropdown = document.createElement('div');
            dropdown.id = 'profileDropdown';
            dropdown.className = 'profile-dropdown';

            // 根据登录状态显示不同的内容
            if (isLoggedIn) {
                // 已登录：显示用户菜单
                const avatarData = localStorage.getItem('avatarSelection');
                let avatarHTML = '<svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>';

                if (avatarData) {
                    try {
                        const avatar = JSON.parse(avatarData);
                        if (avatar.avatarSrc) {
                            avatarHTML = `<img src="${avatar.avatarSrc}" class="profile-avatar-img" alt="Avatar">`;
                        }
                    } catch (e) {
                        console.warn('Failed to parse avatar data');
                    }
                }

                dropdown.innerHTML = `
                    <div class="profile-header">
                        <div class="profile-avatar">${avatarHTML}</div>
                        <div class="profile-info">
                            <div class="profile-name">Student</div>
                            <div class="profile-email">student@sydney.edu.au</div>
                        </div>
                    </div>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-value">92%</span>
                            <span class="stat-label">Average</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">3</span>
                            <span class="stat-label">Pending</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">15</span>
                            <span class="stat-label">Completed</span>
                        </div>
                    </div>
                    <div class="profile-menu">
                        <a href="Avatar1.html" class="profile-menu-item">My Profile</a>
                        <a href="#" class="profile-menu-item">Settings</a>
                        <a href="#" class="profile-menu-item">My Courses</a>
                        <div class="profile-divider"></div>
                        <a href="#" class="profile-menu-item logout">Logout</a>
                    </div>
                `;

                // 在创建后立即绑定logout事件监听器
                setTimeout(() => {
                    const logoutLink = dropdown.querySelector('.profile-menu-item.logout');
                    if (logoutLink) {
                        logoutLink.addEventListener('click', function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            // 清除localStorage中的用户数据
                            localStorage.removeItem('avatarSelection');
                            localStorage.removeItem('selectedAvatar');

                            // 重定向到主页
                            window.location.href = 'index.html';
                        });
                    }
                }, 0);
            } else {
                // 未登录：显示Sign Up提示
                dropdown.innerHTML = `
                    <div class="profile-header" style="flex-direction: column; align-items: center; text-align: center; gap: 12px;">
                        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" style="opacity: 0.6;">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        <div>
                            <div class="profile-name">Welcome to CoLab</div>
                            <div class="profile-email" style="font-size: 12px; opacity: 0.7;">Create your profile to get started</div>
                        </div>
                    </div>
                    <div class="profile-menu">
                        <a href="Avatar1.html" class="profile-menu-item" style="justify-content: center; background: var(--primary-color, #0066cc); color: white; border-radius: 6px; margin: 0;">Create Profile</a>
                    </div>
                `;
            }

            document.body.appendChild(dropdown);
            return dropdown;
        }

        // ==================================================
        // 定位下拉菜单到个人资料按钮下方
        // ==================================================
        function positionDropdown(dropdown) {
            const rect = profileBtn.getBoundingClientRect();
            const gap = 16;

            // 计算位置 (固定定位)
            const top = rect.bottom + gap;
            const dropdownWidth = dropdown.offsetWidth || 280;
            const right = window.innerWidth - rect.right;

            // 设置位置
            dropdown.style.top = `${top}px`;
            dropdown.style.right = `${right}px`;
            dropdown.style.left = 'auto';

            // 如果下拉菜单会超出屏幕底部,则向上调整
            const dropdownRect = dropdown.getBoundingClientRect();
            if (dropdownRect.bottom > window.innerHeight - 20) {
                dropdown.style.top = `${rect.top - dropdownRect.height - gap}px`;
            }

            // 如果下拉菜单会超出屏幕左侧,则向右调整
            if (dropdownRect.left < 20) {
                dropdown.style.left = '20px';
                dropdown.style.right = 'auto';
            }
        }

        // ==================================================
        // 切换下拉菜单显示/隐藏
        // ==================================================
        function toggleDropdown() {
            // 如果未登录，直接跳转到Avatar页面
            if (!isLoggedIn) {
                window.location.href = 'Avatar1.html';
                return;
            }

            if (!profileDropdown) {
                profileDropdown = createProfileDropdown();
            }

            const isShowing = profileDropdown.classList.contains('show');

            if (!isShowing) {
                // 显示下拉菜单
                positionDropdown(profileDropdown);
                profileDropdown.classList.add('show');

                // 添加外部点击监听
                setTimeout(function () {
                    document.addEventListener('click', handleOutsideClick);
                }, 0);
            } else {
                // 隐藏下拉菜单
                closeDropdown();
            }
        }

        // ==================================================
        // 关闭下拉菜单
        // ==================================================
        function closeDropdown() {
            if (profileDropdown) {
                profileDropdown.classList.remove('show');
                document.removeEventListener('click', handleOutsideClick);
            }
        }

        // ==================================================
        // 处理外部点击
        // ==================================================
        function handleOutsideClick(event) {
            if (!profileDropdown) return;

            const isClickInside = profileDropdown.contains(event.target) || profileBtn.contains(event.target);

            if (!isClickInside) {
                closeDropdown();
            }
        }

        // ==================================================
        // 事件监听
        // ==================================================
        profileBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown();
        });

        // 窗口大小改变时重新定位
        window.addEventListener('resize', function () {
            if (profileDropdown && profileDropdown.classList.contains('show')) {
                positionDropdown(profileDropdown);
            }
        });

        // 滚动时重新定位
        window.addEventListener('scroll', function () {
            if (profileDropdown && profileDropdown.classList.contains('show')) {
                positionDropdown(profileDropdown);
            }
        }, { passive: true });
    });
})();
