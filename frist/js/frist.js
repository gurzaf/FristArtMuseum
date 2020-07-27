"use strict";

(function () {
  var LINK_TITLE = 'Review or edit item';
  var BILLING_TITLE = 'Billing Information';
  var EMPTY_CART_TEXT = 'Empty cart';
  var DELIVERY_TEXT = 'How do you want us to deliver your tickets?';
  var ALT_CART_IMAGE = 'Cart item image';
  var ARIA_DEFAULT = 'Invisible link';
  var CDN = 'https://dev.juliangalvez.xyz/frist';

  var loadCSS = function loadCSS() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = "".concat(CDN, "/css/main.css");
    link.media = 'all';
    head.appendChild(link);
  };

  var dynamicallyLoadScript = function dynamicallyLoadScript(url, content) {
    var script = document.createElement('script');

    if (url) {
      script.src = url;
    } else if (content) {
      script.textContent = content;
    }

    document.head.appendChild(script);
  };

  var WCAG = function WCAG() {
    $('img.img-responsive.cartImg').attr('alt', ALT_CART_IMAGE);
    $('input[id*="_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]').attr('autocomplete', 'current-password');
    $('h3, h2, h1, h4, h5, h6').each(function (a, b) {
      var e = $(b);

      if (e.text().trim() === '') {
        e.remove();
      }
    });
    $('img').each(function (index, item) {
      var element = $(item);

      if (!element.attr('alt')) {
        element.attr('alt', ALT_CART_IMAGE);
      }
    });
    $('a').each(function (index, item) {
      var element = $(item);

      if (!element.attr('aria-label') && element.find('img').length === 0) {
        var text = element.text().trim();

        if (text !== '') {
          element.attr('aria-label', text);
          return;
        }

        var title = element.attr('title');

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

  var changeAMPM = function changeAMPM(val) {
    return val.replace(/AM/g, 'a.m.').replace(/PM/g, 'p.m.');
  };

  var dateTimeActions = function dateTimeActions() {
    $('h2.Programming_Event_DateContainer + span a').text('Select other dates');
    $('h2.Programming_Event_TimeContainer + span a').text('See other times');
  };

  var setFavicon = function setFavicon() {
    document.querySelector("link[rel*='ICON']").remove();
    var l32 = document.createElement('link');
    l32.type = 'image/x-icon';
    l32.rel = 'shortcut icon';
    l32.sizes = '32x32';
    l32.href = "".concat(CDN, "/assets/favicon-32x32.png");
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(l32);
    var l16 = document.createElement('link');
    l16.type = 'image/x-icon';
    l16.rel = 'shortcut icon';
    l16.sizes = '16x16';
    l16.href = "".concat(CDN, "/assets/favicon-16x16.png");
    head.appendChild(l16);
  };

  var transformDateAndTime = function transformDateAndTime() {
    var dateElement = $('.Programming_Event_Date');
    var parts = dateElement.text().split(' ');

    if (parts.length > 0) {
      var newDate = "".concat(parts.shift(), ",");

      if (parts.length == 2) {
        newDate = "".concat(newDate, " ").concat(parts.join(' '), ", ").concat(new Date().getFullYear());
      } else {
        var year = parts.pop();
        newDate = "".concat(newDate, " ").concat(parts.join(' '), ", ").concat(year);
      }

      dateElement.text(newDate);
    }

    var time = "".concat($('.Programming_Event_StartTime').text().trim(), "\u2013").concat($('.Programming_Event_EndTime').text().trim());
    time = changeAMPM(time);
    $('.Programming_Event_TimeInnerContainer_Custom').text(time);
  };

  var transformCheckoutTime = function transformCheckoutTime() {
    $('.PaymentPart_CartItemDetails > div > span').each(function (index, item) {
      var element = $(item);
      element.text(changeAMPM(element.text()));
    });
  };

  var loadGoogleTranslate = function loadGoogleTranslate() {
    dynamicallyLoadScript(null, "\n      function googleTranslateElementInit2() {\n        new google.translate.TranslateElement({ pageLanguage: 'en',autoDisplay: false }, 'google_translate_element2');\n      }\n    ");
    dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2', null);
    dynamicallyLoadScript(null, "\n    /* <![CDATA[ */\n      function GTranslateFireEvent(element, event) {\n        try {\n          if (document.createEventObject) {\n            var evt = document.createEventObject();\n            element.fireEvent('on' + event, evt)\n          } else {\n            var evt = document.createEvent('HTMLEvents');\n            evt.initEvent(event, true, true);\n            element.dispatchEvent(evt)\n          }\n        } catch (e) {}\n      }\n    \n      function doGTranslate(lang_pair) {\n        if (lang_pair.value) lang_pair = lang_pair.value;\n        if (lang_pair == '') return;\n        var lang = lang_pair.split('|')[1];\n        var teCombo;\n        var sel = document.getElementsByTagName('select');\n        for (var i = 0; i < sel.length; i++)\n          if (sel[i].className == 'goog-te-combo') teCombo = sel[i];\n        if (document.getElementById('google_translate_element2') == null ||\n            document.getElementById('google_translate_element2').innerHTML.length == 0 || \n            teCombo.length == 0 || \n            teCombo.innerHTML.length == 0) {\n          setTimeout(function() {\n            doGTranslate(lang_pair)\n          }, 500)\n        } else {\n          teCombo.value = lang;\n          GTranslateFireEvent(teCombo, 'change');\n          GTranslateFireEvent(teCombo, 'change')\n        }\n      }\n    \n      function GTranslateGetCurrentLang() {\n        var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');\n        return keyValue ? keyValue[2].split('/')[2] : null;\n      }\n      if (GTranslateGetCurrentLang() != null) jQuery(document).ready(function() {\n        jQuery('div.switcher div.selected a').html(jQuery('div.switcher div.option').find('span.gflag img[alt=\"' + GTranslateGetCurrentLang() + '\"]').parent().parent().html());\n      });\n      /* ]]> */\n    ");
  };

  loadCSS();
  loadGoogleTranslate();
  $('.PaymentPart_CartDescriptionCell').each(function (index, item) {
    var titleElement = $(item).find('h4');
    var link = $(titleElement).find('a').attr('href');

    if (link) {
      titleElement.after("<a aria-label=\"Edit item in cart\" class=\"edit-item-link\" href=\"".concat(link, "\">").concat(LINK_TITLE, "</a>"));
    }
  });
  $('div[id*="_divSummaryOuter"]').after($('div[id*="_additionalDonationSection"]'));
  $('div[id*="_divPersonalInfo"]').after($('#divCartSummary .form-group.lead.text-success'));
  $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);
  $('#menu-icon').click(function (evt) {
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
  transformDateAndTime();
  dateTimeActions();
  transformCheckoutTime();
  setFavicon();
  $('[id*="_CartGrid_lbRemoveAll"]').text(EMPTY_CART_TEXT);
  $('[id*="_labelDeliveryMethodCaption"]').text(DELIVERY_TEXT);
  WCAG();
})();