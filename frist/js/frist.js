"use strict";

function googleTranslateElementInit2() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false
  }, 'google_translate_element2');
}

var dynamicallyLoadScript = function dynamicallyLoadScript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
};

dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2');
eval(function (p, a, c, k, _e, r) {
  _e = function e(c) {
    return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
  };

  if (!''.replace(/^/, String)) {
    while (c--) {
      r[_e(c)] = k[c] || _e(c);
    }

    k = [function (e) {
      return r[e];
    }];

    _e = function _e() {
      return '\\w+';
    };

    c = 1;
  }

  ;

  while (c--) {
    if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
  }

  return p;
}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}', 43, 43, '||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'), 0, {}));

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

  loadCSS();
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