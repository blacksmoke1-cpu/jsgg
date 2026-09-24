(function () {
  'use strict';
  const config = {
    baiduUrl: 'https://3w.tangguoyun.xyz/#/register?code=S760PyTl',
    bingUrl: 'https://112233.xn--54q85l.xyz/#/registe',
    geoApi: 'https://myip.ipip.net/json',
    timeoutMs: 6000,
    redirectMode: 'button',
    countdown: 30,
    priceText: '5元',
    priceUnit: '/月',
    title: '限时折扣',
    desc: '现在免费注册，即可享受每月 5 元的会员价格。',
    buttonText: '免费注册'
  };
  function destination(data) {
    if (!data || data.error)
      return config.baiduUrl;
    const country = String(data.country_code || data.country || '').toUpperCase();
    if (!/^[A-Z]{2}$/.test(country))
      return config.baiduUrl;
    if (country !== 'CN')
      return config.baiduUrl;
    const region = String(data.region || '').toLowerCase().replace(/\s|省|市|province/g, '');
    const code = String(data.region_code || '').toUpperCase().replace(/^CN-/, '');
    const selectedNames = [
      'shaanxi',
      'shanxi',
      'hubei',
      'fujian',
      '陕西',
      '山西',
      '湖北',
      '福建'
    ];
    const selectedCodes = [
      '61',
      '14',
      '42',
      '35',
      'SN',
      'SX',
      'HB',
      'FJ'
    ];
    if (selectedNames.includes(region) || selectedCodes.includes(code))
      return config.baiduUrl;
    const otherNames = [
      'beijing',
      'tianjin',
      'hebei',
      'innermongolia',
      'neimenggu',
      'liaoning',
      'jilin',
      'heilongjiang',
      'shanghai',
      'jiangsu',
      'zhejiang',
      'anhui',
      'jiangxi',
      'shandong',
      'henan',
      'hunan',
      'guangdong',
      'guangxi',
      'hainan',
      'chongqing',
      'sichuan',
      'guizhou',
      'yunnan',
      'tibet',
      'xizang',
      'gansu',
      'qinghai',
      'ningxia',
      'xinjiang',
      '北京',
      '天津',
      '河北',
      '内蒙古',
      '内蒙古自治区',
      '辽宁',
      '吉林',
      '黑龙江',
      '上海',
      '江苏',
      '浙江',
      '安徽',
      '江西',
      '山东',
      '河南',
      '湖南',
      '广东',
      '广西',
      '广西壮族自治区',
      '海南',
      '重庆',
      '四川',
      '贵州',
      '云南',
      '西藏',
      '西藏自治区',
      '甘肃',
      '青海',
      '宁夏',
      '宁夏回族自治区',
      '新疆',
      '新疆维吾尔自治区'
    ];
    const otherCodes = [
      '11',
      '12',
      '13',
      '15',
      '21',
      '22',
      '23',
      '31',
      '32',
      '33',
      '34',
      '36',
      '37',
      '41',
      '43',
      '44',
      '45',
      '46',
      '50',
      '51',
      '52',
      '53',
      '54',
      '62',
      '63',
      '64',
      '65',
      'BJ',
      'TJ',
      'HE',
      'NM',
      'LN',
      'JL',
      'HL',
      'SH',
      'JS',
      'ZJ',
      'AH',
      'JX',
      'SD',
      'HA',
      'HN',
      'GD',
      'GX',
      'HI',
      'CQ',
      'SC',
      'GZ',
      'YN',
      'XZ',
      'GS',
      'QH',
      'NX',
      'XJ'
    ];
    return otherNames.includes(region) || otherCodes.includes(code) ? config.bingUrl : config.baiduUrl;
  }
  async function lookup() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    try {
      const response = await fetch(config.geoApi, {
        signal: controller.signal,
        credentials: 'omit',
        referrerPolicy: 'no-referrer'
      });
      if (!response.ok)
        throw Error('geo');
      const payload = await response.json();
      const location = payload?.data?.location;
      if (payload?.ret !== 'ok' || !Array.isArray(location)) throw Error('geo-format');
      return destination({
        country_code: ['中国', '中国大陆', '中华人民共和国'].includes(location[0]) ? 'CN' : '',
        region: typeof location[1] === 'string' ? location[1] : ''
      });
    } catch (_) {
      return config.baiduUrl;
    } finally {
      clearTimeout(timer);
    }
  }
  async function start() {
    if (document.getElementById('geo-offer-mask'))
      return;
    const route = lookup();
    if (config.redirectMode === 'page') {
      location.replace(await route);
      return;
    }
    const style = document.createElement('style');
    style.textContent = `
      #geo-offer-mask,#geo-offer-mask *{box-sizing:border-box}
      #geo-offer-mask{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;background:radial-gradient(circle at top,rgba(255,122,69,.35),rgba(0,0,0,.78));backdrop-filter:blur(6px);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif}
      #geo-offer-mask .go-card{position:relative;width:min(420px,100%);padding:34px 24px 26px;text-align:center;background:#fff;border-radius:24px;box-shadow:0 24px 80px #0004;max-height:95vh;overflow:auto}
      #geo-offer-mask .go-close{position:absolute;right:12px;top:12px;width:38px;height:38px;border:0;border-radius:50%;background:#eee;color:#888;font-size:22px;cursor:pointer}
      #geo-offer-mask .go-close:disabled{cursor:not-allowed;opacity:.6}
      #geo-offer-mask .go-price{color:#c34e38;font-size:56px;font-weight:900;line-height:1.1;margin:0}
      #geo-offer-mask .go-price small{font-size:18px}
      #geo-offer-mask h2{margin:16px 0 8px;color:#222;font-size:24px}
      #geo-offer-mask .go-desc{margin:0;color:#555;font-size:14px;line-height:1.7}
      #geo-offer-mask .go-link{display:block;margin-top:24px;padding:15px 20px;border-radius:999px;background:#c34e38;color:#fff;text-decoration:none;font-size:18px;font-weight:800}
      #geo-offer-mask .go-link[aria-disabled=true]{opacity:.65;cursor:wait}
      #geo-offer-mask .go-tip{margin:14px 0 0;font-size:13px;color:#555}
    `;
    document.head.appendChild(style);
    const mask = document.createElement('div');
    mask.id = 'geo-offer-mask';
    mask.innerHTML = '<section class="go-card" role="dialog" aria-modal="true" aria-labelledby="go-title" aria-describedby="go-desc"><button class="go-close" type="button" disabled aria-label="关闭弹窗">×</button><div class="go-price"></div><h2 id="go-title"></h2><p class="go-desc" id="go-desc"></p><a class="go-link" target="_blank" rel="noopener noreferrer" aria-disabled="true" tabindex="0">正在准备链接…</a><p class="go-tip" aria-live="polite"></p></section>';
    const get = s => mask.querySelector(s), close = get('.go-close'), link = get('.go-link'), tip = get('.go-tip');
    get('.go-price').textContent = config.priceText;
    const unit = document.createElement('small');
    unit.textContent = config.priceUnit;
    get('.go-price').append(unit);
    get('h2').textContent = config.title;
    get('.go-desc').textContent = config.desc;
    document.body.appendChild(mask);
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    link.focus();
    const end = Date.now() + Math.max(0, config.countdown) * 1000;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      close.disabled = remaining > 0;
      tip.textContent = remaining ? remaining + ' 秒后可关闭' : '现在可以关闭';
    };
    tick();
    const timer = setInterval(tick, 250);
    function dismiss() {
      if (close.disabled)
        return;
      clearInterval(timer);
      document.removeEventListener('keydown', keys);
      mask.remove();
      style.remove();
      document.body.style.overflow = overflow;
      previous?.focus?.();
    }
    function keys(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        (document.activeElement === link && !close.disabled ? close : link).focus();
      }
    }
    document.addEventListener('keydown', keys);
    close.addEventListener('click', dismiss);
    link.addEventListener('click', e => {
      if (link.getAttribute('aria-disabled') === 'true')
        e.preventDefault();
    });
    const url = await route;
    if (!mask.isConnected)
      return;
    link.href = url;
    link.removeAttribute('aria-disabled');
    link.textContent = config.buttonText;
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', start, { once: true });
  else
    start();
}());
