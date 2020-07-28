'use strict';

(function () {
  var LINK_TITLE = 'Review or edit item';
  var BILLING_TITLE = 'Billing Information';
  var EMPTY_CART_TEXT = 'Empty cart';
  var DELIVERY_TEXT = 'How do you want us to deliver your tickets?';
  var ALT_CART_IMAGE = 'Cart item image';
  var ARIA_DEFAULT = 'Invisible link';
  var MEMBERPOPUP_KEY = 'memberpopup';
  var CDN = 'https://dev.juliangalvez.xyz/frist';
  var MEMBER_SIGNIN = 'Member Sign-In';
  var MEMBER_DISCOUNT = 'Please sign in to receive your member discount.';
  var SIGNIN_AND_CHECKOUT = 'Sign in & Check Out';
  var JOIN_DISCOUNT = 'Become a member today and get a discount on your order.';
  var JOIN = 'Become a Member';
  var GUEST = 'Check Out as Guest';
  var REGISTER_URL = '#';
  var MEMBERSHIP_URL = '#';
  var FORGOTPASSWORD_URL = '#';
  var ALTHRU_PREFIX = 'PC1335_ctl00_';
  var LOGIN_TITLE = 'Sign in';
  var CHANGEPASSWORD_TITLE = 'Change your password';

  var loadCSS = function loadCSS() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = "".concat(CDN, "/css/template.css");
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

      if (parts.length === 2) {
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
    dynamicallyLoadScript(null, "\n    function googleTranslateElementInit2() {\n      new google.translate.TranslateElement({ pageLanguage: 'en',autoDisplay: false }, 'google_translate_element2');\n    }\n    ");
    dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2', null);
    dynamicallyLoadScript(null, "\n    /* <![CDATA[ */\n      function GTranslateFireEvent(element, event) {\n        try {\n          if (document.createEventObject) {\n            var evt = document.createEventObject();\n            element.fireEvent('on' + event, evt)\n          } else {\n            var evt = document.createEvent('HTMLEvents');\n            evt.initEvent(event, true, true);\n            element.dispatchEvent(evt)\n          }\n        } catch (e) {}\n      }\n      \n      function doGTranslate(lang_pair) {\n        if (lang_pair.value) lang_pair = lang_pair.value;\n        if (lang_pair == '') return;\n        var lang = lang_pair.split('|')[1];\n        var teCombo;\n        var sel = document.getElementsByTagName('select');\n        for (var i = 0; i < sel.length; i++)\n        if (sel[i].className == 'goog-te-combo') teCombo = sel[i];\n        if (document.getElementById('google_translate_element2') == null ||\n        document.getElementById('google_translate_element2').innerHTML.length == 0 || \n        teCombo.length == 0 || \n        teCombo.innerHTML.length == 0) {\n          setTimeout(function() {\n            doGTranslate(lang_pair)\n          }, 500)\n        } else {\n          teCombo.value = lang;\n          GTranslateFireEvent(teCombo, 'change');\n          GTranslateFireEvent(teCombo, 'change')\n        }\n      }\n      \n      function GTranslateGetCurrentLang() {\n        var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');\n        return keyValue ? keyValue[2].split('/')[2] : null;\n      }\n      if (GTranslateGetCurrentLang() != null) jQuery(document).ready(function() {\n        jQuery('div.switcher div.selected a').html(jQuery('div.switcher div.option').find('span.gflag img[alt=\"' + GTranslateGetCurrentLang() + '\"]').parent().parent().html());\n      });\n      /* ]]> */\n    ");
  };

  var newLoginSubmit = function newLoginSubmit(evt) {
    evt.preventDefault();
    var sign = Object.keys(window).filter(function (key) {
      return key.indexOf('UserModalSignIn') !== -1;
    });

    if (sign.length === 1) {
      window[sign[0]].doEditSave();
    }
  };

  var passTextValue = function passTextValue(from, to) {
    $(from).on('keyup', function () {
      $(to).val($(from).val());
    });
    $(from).on('keydown', function (e) {
      if (e.keyCode === 13) {
        newLoginSubmit(e);
        return false;
      }
    });
  };

  var passClick = function passClick(from, to) {
    $(from).on('change', function () {
      $(to).click();
    });
  };

  var showMemberDialog = function showMemberDialog() {
    var difference = 1000 * 3600;
    var now = new Date().getTime();
    var lastTime = window.localStorage.getItem(MEMBERPOPUP_KEY);
    return !(lastTime && now - parseInt(lastTime) < difference);
  };

  var isAuthenticated = function isAuthenticated() {
    var auth = $('[id*="LinkbuttonSignOut"]').length;
    return auth > 0;
  };

  var getLoginMessage = function getLoginMessage() {
    var m = $('.UserModalPartDialog').find('.MS_LoginMessage').html();
    return m && m.length > 0 ? m : null;
  };

  var createMemberDialog = function createMemberDialog() {
    var actions = function actions() {
      var basicHtml = "\n      <div style=\"display: none;\">\n      <div id=\"popuplogin\" class=\"container ui-corner-all\">\n      <div class=\"row row-eq-height\">\n      <div id=\"popuploginformcontainer\" class=\"col-xs-12 col-sm-8\">\n      <h3>".concat(MEMBER_SIGNIN, "</h3>\n      <p>").concat(MEMBER_DISCOUNT, "</p>\n      <div id=\"popuploginform\">\n      <div class=\"form-horizontal\">\n      <div class=\"form-group\">\n      <label for=\"new-username\" id=\"new-username-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Email:</label>\n      <div class=\"col-sm-12\">\n      <input name=\"new-username\" type=\"text\" id=\"new-username\" autocomplete=\"new-username\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n      <a href=\"").concat(REGISTER_URL, "\" id=\"").concat(ALTHRU_PREFIX, "UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonRegisterDialog\" class=\"LoginLink\" href=\"javascript:__doPostBack('").concat(ALTHRU_PREFIX.replace('_', '$'), "$UserModalSignIn$UserModalPartDialog1$UserModalPartDialogBody$LinkbuttonRegisterDialog','')\">Register for new account</a>\n      </div>\n      </div>\n      <div class=\"form-group\">\n      <label for=\"new-password\" id=\"new-password-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Password:</label>\n      <div class=\"col-sm-12\">\n      <input name=\"new-password\" type=\"password\" autocomplete=\"new-password\" id=\"new-password\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n      <a href=\"").concat(FORGOTPASSWORD_URL, "\" id=\"").concat(ALTHRU_PREFIX, "_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonForgotPassword\" class=\"LoginLink\" href=\"#\">Forgot your password?</a>\n      </div>\n      </div>\n      <div class=\"form-group\">\n      <div class=\"col-sm-12\">\n      <div class=\"checkbox\">\n      <input id=\"new-checkbox\" type=\"checkbox\" name=\"new-checkbox\">Remember me</label>\n      </div>\n      </div>\n      </div>\n      </div>\n      </div>\n      <div id=\"popupsubmitform\" class=\"ui-dialog-buttonpane\">\n      <button id=\"new-submit\">\n      ").concat(SIGNIN_AND_CHECKOUT, "\n      </button>\n      </div>\n      </div>\n      <div id=\"popuploginregister\" class=\"col-xs-12 col-sm-4 ui-dialog-buttonpane\">\n      <div class=\"join-container\">\n      <p class=\"join-discount\">").concat(JOIN_DISCOUNT, "</p>\n      <button id=\"join-button\" onClick=\"window.location = '").concat(MEMBERSHIP_URL, "'\">\n      ").concat(JOIN, "\n      </button>\n      <a id=\"checkoutguest\" href=\"#\">").concat(GUEST, "</a>\n      </div>\n      </div>\n      </div>\n      </div>\n      </div>\n      ");
      $('[aria-describedby*="UserModalSignIn_UserModalPartDialog1"]').appendTo('form');
      $(basicHtml).appendTo('form');
      $('#new-submit').on('click', newLoginSubmit);
      passTextValue('#new-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
      passTextValue('#new-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
      passClick('#new-checkbox', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
      $('#popuplogin').dialog({
        title: null,
        position: {
          my: "top",
          at: "center",
          of: ".site-header.row"
        },
        draggable: false,
        modal: true,
        resizable: false,
        dialogClass: 'newLogin',
        autoOpen: false,
        open: function open() {
          window.scrollTo(0, 0);
          $('.ui-widget-overlay, #checkoutguest').on('click', function (evt) {
            evt.preventDefault();
            $('#popuplogin').dialog('close');
          });
        }
      });

      if (!isAuthenticated() && !getLoginMessage()) {
        if ($('div[id$="_panelEvent"]').length > 0 && showMemberDialog()) {
          $('#popuplogin').dialog('open');
          window.localStorage.setItem(MEMBERPOPUP_KEY, "".concat(new Date().getTime()));
        }
      }
    };

    setTimeout(actions, 3000);
  };

  var editCurrentLoginPopup = function editCurrentLoginPopup() {
    var edits = function edits() {
      var newButtonReference = $('.account');
      var buttonReference = $('[id*="UserModalSignIn_UserModalPartEditLink"]');

      try {
        buttonReference.click();
        $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"] .ui-dialog-buttonset button:first').click();
        $('.ui-dialog-content').dialog('close');
      } catch (e) {}

      $('#signindialog').dialog({
        autoOpen: false,
        title: LOGIN_TITLE,
        position: {
          my: "top",
          at: "center",
          of: ".site-header.row"
        },
        draggable: false,
        modal: true,
        resizable: false,
        dialogClass: 'signindialog',
        open: function open() {
          $('.ui-widget-overlay').on('click', function (evt) {
            evt.preventDefault();
            $('#signindialog').dialog('close');
          });
        }
      });
      $('#changepassword').dialog({
        autoOpen: false,
        title: CHANGEPASSWORD_TITLE,
        position: {
          my: "top",
          at: "center",
          of: ".site-header.row"
        },
        draggable: false,
        modal: true,
        resizable: false,
        dialogClass: 'changepassword',
        open: function open() {
          $('.ui-widget-overlay').on('click', function (evt) {
            evt.preventDefault();
            $('#changepassword').dialog('close');
          });
        }
      });

      if (isAuthenticated()) {
        var changeButtonReference = $('[id*="UserModalSignedIn_UserModalPartEditLink"]');

        try {
          changeButtonReference.click();
          $('.ui-dialog-content').dialog('close');
        } catch (e) {}

        changeButtonReference.off();
        newButtonReference.on('click', function () {
          $('#changepassword').dialog('open');
        });
        var message = getLoginMessage();

        if (message) {
          $('#changepasswordMessage').html("<div class=\"signinmessage\">".concat(message, "</div>"));
          $('#changepassword').dialog('open');
        }

        passTextValue('#currentpassword', '[id$="TextboxPasswordChangeOld"]');
        passTextValue('#newpassword', '[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange1"]');
        passTextValue('#confirmpassword', '[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange2"]');
        $('#submitchangepassword').on('click', function () {
          var change = Object.keys(window).filter(function (key) {
            return key.indexOf('UserModalSignedIn') !== -1;
          });

          if (change.length === 1) {
            window[change[0]].doEditSave();
          }
        });
        $('#changepasswordcancel').on('click', function () {
          $('#changepassword').dialog('close');
        });
      } else {
        var _message = getLoginMessage();

        if (_message) {
          $('#signindialog_DivSignInMessage').html("<div class=\"signinmessage\">".concat(_message, "</div>"));
          $('#signindialog').dialog('open');
        }

        buttonReference.off();
        newButtonReference.on('click', function () {
          $('#signindialog').dialog('open');
        });
        $('#signinbutton').on('click', newLoginSubmit);
        passTextValue('#sign-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
        passTextValue('#sign-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
        passClick('#remember-sign', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
      }
    };

    setTimeout(edits, 1000);
  };

  var popups = function popups() {
    createMemberDialog();
    editCurrentLoginPopup();
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
  popups();
})();
