
(() => {
  function init() {
    const ua = navigator.userAgent;
    const isIPhone = /iPhone/i.test(ua);



    if (document.getElementById('safari-helper')) return;
    const messages={"zh":["在 Safari 中打开","如果没有自动打开，可点击下方按钮，或复制链接到 Safari。","打开 Safari ↗","复制链接","继续浏览","页面链接","已尝试打开 Safari；如果 App 提示确认，请选择打开。","未能发起跳转，请复制链接后在 Safari 中打开。","已复制，请打开 Safari 并粘贴链接。","请长按下方地址，手动复制。"],"en":["Open in Safari","If Safari does not open automatically, use the button or copy the link into Safari.","Open Safari ↗","Copy link","Continue browsing","Page link","Safari launch attempted. Confirm opening if the app asks.","Could not launch Safari. Copy the link and open it in Safari.","Link copied. Open Safari and paste it.","Press and hold the address below to copy it."],"es":["Abrir en Safari","Si Safari no se abre automáticamente, usa el botón o copia el enlace.","Abrir Safari ↗","Copiar enlace","Seguir navegando","Enlace de la página","Se intentó abrir Safari. Confirma si la aplicación lo solicita.","No se pudo abrir Safari. Copia el enlace y ábrelo en Safari.","Enlace copiado. Abre Safari y pégalo.","Mantén pulsada la dirección para copiarla."],"fr":["Ouvrir dans Safari","Si Safari ne s’ouvre pas automatiquement, utilisez le bouton ou copiez le lien.","Ouvrir Safari ↗","Copier le lien","Continuer la navigation","Lien de la page","Ouverture de Safari tentée. Confirmez si l’application le demande.","Impossible d’ouvrir Safari. Copiez le lien et ouvrez-le dans Safari.","Lien copié. Ouvrez Safari et collez-le.","Maintenez l’adresse ci-dessous pour la copier."],"de":["In Safari öffnen","Falls Safari nicht automatisch öffnet, nutzen Sie die Schaltfläche oder kopieren Sie den Link.","Safari öffnen ↗","Link kopieren","Weiter surfen","Seitenlink","Safari wurde angefordert. Bestätigen Sie bei einer Nachfrage.","Safari konnte nicht geöffnet werden. Kopieren Sie den Link.","Link kopiert. Öffnen Sie Safari und fügen Sie ihn ein.","Halten Sie die Adresse gedrückt, um sie zu kopieren."],"ja":["Safariで開く","自動で開かない場合は、ボタンを押すかリンクをSafariにコピーしてください。","Safariを開く ↗","リンクをコピー","閲覧を続ける","ページのリンク","Safariを開こうとしました。確認が表示されたら許可してください。","Safariを開けませんでした。リンクをコピーして開いてください。","コピーしました。Safariを開いて貼り付けてください。","下のアドレスを長押ししてコピーしてください。"],"ko":["Safari에서 열기","자동으로 열리지 않으면 버튼을 누르거나 링크를 Safari에 복사하세요.","Safari 열기 ↗","링크 복사","계속 보기","페이지 링크","Safari 열기를 시도했습니다. 앱에서 물으면 열기를 확인하세요.","Safari를 열 수 없습니다. 링크를 복사하여 여세요.","복사했습니다. Safari를 열어 붙여 넣으세요.","아래 주소를 길게 눌러 복사하세요."],"pt":["Abrir no Safari","Se o Safari não abrir automaticamente, use o botão ou copie o link.","Abrir Safari ↗","Copiar link","Continuar navegando","Link da página","Tentativa de abrir o Safari. Confirme se o app solicitar.","Não foi possível abrir o Safari. Copie o link e abra-o no Safari.","Link copiado. Abra o Safari e cole.","Pressione e segure o endereço abaixo para copiar."]};
    const language=String(window.GUIDE_LOCALE||document.documentElement.lang||navigator.language||'en').toLowerCase().split('-')[0];
    const t=messages[language]||messages.en;
    const helperStyle=document.createElement('style');helperStyle.textContent="#safari-helper{position:fixed;inset:0;z-index:99999;background:#fff;color:#444;display:grid;place-items:center;padding:20px;font:14px/1.75 -apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;overflow:auto}#safari-helper[hidden]{display:none}#safari-helper *{box-sizing:border-box}.safari-card{width:min(100%,420px)}.safari-instructions{background:#f3f4f8;border-radius:18px;padding:18px 16px;margin-bottom:20px}.safari-instructions p{margin:0 0 14px}.safari-instructions p:last-child{margin-bottom:0}#safari-helper button{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;min-height:48px;border-radius:999px;padding:12px 18px;font-family:inherit;font-size:14px;font-weight:700;line-height:1.4;cursor:pointer}#safari-open{background:#20c45c;color:#fff;border:0;margin-bottom:12px}#safari-copy{background:#15120e;color:#f4e8c7;border:1px solid #bea05c}#safari-helper button:focus-visible{outline:3px solid #315740;outline-offset:3px}#safari-status{font-size:12px;text-align:center;color:#657064;margin:14px 0 0}#safari-status:empty{display:none}#safari-link{width:100%;padding:10px;font-size:16px;margin-top:12px}@media(max-width:450px){#safari-helper{padding:16px}}";document.head.append(helperStyle);
    const holder=document.createElement('div');holder.innerHTML="<section id=\"safari-helper\" hidden role=\"dialog\" aria-modal=\"true\" aria-label=\"打开 Safari\"><div class=\"safari-card\"><div class=\"safari-instructions\"><p data-instruction=\"0\"></p><p data-instruction=\"1\"></p><p data-instruction=\"2\"></p></div><button type=\"button\" id=\"safari-open\"></button><button type=\"button\" id=\"safari-copy\"></button><p id=\"safari-status\" role=\"status\" aria-live=\"polite\"></p><input id=\"safari-link\" readonly hidden aria-label=\"页面链接\"></div></section>";document.body.append(holder.firstElementChild);
    const helper=document.getElementById('safari-helper');helper.setAttribute('aria-label',t[0]);
    const instructions={"zh":["点击下方按钮，尝试在 Safari 中打开这个页面。","在 iPhone 上，如果系统询问是否打开浏览器，请确认打开。","跳转取决于设备和当前应用支持。无法跳转时，请复制链接并在 Safari 中打开。"],"en":["Tap below to try opening this page in Safari.","On iPhone, confirm opening if the system asks.","Availability depends on your device and app. If switching fails, copy the link and open it in Safari."],"es":["Pulsa el botón para intentar abrir esta página en Safari.","En iPhone, confirma la apertura si el sistema lo solicita.","Depende del dispositivo y la aplicación. Si no funciona, copia el enlace y ábrelo en Safari."],"fr":["Touchez le bouton pour essayer d’ouvrir cette page dans Safari.","Sur iPhone, confirmez si le système le demande.","Cela dépend de votre appareil et de l’application. Sinon, copiez le lien et ouvrez-le dans Safari."],"de":["Tippen Sie unten, um diese Seite in Safari zu öffnen.","Bestätigen Sie auf dem iPhone, wenn das System nachfragt.","Die Unterstützung hängt von Gerät und App ab. Kopieren Sie bei Bedarf den Link und öffnen Sie ihn in Safari."],"ja":["下のボタンからSafariでこのページを開いてみてください。","iPhoneで確認が表示されたら、開くことを許可してください。","端末とアプリの対応状況によります。開けない場合はリンクをコピーしてSafariで開いてください。"],"ko":["아래 버튼을 눌러 Safari에서 이 페이지를 열어 보세요.","iPhone에서 확인을 요청하면 열기를 허용하세요.","기기와 앱 지원에 따라 달라집니다. 안 되면 링크를 복사하여 Safari에서 여세요."],"pt":["Toque no botão para tentar abrir esta página no Safari.","No iPhone, confirme se o sistema solicitar.","Depende do dispositivo e do app. Se não funcionar, copie o link e abra-o no Safari."]};
    helper.querySelectorAll("[data-instruction]").forEach((p,i)=>{p.textContent=(instructions[language]||instructions.en)[i]});
    document.getElementById('safari-open').textContent='◉ '+(language==='zh'?'跳转 Safari':t[2]);document.getElementById('safari-copy').textContent=t[3];document.getElementById('safari-link').setAttribute('aria-label',t[5]);

    const current = new URL(/^https?:$/.test(location.protocol)?location.href:'https://mua855746-maker.github.io/wallet-safety-guide/');
    const telegramMode =
      current.searchParams.get("source") === "telegram";

    const inApp =
      /FBAN|FBAV|FBIOS|Instagram|Telegram|Line\/|Twitter|TikTok|MicroMessenger|GSA\/|YouTube|Snapchat/i.test(ua);

    const isSafari =
      !inApp &&
      /Version\/[\d.]+.*Safari\//i.test(ua) &&
      !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);

    // Telegram 模式强制尝试一次。
    // 目标网址移除该参数，避免 Safari 重复跳转。
    const target = new URL(current.href);
    target.searchParams.delete("source");
    const safariURL = "x-safari-" + target.href;

    const panel = document.getElementById("safari-helper");
    const status = document.getElementById("safari-status");
    const field = document.getElementById("safari-link");

    // 手动按钮不受 Safari 判断或自动尝试次数限制。
    function openSafari() {
      status.textContent =
        t[6];
      try {
        location.assign(safariURL);
      } catch (_) {
        status.textContent =
          t[7];
      }
    }

    document.getElementById("safari-open")
      .addEventListener("click", openSafari);

    document.getElementById("safari-copy")
      .addEventListener("click", async () => {
        try {
          if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard unavailable");
          }
          await navigator.clipboard.writeText(target.href);
          status.textContent = t[8];
        } catch (_) {
          field.hidden = false;
          field.value = target.href;
          field.focus();
          field.select();
          field.setSelectionRange(0, field.value.length);
          status.textContent = t[9];
        }
      });

    if (isIPhone && isSafari && !telegramMode) return;
    panel.hidden = false;
    const background=[...document.body.children].filter(node=>node!==panel);
    background.forEach(node=>{node.inert=true});
    document.body.style.overflow='hidden';
    document.getElementById('safari-open').focus({preventScroll:true});
    if (!isIPhone || location.protocol !== 'https:') return;

    // Chrome and the Google app use the explicit button gesture.
    if (/CriOS|GSA\//i.test(ua)) return;

    // 30 秒内只自动尝试一次。
    try {
      const key = "walletGuideSafariAttemptV2";
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < 30000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch (_) {}

    openSafari();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

