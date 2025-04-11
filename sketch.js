const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 動態生成選單
function createMenu() {
    const menu = document.createElement('ul');
    menu.style.position = 'absolute';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.listStyle = 'none';
    menu.style.margin = '0';
    menu.style.padding = '0';
    menu.style.display = 'flex';
    menu.style.gap = '30px'; // 選單項目之間的間距
    menu.style.zIndex = '3'; // 最上層

    const menuItems = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.style.backgroundColor = 'rgba(162, 210, 255, 0.2)'; // 背景顏色透明度 0.2
        li.style.padding = '10px 15px';
        li.style.height = '50px'; // 選項高度
        li.style.lineHeight = '30px'; // 垂直置中
        li.style.borderRadius = '10px'; // 邊框圓角
        li.style.border = '2px solid #a2d2ff'; // 邊框顏色
        li.style.color = 'white'; // 字體顏色
        li.style.fontFamily = '"微軟正黑體", Arial, sans-serif'; // 字體
        li.style.fontSize = '20px'; // 字體大小
        li.style.cursor = 'pointer';
        li.style.transition = 'color 0.3s, background-color 0.3s';

        // 滑鼠懸停效果
        li.addEventListener('mouseover', () => {
            li.style.color = '#1d3557'; // 滑鼠移動到上面時文字顏色
        });
        li.addEventListener('mouseout', () => {
            li.style.color = 'white'; // 滑鼠移開時恢復文字顏色
        });

        // 如果是作品集，加入子選單
        if (item === '作品集') {
            const submenu = document.createElement('ul');
            submenu.style.position = 'absolute';
            submenu.style.top = '100%'; // 子選單位置設為作品集正下方
            submenu.style.left = '0'; // 子選單與作品集左對齊
            submenu.style.backgroundColor = 'rgba(162, 210, 255, 0.2)';
            submenu.style.listStyle = 'none';
            submenu.style.padding = '10px';
            submenu.style.borderRadius = '10px';
            submenu.style.display = 'none';
            submenu.style.zIndex = '3';

            const subItems = [
                { name: '第一周', url: 'https://linnnn602.github.io/20250328-1/' },
                { name: '第二周', url: 'https://hackmd.io/@HLqeQe86ToeLEV2jVFo2Kg/Hk5cCIqn1x' },
                { name: '第三周', url: 'https://hackmd.io/@HLqeQe86ToeLEV2jVFo2Kg/B1z_65mTJl' },
                { name: '第四周', url: 'https://example.com' }
            ];

            subItems.forEach(subItem => {
                const subLi = document.createElement('li');
                subLi.textContent = subItem.name;
                subLi.style.margin = '5px 0';
                subLi.style.padding = '5px 10px';
                subLi.style.cursor = 'pointer';
                subLi.addEventListener('click', () => loadIframe(subItem.url));
                submenu.appendChild(subLi);
            });

            li.appendChild(submenu);

            // 顯示/隱藏子選單
            li.addEventListener('mouseover', () => {
                submenu.style.display = 'block';
            });
            li.addEventListener('mouseout', () => {
                submenu.style.display = 'none';
            });
        }

        menu.appendChild(li);
    });

    document.body.appendChild(menu);
}

// 載入 iframe
function loadIframe(url) {
    let iframe = document.getElementById('iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'iframe';
        iframe.style.position = 'absolute';
        iframe.style.top = '10%';
        iframe.style.left = '10%';
        iframe.style.width = '80%';
        iframe.style.height = '80%';
        iframe.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // 背景透明度 0.2
        iframe.style.border = 'none';
        iframe.style.zIndex = '2'; // 第二層
        document.body.appendChild(iframe);
    }
    iframe.src = url;
    iframe.style.display = 'block';
}

// 設定畫布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];
const numCircles = 40;

// 初始化圓的資料
for (let i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 70 + 30, // 大小範圍 30 到 100
        color: `hsl(${Math.random() * 360}, 100%, 50%)` // 鮮豔顏色
    });
}

// 繪製圓
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });
}

// 監聽滑鼠移動事件
window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const scaleFactor = mouseX / canvas.width; // 根據滑鼠位置計算比例
    circles.forEach(circle => {
        circle.size = 10 + scaleFactor * 110; // 大小範圍 10 到 120
    });
    drawCircles();
});

// 畫布大小調整時更新
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircles();
});

// 初始繪製
drawCircles();
createMenu(); // 動態生成選單