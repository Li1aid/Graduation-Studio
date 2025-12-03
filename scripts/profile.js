/**
 * CoLab - Profile Dropdown Management
 * 个人资料下拉菜单 (动态创建并定位)
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const profileBtn = document.querySelector('.profile-btn');
        let profileDropdown = null;

        // 如果没有profile按钮,则不执行
        if (!profileBtn) {
            return;
        }

        // ==================================================
        // 初始化头像按钮 - 显示保存的头像
        // ==================================================
        function initializeProfileButton() {
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

            // 从localStorage读取用户头像信息 (如果有)
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
                        <span class="stat-value">4</span>
                        <span class="stat-label">Courses</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">12</span>
                        <span class="stat-label">Lectures</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">8</span>
                        <span class="stat-label">Tutorials</span>
                    </div>
                </div>
                <div class="profile-menu">
                    <a href="Avatar1.html" class="profile-menu-item">
                        <span>👤</span>
                        <span>My Profile</span>
                    </a>
                    <a href="#" class="profile-menu-item">
                        <span>⚙️</span>
                        <span>Settings</span>
                    </a>
                    <a href="#" class="profile-menu-item">
                        <span>📚</span>
                        <span>My Courses</span>
                    </a>
                    <div class="profile-divider"></div>
                    <a href="#" class="profile-menu-item logout">
                        <span>🚪</span>
                        <span>Logout</span>
                    </a>
                </div>
            `;

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
            const dropdownWidth = dropdown.offsetWidth || 320;
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
            if (!profileDropdown) {
                profileDropdown = createProfileDropdown();
            }

            const isShowing = profileDropdown.classList.contains('show');

            if (!isShowing) {
                // 显示下拉菜单
                positionDropdown(profileDropdown);
                profileDropdown.classList.add('show');

                // 添加外部点击监听
                setTimeout(function() {
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
        profileBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown();
        });

        // 窗口大小改变时重新定位
        window.addEventListener('resize', function() {
            if (profileDropdown && profileDropdown.classList.contains('show')) {
                positionDropdown(profileDropdown);
            }
        });

        // 滚动时重新定位
        window.addEventListener('scroll', function() {
            if (profileDropdown && profileDropdown.classList.contains('show')) {
                positionDropdown(profileDropdown);
            }
        }, { passive: true });
    });
})();
