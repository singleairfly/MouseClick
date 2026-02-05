// 虚拟电厂小程序 JavaScript

// 页面切换功能
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新底部导航状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 根据页面更新对应的tab
    const tabMap = {
        'home': 0,
        'devices': 1,
        'monitor': 2,
        'income': 3,
        'profile': 4
    };
    
    const tabIndex = tabMap[pageId];
    if (tabIndex !== undefined) {
        const tabs = document.querySelectorAll('.tab-item');
        if (tabs[tabIndex]) {
            tabs[tabIndex].classList.add('active');
        }
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 默认显示首页
    showPage('home');
    
    // 添加时间更新
    updateTime();
    setInterval(updateTime, 60000);
    
    // 添加数据模拟动画
    simulateDataUpdate();
});

// 更新时间
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // 可以在这里更新界面上的时间显示
    console.log(`当前时间: ${hours}:${minutes}`);
}

// 模拟数据更新
function simulateDataUpdate() {
    // 模拟实时功率数据变化
    setInterval(() => {
        const powerValue = (10 + Math.random() * 5).toFixed(1);
        const consumptionValue = (7 + Math.random() * 3).toFixed(1);
        const netPower = (powerValue - consumptionValue).toFixed(1);
        
        // 更新功率显示（如果元素存在）
        const powerStats = document.querySelectorAll('.power-stat .stat-value');
        if (powerStats.length >= 3) {
            powerStats[0].textContent = '+' + powerValue + ' kW';
            powerStats[1].textContent = '-' + consumptionValue + ' kW';
            powerStats[2].textContent = (netPower > 0 ? '+' : '') + netPower + ' kW';
        }
    }, 5000);
}

// 点击事件处理
document.addEventListener('click', function(e) {
    // 处理卡片点击效果
    if (e.target.closest('.energy-card') || 
        e.target.closest('.device-card') ||
        e.target.closest('.menu-item')) {
        const card = e.target.closest('.energy-card, .device-card, .menu-item');
        if (card) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        }
    }
});

// 添加页面过渡效果
function addPageTransition(fromPage, toPage) {
    fromPage.style.opacity = '0';
    setTimeout(() => {
        fromPage.classList.remove('active');
        fromPage.style.opacity = '';
        toPage.classList.add('active');
        toPage.style.animation = 'fadeIn 0.3s ease';
    }, 200);
}

// 格式化数字
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 格式化金额
function formatCurrency(amount) {
    return '¥' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 显示提示信息
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// 模拟加载状态
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #1890ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

// 添加旋转动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
