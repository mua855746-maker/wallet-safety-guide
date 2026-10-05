
(() => {
  function init() {
    const ua = navigator.userAgent;
    if (!/iPhone/i.test(ua)) return;
    if (location.protocol !== "https:") return;


    if (document.getElementById('safari-helper')) return;
    const messages={"zh":["在 Safari 中打开","如果没有自动打开，可点击下方按钮，或复制链接到 Safari。","打开 Safari ↗","复制链接","继续浏览","页面链接","已尝试打开 Safari；如果 App 提示确认，请选择打开。","未能发起跳转，请复制链接后在 Safari 中打开。","已复制，请打开 Safari 并粘贴链接。","请长按下方地址，手动复制。"],"en":["Open in Safari","If Safari does not open automatically, use the button or copy the link into Safari.","Open Safari ↗","Copy link","Continue browsing","Page link","Safari launch attempted. Confirm opening if the app asks.","Could not launch Safari. Copy the link and open it in Safari.","Link copied. Open Safari and paste it.","Press and hold the address below to copy it."],"es":["Abrir en Safari","Si Safari no se abre automáticamente, usa el botón o copia el enlace.","Abrir Safari ↗","Copiar enlace","Seguir navegando","Enlace de la página","Se intentó abrir Safari. Confirma si la aplicación lo solicita.","No se pudo abrir Safari. Copia el enlace y ábrelo en Safari.","Enlace copiado. Abre Safari y pégalo.","Mantén pulsada la dirección para copiarla."],"fr":["Ouvrir dans Safari","Si Safari ne s’ouvre pas automatiquement, utilisez le bouton ou copiez le lien.","Ouvrir Safari ↗","Copier le lien","Continuer la navigation","Lien de la page","Ouverture de Safari tentée. Confirmez si l’application le demande.","Impossible d’ouvrir Safari. Copiez le lien et ouvrez-le dans Safari.","Lien copié. Ouvrez Safari et collez-le.","Maintenez l’adresse ci-dessous pour la copier."],"de":["In Safari öffnen","Falls Safari nicht automatisch öffnet, nutzen Sie die Schaltfläche oder kopieren Sie den Link.","Safari öffnen ↗","Link kopieren","Weiter surfen","Seitenlink","Safari wurde angefordert. Bestätigen Sie bei einer Nachfrage.","Safari konnte nicht geöffnet werden. Kopieren Sie den Link.","Link kopiert. Öffnen Sie Safari und fügen Sie ihn ein.","Halten Sie die Adresse gedrückt, um sie zu kopieren."],"ja":["Safariで開く","自動で開かない場合は、ボタンを押すかリンクをSafariにコピーしてください。","Safariを開く ↗","リンクをコピー","閲覧を続ける","ページのリンク","Safariを開こうとしました。確認が表示されたら許可してください。","Safariを開けませんでした。リンクをコピーして開いてください。","コピーしました。Safariを開いて貼り付けてください。","下のアドレスを長押ししてコピーしてください。"],"ko":["Safari에서 열기","자동으로 열리지 않으면 버튼을 누르거나 링크를 Safari에 복사하세요.","Safari 열기 ↗","링크 복사","계속 보기","페이지 링크","Safari 열기를 시도했습니다. 앱에서 물으면 열기를 확인하세요.","Safari를 열 수 없습니다. 링크를 복사하여 여세요.","복사했습니다. Safari를 열어 붙여 넣으세요.","아래 주소를 길게 눌러 복사하세요."],"pt":["Abrir no Safari","Se o Safari não abrir automaticamente, use o botão ou copie o link.","Abrir Safari ↗","Copiar link","Continuar navegando","Link da página","Tentativa de abrir o Safari. Confirme se o app solicitar.","Não foi possível abrir o Safari. Copie o link e abra-o no Safari.","Link copiado. Abra o Safari e cole.","Pressione e segure o endereço abaixo para copiar."]};
    const language=String(window.GUIDE_LOCALE||document.documentElement.lang||navigator.language||'en').toLowerCase().split('-')[0];
    const t=messages[language]||messages.en;
    const helperStyle=document.createElement('style');helperStyle.textContent="\r\n  #safari-helper {\r\n    position: fixed;\r\n    bottom: 16px;\r\n    left: 16px;\r\n    right: 16px;\r\n    max-width: 420px;\r\n    margin: auto;\r\n    padding: 18px;\r\n    background: #fff;\r\n    color: #18251e;\r\n    border: 1px solid #ddd;\r\n    border-radius: 14px;\r\n    box-shadow: 0 8px 32px #0003;\r\n    font: 14px/1.6 system-ui, sans-serif;\r\n    z-index: 99999;\r\n  }\r\n  #safari-helper[hidden] { display: none; }\r\n  #safari-helper p { margin: 0 0 12px; }\r\n  #safari-helper button {\r\n    padding: 10px 14px;\r\n    margin: 4px 6px 4px 0;\r\n    border: 0;\r\n    border-radius: 8px;\r\n    background: #244d3a;\r\n    color: #fff;\r\n    font: inherit;\r\n    cursor: pointer;\r\n  }\r\n  #safari-helper .secondary {\r\n    background: #eee;\r\n    color: #18251e;\r\n  }\r\n  #safari-helper input {\r\n    box-sizing: border-box;\r\n    width: 100%;\r\n    margin-top: 10px;\r\n    padding: 8px;\r\n    font-size: 16px;\r\n  }\r\n\n#safari-helper{box-sizing:border-box;max-height:calc(100dvh - 32px);overflow:auto}#safari-helper *{box-sizing:border-box}";document.head.append(helperStyle);
    const holder=document.createElement('div');holder.innerHTML="<section id=\"safari-helper\" hidden aria-label=\"打开 Safari\">\r\n  <p><strong>在 Safari 中打开</strong></p>\r\n  <p>如果没有自动打开，可点击下方按钮，或复制链接到 Safari。</p>\r\n  <button type=\"button\" id=\"safari-open\">打开 Safari ↗</button>\r\n  <button type=\"button\" id=\"safari-copy\" class=\"secondary\">\r\n    复制链接\r\n  </button>\r\n  <button type=\"button\" id=\"safari-close\" class=\"secondary\">\r\n    继续浏览\r\n  </button>\r\n  <p id=\"safari-status\" role=\"status\" aria-live=\"polite\"></p>\r\n  <input id=\"safari-link\" readonly hidden aria-label=\"页面链接\">\r\n</section>";document.body.append(holder.firstElementChild);
    const helper=document.getElementById('safari-helper');helper.setAttribute('aria-label',t[0]);
    helper.querySelector('strong').textContent=t[0];helper.querySelectorAll('p')[1].textContent=t[1];
    document.getElementById('safari-open').textContent=t[2];document.getElementById('safari-copy').textContent=t[3];document.getElementById('safari-close').textContent=t[4];document.getElementById('safari-link').setAttribute('aria-label',t[5]);

    const current = new URL(location.href);
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

    document.getElementById("safari-close")
      .addEventListener("click", () => {
        panel.hidden = true;
      });

    if (isSafari && !telegramMode) {
      // UA 无法可靠区分所有内置浏览器。
      // 保留一个手动入口，但不自动跳转。
      const manual = document.createElement("button");
      manual.type = "button";
      manual.textContent = t[0];
      manual.style.cssText =
        "position:fixed;bottom:16px;right:16px;" +
        "z-index:99998;padding:10px 14px;border:0;" +
        "border-radius:8px;background:#244d3a;color:white;";
      manual.addEventListener("click", () => {
        panel.hidden = false;
        manual.hidden = true;
      });
      document.body.append(manual);
      return;
    }

    panel.hidden = false;

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

