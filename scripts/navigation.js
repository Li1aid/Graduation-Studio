/**
 * CoLab - Navigation Management
 * 导航栏滚动效果 + 汉堡菜单 (移动端)
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('navMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const navLinks = document.querySelectorAll('.nav-link');

        // ==================================================
        // 导航栏滚动效果: 添加阴影
        // ==================================================
        function handleNavbarScroll() {
            if (window.scrollY > 12) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // 监听滚动事件
        window.addEventListener('scroll', handleNavbarScroll, { passive: true });
        // 初始检查
        handleNavbarScroll();

        // ==================================================
        // 汉堡菜单功能 (移动端)
        // ==================================================
        if (mobileMenuBtn && navMenu && menuOverlay) {
            // 切换菜单开关
            function toggleMenu() {
                const isActive = navMenu.classList.toggle('active');
                menuOverlay.classList.toggle('active', isActive);

                // 更新按钮文本 (可选)
                if (mobileMenuBtn.querySelector('.menu-icon')) {
                    mobileMenuBtn.querySelector('.menu-icon').textContent = isActive ? '✕' : '☰';
                }

                // 禁止/允许body滚动
                document.body.style.overflow = isActive ? 'hidden' : '';
            }

            // 点击汉堡菜单按钮
            mobileMenuBtn.addEventListener('click', toggleMenu);

            // 点击遮罩关闭菜单
            menuOverlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileMenuBtn.querySelector('.menu-icon')) {
                    mobileMenuBtn.querySelector('.menu-icon').textContent = '☰';
                }
            });

            // 点击菜单项后自动关闭菜单
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    // 如果菜单是打开状态,则关闭
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        if (mobileMenuBtn.querySelector('.menu-icon')) {
                            mobileMenuBtn.querySelector('.menu-icon').textContent = '☰';
                        }
                    }
                });
            });

            // 窗口大小改变时,如果变为桌面尺寸,关闭移动菜单
            window.addEventListener('resize', function() {
                if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    if (mobileMenuBtn.querySelector('.menu-icon')) {
                        mobileMenuBtn.querySelector('.menu-icon').textContent = '☰';
                    }
                }
            });
        }

        // ==================================================
        // 自动激活当前页面的导航链接
        // ==================================================
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(function(link) {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === '#')) {
                link.classList.add('active');
            }
        });
    });
})();
