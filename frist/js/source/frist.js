(() => {
  const LINK_TITLE = 'Review or edit item';
  const BILLING_TITLE = 'Billing Information';
  const EMPTY_CART_TEXT = 'Empty cart';
  const DELIVERY_TEXT = 'How do you want us to deliver your tickets?';
  const ALT_CART_IMAGE = 'Cart item image';
  const ARIA_DEFAULT = 'Invisible link';
  const CDN = 'https://dev.juliangalvez.xyz/frist';

  const loadCSS = () => {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `${CDN}/css/main.css`;
    // link.href = 'css/main.css';
    link.media = 'all';
    head.appendChild(link);
  }

  const dynamicallyLoadScript = (url, content) => {
    var script = document.createElement('script');  // create a script DOM node
    if (url) {
      script.src = url;  // set its src to the provided URL
    } else if (content) {
      script.textContent = content;
    }
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
  };

  // Function to fix WCAG issues
  const WCAG = () => {
    // define alt attribute for cart images
    $('img.img-responsive.cartImg').attr('alt', ALT_CART_IMAGE);

    // change section to div
    // const element = $('section')[0];
    // const res = $('<div/>', {
    //   html: element.innerHTML,
    //   class: element.className,
    // });
    // element.replaceWith(res[0]);

    //Fix autocomplete
    $('input[id*="_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]').attr('autocomplete', 'current-password');

    //Remove empty headings
    $('h3, h2, h1, h4, h5, h6').each((a, b) => {
      const e = $(b);
      if (e.text().trim() === '') {
        e.remove();
      }
    });

    // put default alt to images without alt (basically hidden images)
    $('img').each((index, item) => {
      const element = $(item);
      if (!element.attr('alt')) {
        element.attr('alt', ALT_CART_IMAGE);
      }
    });

    $('a').each((index, item) => {
      const element = $(item);
      if (!element.attr('aria-label') && element.find('img').length === 0) {
        const text = element.text().trim();
        if (text !== '') {
          element.attr('aria-label', text);
          return;
        }
        let title = element.attr('title');
        if (title) {
          title = title.trim().replace(/:/g, '').trim();
          element.attr('aria-label', title);
          return;
        }
        element.text(ARIA_DEFAULT);
        element.attr('aria-label', ARIA_DEFAULT);
      }
    });
  };

  // Function to change AM and PM to a.m. and p.m.
  const changeAMPM = (val) => val.replace(/AM/g, 'a.m.').replace(/PM/g, 'p.m.');

  // Function add HTML for date and time action links
  const dateTimeActions = () => {
    $('h2.Programming_Event_DateContainer + span a').text('Select other dates');
    $('h2.Programming_Event_TimeContainer + span a').text('See other times');
  };

  // set favicon function
  const setFavicon = () => {
    document.querySelector("link[rel*='ICON']").remove();
    const l32 = document.createElement('link');
    l32.type = 'image/x-icon';
    l32.rel = 'shortcut icon';
    l32.sizes= '32x32'
    l32.href = `${CDN}/assets/favicon-32x32.png`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(l32);
    const l16 = document.createElement('link');
    l16.type = 'image/x-icon';
    l16.rel = 'shortcut icon';
    l16.sizes= '16x16'
    l16.href = `${CDN}/assets/favicon-16x16.png`;
    head.appendChild(l16);
  };

  // Function to change date and time html
  const transformDateAndTime = () => {
    const dateElement = $('.Programming_Event_Date');
    const parts = dateElement.text().split(' ');
    if (parts.length > 0) {
      let newDate = `${parts.shift()},`;
      if (parts.length == 2) {
        newDate = `${newDate} ${parts.join(' ')}, ${new Date().getFullYear()}`;
      } else {
        const year = parts.pop();
        newDate = `${newDate} ${parts.join(' ')}, ${year}`;
      }
      dateElement.text(newDate);
    }
    let time = `${$('.Programming_Event_StartTime').text().trim()}–${$('.Programming_Event_EndTime').text().trim()}`;
    time = changeAMPM(time);
    $('.Programming_Event_TimeInnerContainer_Custom').text(time);
  };

  // Function to change AMPM on checkout page
  const transformCheckoutTime = () => {
    $('.PaymentPart_CartItemDetails > div > span').each((index, item) => {
      const element = $(item);
      element.text(changeAMPM(element.text()));
    });
  };

  // Function to load Google Translate
  const loadGoogleTranslate = () => {
    dynamicallyLoadScript(null, `
      function googleTranslateElementInit2() {
        new google.translate.TranslateElement({ pageLanguage: 'en',autoDisplay: false }, 'google_translate_element2');
      }
    `);
    dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2', null);
    dynamicallyLoadScript(null, `
    /* <![CDATA[ */
      function GTranslateFireEvent(element, event) {
        try {
          if (document.createEventObject) {
            var evt = document.createEventObject();
            element.fireEvent('on' + event, evt)
          } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt)
          }
        } catch (e) {}
      }
    
      function doGTranslate(lang_pair) {
        if (lang_pair.value) lang_pair = lang_pair.value;
        if (lang_pair == '') return;
        var lang = lang_pair.split('|')[1];
        var teCombo;
        var sel = document.getElementsByTagName('select');
        for (var i = 0; i < sel.length; i++)
          if (sel[i].className == 'goog-te-combo') teCombo = sel[i];
        if (document.getElementById('google_translate_element2') == null ||
            document.getElementById('google_translate_element2').innerHTML.length == 0 || 
            teCombo.length == 0 || 
            teCombo.innerHTML.length == 0) {
          setTimeout(function() {
            doGTranslate(lang_pair)
          }, 500)
        } else {
          teCombo.value = lang;
          GTranslateFireEvent(teCombo, 'change');
          GTranslateFireEvent(teCombo, 'change')
        }
      }
    
      function GTranslateGetCurrentLang() {
        var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
        return keyValue ? keyValue[2].split('/')[2] : null;
      }
      if (GTranslateGetCurrentLang() != null) jQuery(document).ready(function() {
        jQuery('div.switcher div.selected a').html(jQuery('div.switcher div.option').find('span.gflag img[alt="' + GTranslateGetCurrentLang() + '"]').parent().parent().html());
      });
      /* ]]> */
    `);
  };

  // Load external CSS
  loadCSS();

  // Load Google Translate
  loadGoogleTranslate();

  // Add links to edit cart items
  $('.PaymentPart_CartDescriptionCell').each((index, item) => {
    const titleElement = $(item).find('h4');
    const link = $(titleElement).find('a').attr('href');
    if (link) {
      titleElement.after(`<a aria-label="Edit item in cart" class="edit-item-link" href="${link}">${LINK_TITLE}</a>`);
    }
  });

  // Change position of donations section
  $('div[id*="_divSummaryOuter"]').after($('div[id*="_additionalDonationSection"]'));

  // Change position of cart summary section
  $('div[id*="_divPersonalInfo"]').after($('#divCartSummary .form-group.lead.text-success'));

  // Change billing section title
  $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);

  // register menu event
  $('#menu-icon').click((evt) => {
    evt.preventDefault();
    if ($('#menu-icon').hasClass('open')) {
      $('#menu-icon').removeClass('open');
      $('.site-wrapper header.site-header').removeClass('fixedmenu');
    } else {
      $('#menu-icon').addClass('open');
      $('.site-wrapper header.site-header').addClass('fixedmenu');
    }
    $('#new-menu-links').slideToggle('fast');
  });

  // transform dates and time
  transformDateAndTime();

  // add date and time action links
  dateTimeActions();

  // transform time on checkout page
  transformCheckoutTime();

  // set favicon
  setFavicon();

  // change Empty cart text
  $('[id*="_CartGrid_lbRemoveAll"]').text(EMPTY_CART_TEXT);
  $('[id*="_labelDeliveryMethodCaption"]').text(DELIVERY_TEXT);

  // Fix WCAG issues
  WCAG();
})();
