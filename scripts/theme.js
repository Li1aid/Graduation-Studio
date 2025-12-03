/**
 * CoLab - Theme Management
 * 主题切换功能：浅色/深色模式持久化
 */

(function() {
    'use strict';

    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggleSwitch = document.getElementById('themeToggle');
        const html = document.documentElement;

        // 从localStorage读取当前主题,默认为light
        const currentTheme = localStorage.getItem('theme') || 'light';

        // 应用主题到HTML元素
        html.setAttribute('data-theme', currentTheme);

        // 更新主题切换开关状态
        if (themeToggleSwitch) {
            themeToggleSwitch.checked = (currentTheme === 'dark');

            // 监听主题切换事件
            themeToggleSwitch.addEventListener('change', function() {
                const newTheme = themeToggleSwitch.checked ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                // 可选：触发自定义事件,供其他模块监听
                const themeChangeEvent = new CustomEvent('themeChanged', {
                    detail: { theme: newTheme }
                });
                document.dispatchEvent(themeChangeEvent);
            });
        }
    });
})();
