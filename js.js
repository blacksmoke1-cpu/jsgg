
(function () {
  // ========== 配置区 ==========
  const config = {
    // 免费注册按钮的跳转链接（替换成你的实际地址）
    registerUrl: 'https://3w.tangguoyun.xyz/#/register?code=S760PyTl',
    // 倒计时秒数
    countdown: 10,
    // 价格文案
    priceText: '5元',
    priceUnit: '/月',
    // 标题和描述
    title: '限时折扣',
    desc: '现在免费注册，即可享受每月 5 元的会员价格。',
    // 按钮文字
    buttonText: '免费注册'
  };

  // ========== 注入 CSS ==========
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; }

    /* 全屏遮罩 */
    .modal-mask {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: radial-gradient(
        circle at top,
        rgba(255, 122, 69, 0.35),
        rgba(0, 0, 0, 0.78)
      );
      backdrop-filter: blur(6px);
    }

    /* 弹窗卡片 */
    .modal {
      position: relative;
      width: min(420px, 100%);
      padding: 34px 24px 26px;
      text-align: center;
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      animation: pop 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "PingFang SC", "Microsoft YaHei", sans-serif;
    }

    @keyframes pop {
      from { transform: scale(0.92); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }

    /* 关闭按钮 */
    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 50%;
      background: #f0f0f0;
      color: #999;
      font-size: 22px;
      line-height: 1;
      cursor: not-allowed;
      opacity: 0.65;
      transition: 0.2s;
    }

    .close-btn.enabled {
      background: #222;
      color: #fff;
      cursor: pointer;
      opacity: 1;
    }

    .close-btn.enabled:hover {
      transform: rotate(90deg);
    }

    /* 价格 */
    .price {
      color: #ff4d4f;
      font-size: 56px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -2px;
    }

    .price small {
      color: #cf2d30;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0;
    }

    .title {
      margin: 16px 0 8px;
      font-size: 24px;
      color: #222;
    }

    .desc {
      margin: 0;
      color: #666;
      font-size: 14px;
      line-height: 1.7;
    }

    /* 免费注册按钮 */
    .register-btn {
      display: block;
      margin-top: 24px;
      padding: 15px 20px;
      border-radius: 999px;
      background: linear-gradient(135deg, #ff7a45, #ff4d4f);
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      font-weight: 800;
      box-shadow: 0 10px 24px rgba(255, 77, 79, 0.35);
      transition: 0.2s;
    }

    .register-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 28px rgba(255, 77, 79, 0.42);
    }

    .register-btn:active {
      transform: translateY(0);
    }

    .tip {
      margin: 14px 0 0;
      font-size: 13px;
      color: #666;
    }
  `;
  document.head.appendChild(style);

  // ========== 创建弹窗 DOM ==========
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  mask.id = 'modalMask';
  mask.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
      <button class="close-btn" id="closeBtn" type="button" disabled aria-label="关闭弹窗">×</button>
      <div class="price">${config.priceText}<small>${config.priceUnit}</small></div>
      <h2 class="title" id="modalTitle">${config.title}</h2>
      <p class="desc" id="modalDesc">${config.desc}</p>
      <a class="register-btn" id="registerBtn" href="${config.registerUrl}" target="_blank" rel="noopener noreferrer">${config.buttonText}</a>
      <p class="tip" id="tip" aria-live="polite">${config.countdown} 秒后可关闭</p>
    </div>
  `;
  document.body.appendChild(mask);

  // ========== 逻辑控制 ==========
  const closeBtn = document.getElementById('closeBtn');
  const tip = document.getElementById('tip');

  // 弹窗期间禁止页面滚动
  document.body.style.overflow = 'hidden';

  let remain = config.countdown;
  tip.textContent = remain + ' 秒后可关闭';

  const timer = setInterval(function () {
    remain -= 1;
    if (remain > 0) {
      tip.textContent = remain + ' 秒后可关闭';
    } else {
      clearInterval(timer);
      closeBtn.disabled = false;
      closeBtn.classList.add('enabled');
      tip.textContent = '现在可以关闭';
    }
  }, 1000);

  // 关闭弹窗
  closeBtn.addEventListener('click', function () {
    if (closeBtn.disabled) return;
    mask.style.display = 'none';
    document.body.style.overflow = '';
  });
})();
