"use strict";

(function () {
  var CDNASSETS = 'https://cdn.socialgoodsoftware.com/db7a84ab9d026a4edda9bc3219990b60201a0860e9bb839cef6963c5957ca8531245c6a9e3292547c629105ce4e6d747/online-template/assets/';
  var LINK_TITLE = 'Review or edit item';
  var BILLING_TITLE = 'Billing Information';
  var ALT_CART_IMAGE = 'Cart item image';
  var ARIA_DEFAULT = 'Invisible link';
  var DONATION_TEXT = 'Make a donation';
  var LOGIN_TITLE = 'Sign in';
  var MEMBER_SIGNIN = 'Member Sign-In';
  var JOIN_DISCOUNT = 'Become a member today and get a discount on your order.';
  var JOIN = 'Become a Member';
  var GUEST = 'Check Out as Guest';
  var MEMBER_DISCOUNT = 'Please sign in to receive your member discount.';
  var SIGNIN_AND_CHECKOUT = 'Sign in & Check Out';
  var FORGOTPASSWORDURL = 'https://16806a.blackbaudhosting.com/16806a/page.aspx?pid=220&tab=500';
  var REGISTERURL = 'https://16806a.blackbaudhosting.com/16806a/page.aspx?pid=218';
  var MEMBERSHIP_URL = 'https://www.bishopmuseum.org/membership/';
  var LOGO_ALT = 'Bishop Museum Logo';

  var loadCSS = function loadCSS() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.socialgoodsoftware.com/db7a84ab9d026a4edda9bc3219990b60201a0860e9bb839cef6963c5957ca8531245c6a9e3292547c629105ce4e6d747/online-template/css/template.css';
    link.media = 'all';
    head.appendChild(link);
  };

  var passTextValue = function passTextValue(from, to) {
    $(from).on('keyup', function () {
      $(to).val($(from).val());
    });
    $(from).on('keydown', function (e) {
      if (e.keyCode == 13) {
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

  var newLoginSubmit = function newLoginSubmit(evt) {
    evt.preventDefault();
    var sign = Object.keys(window).filter(function (key) {
      return key.indexOf('UserModalSignIn') !== -1;
    });

    if (sign.length === 1) {
      window[sign[0]].doEditSave();
    }
  };

  var editCurrentLoginPopup = function editCurrentLoginPopup(cb) {
    var buttonReference = $('[id*="UserModalSignIn_UserModalPartEditLink"]');

    try {
      $(".ui-dialog-content").dialog("close");
    } catch (e) {}

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
      open: function open(event, ui) {
        window.scrollTo(0, 0);
        $('.ui-widget-overlay, #checkoutguest').on('click', function (evt) {
          evt.preventDefault();
          $('#popuplogin').dialog('close');
        });
      }
    });
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
      open: function open(event, ui) {
        $('.ui-widget-overlay').on('click', function (evt) {
          evt.preventDefault();
          $('#signindialog').dialog('close');
        });
      }
    });
    var auth = $('[id*="LinkbuttonSignOut"]').length;

    if (auth === 0) {
      var message = $('.UserModalPartDialog').find('.MS_LoginMessage').html();

      if (message && message.length > 0) {
        $('#signindialog_DivSignInMessage').html(message);
        $('#signindialog').dialog('open');
      } else {
        $('#popuplogin').dialog('open');
      }
    } else {
      buttonReference.css('display', 'none');
    }

    buttonReference.off();
    buttonReference.on('click', function () {
      $('#signindialog').dialog('open');
    });
    $('#signinbutton').on('click', newLoginSubmit);
    passTextValue('#sign-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
    passTextValue('#sign-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
    passClick('#remember-sign', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
    cb();
  };

  var WCAG = function WCAG() {
    $('header.site-header .RS_headerWrapper_inner div[id*="_pnlFooterText"] > p > img').attr('alt', LOGO_ALT);
    $('img.img-responsive.cartImg').attr('alt', ALT_CART_IMAGE);
    var element = $('section')[0];

    if (element) {
      var res = $('<div/>', {
        html: element.innerHTML,
        class: element.className
      });
      element.replaceWith(res[0]);
    }

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

  var replaceText = function replaceText() {
    $('.MS_LoginLink a').text('Login');
    $('input[id*="buttonAddEventToCart"]').val('CONTINUE');
    $('div.cart-type-group.cart-type-Donations.single-cart-item .PaymentPart_CartDescriptionCell').html("<span>".concat(DONATION_TEXT, "</span>"));
    transformDateAndTime();
    dateTimeActions();
    transformCheckoutTime();
    WCAG();
  };

  var generalAdmissionBg = function generalAdmissionBg() {
    if ($('h1 span[id*="_labelEventName"]').text() === 'Timed General Admission') {
      $('.site-container').addClass('admissionBg');
    }
  };

  var changeAMPM = function changeAMPM(val) {
    return val.replace(/AM/g, 'a.m.').replace(/PM/g, 'p.m.');
  };

  var dateTimeActions = function dateTimeActions() {
    $('h2.Programming_Event_DateContainer + span a').text('Select other dates');
    $('[id*="labelAlternateTimes"]').html('See other times');
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

  var organiceItems = function organiceItems() {
    $('.PaymentPart_CartDescriptionCell').each(function (index, item) {
      var titleElement = $(item).find('h4');
      var link = $(titleElement).find('a').attr('href');

      if (link) {
        titleElement.after("<a aria-label=\"Edit item in cart\" class=\"edit-item-link\" href=\"".concat(link, "\">").concat(LINK_TITLE, "</a>"));
        var thumb = "\n        <div id=\"PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_tdImageItem_0\">\n        <a href=\"".concat(link, "\" id=\"PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_hyperlinkItemThumbnail_0\">\n        <img id=\"PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_imageItemThumbnail_0\" class=\"img-responsive cartImg\" src=\"").concat(CDNASSETS, "bishop-thumbnail.png\" alt=\"Cart item image\">\n        </a>\n        </div>\n        ");
        $(item).before(thumb);
      }
    });
    $('div[id*="_divUserSignUp"]').after($('#divCartSummary .form-group.lead.text-success'));
    $('#divCartSummary .form-group:first-child').before($('div[id*="_divDiscountCodeEntry"]'));
    $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);
    $('input[id*="_chkUseAsBilling"]').prop('checked', true);
    $('div[id*="_registrantBioInfoSection"] .form-group label').each(function (index, item) {
      var t = $(item).text();
      $(item).text(t.replace(':', ''));
    });
    $('header div[id*="_pnlFooterText"]').after("\n    <div id=\"new-menu\">\n    <a id=\"menu-icon\" aria-label=\"Toggle Menu\" href=\"#\">\n    </a>\n    </div>\n    ");
    $('#menu-icon').click(function (evt) {
      evt.preventDefault();

      if ($('#menu-icon').hasClass('open')) {
        $('#menu-icon').removeClass('open');
        $('.site-wrapper header.site-header').css('position', 'absolute');
        $('.site-wrapper header.site-header .MS_LoginButtonOuterContainer').css('display', 'none');
        $('#mobile-menu-container').slideToggle('fast');
      } else {
        $('#menu-icon').addClass('open');
        $('.site-wrapper header.site-header').css('position', 'fixed');
        $('#mobile-menu-container').slideToggle('fast');
        $('.site-wrapper header.site-header .MS_LoginButtonOuterContainer').css('display', 'table');
      }
    });
  };

  var createPopUp = function createPopUp() {
    if ($('[id*="UserModalSignIn_UserModalPartEditLink"]').text().trim() !== 'Login' || $('[id*="MembershipExpress"]').length === 0 && $('[id*="divPriceList"]').length === 0 || $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]').css('display') === 'block') {
      return;
    }

    var basicHtml = "\n    <div style=\"display: none;\">\n    <div id=\"popuplogin\" class=\"container ui-corner-all\">\n    <div class=\"row row-eq-height\">\n    <div id=\"popuploginformcontainer\" class=\"col-xs-12 col-sm-8\">\n    <h3>".concat(MEMBER_SIGNIN, "</h3>\n    <p>").concat(MEMBER_DISCOUNT, "</p>\n    <div id=\"popuploginform\">\n    <div class=\"form-horizontal\">\n    <div class=\"form-group\">\n    <label for=\"new-username\" id=\"new-username-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Email:</label>\n    <div class=\"col-sm-12\">\n    <input name=\"new-username\" type=\"text\" id=\"new-username\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n    <a href=\"").concat(REGISTERURL, "\" id=\"PC1953_ctl00_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonRegisterDialog\" class=\"LoginLink\" href=\"javascript:__doPostBack('PC1953$ctl00$UserModalSignIn$UserModalPartDialog1$UserModalPartDialogBody$LinkbuttonRegisterDialog','')\">Register for new account</a>\n    </div>\n    </div>\n    <div class=\"form-group\">\n    <label for=\"new-password\" id=\"new-password-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Password:</label>\n    <div class=\"col-sm-12\">\n    <input name=\"new-password\" type=\"password\" id=\"new-password\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n    <a href=\"").concat(FORGOTPASSWORDURL, "\" id=\"PC1953_ctl00_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonForgotPassword\" class=\"LoginLink\" href=\"#\">Forgot your password?</a>\n    </div>\n    </div>\n    <div class=\"form-group\">\n    <div class=\"col-sm-12\">\n    <div class=\"checkbox\">\n    <input id=\"new-checkbox\" type=\"checkbox\" name=\"new-checkbox\">Remember me</label>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n    <div id=\"popupsubmitform\" class=\"ui-dialog-buttonpane\">\n    <button id=\"new-submit\">\n    ").concat(SIGNIN_AND_CHECKOUT, "\n    </button>\n    </div>\n    </div>\n    <div id=\"popuploginregister\" class=\"col-xs-12 col-sm-4 ui-dialog-buttonpane\">\n    <div class=\"join-container\">\n    <p class=\"join-discount\">").concat(JOIN_DISCOUNT, "</p>\n    <button id=\"join-button\" onClick=\"window.location = '").concat(MEMBERSHIP_URL, "'\">\n    ").concat(JOIN, "\n    </button>\n    <a id=\"checkoutguest\" href=\"#\">").concat(GUEST, "</a>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n    ");
    $('[aria-describedby*="UserModalSignIn_UserModalPartDialog1"]').appendTo('form');
    $(basicHtml).appendTo('form');
    $('#new-submit').on('click', newLoginSubmit);
    passTextValue('#new-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
    passTextValue('#new-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
    passClick('#new-checkbox', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
  };

  var setFavicon = function setFavicon() {
    document.querySelector("link[rel*='ICON']").remove();
    var l32 = document.createElement('link');
    l32.type = 'image/x-icon';
    l32.rel = 'shortcut icon';
    l32.sizes = '32x32';
    l32.href = "".concat(CDNASSETS, "favicon-32x32.png");
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(l32);
    var l16 = document.createElement('link');
    l16.type = 'image/x-icon';
    l16.rel = 'shortcut icon';
    l16.sizes = '180x180';
    l16.href = "".concat(CDNASSETS, "favicon-180x180.png");
    head.appendChild(l16);
    var l192 = document.createElement('link');
    l192.type = 'image/x-icon';
    l192.rel = 'shortcut icon';
    l192.sizes = '192x192';
    l192.href = "".concat(CDNASSETS, "favicon-192x192.png");
    head.appendChild(l192);
  };

  var autoFill = function autoFill() {
    var list = $('#divPriceList .show-grid');
    $.each(list, function (index, item) {
      var input = $(item).find('input:text')[0];

      if (typeof input !== 'undefined') {
        var value = $(input).val();

        if (value && value.length > 0 && value.length < 4) {
          value = parseInt(value);

          if (isNaN(value)) {
            $(input).val('');
          }
        } else {
          $(input).val('');
        }
      }
    });
    cb();
  };

  loadCSS();
  generalAdmissionBg();
  replaceText();
  organiceItems();
  createPopUp();
  setTimeout(function () {
    editCurrentLoginPopup(function () {
      setTimeout(autoFill, 500);
    });
  }, 1000);
  setFavicon();
})();