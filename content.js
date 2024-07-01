chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.darkMode !== undefined) {
      toggleDarkMode(request.darkMode);
    }
  });
  
  function toggleDarkMode(darkMode) {
    const existingStyle = document.getElementById('dark-mode-style');
  
    if (darkMode) {
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'dark-mode-style';
        style.textContent = `
          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed,
          figure, figcaption, footer, header, hgroup,
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            background: #000 !important;
            color: #fff !important;
          }
  
          img, video {
            filter: invert(1) hue-rotate(180deg) !important;
          }
        `;
        document.head.appendChild(style);
      }
    } else {
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  }
  
  // Initialize dark mode based on saved setting
  chrome.storage.sync.get('darkMode', function (data) {
    toggleDarkMode(data.darkMode);
  });
  