'use strict';

var MEMBERPOPUP_KEY = 'memberpopup';

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
  var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
  var difference = 1000 * (minutes * 60);
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
  var MEMBER_SIGNIN = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Member Sign-In';
  var MEMBER_DISCOUNT = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Please sign in to receive your member discount.';
  var SIGNIN_AND_CHECKOUT = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Sign in & Check Out';
  var JOIN_DISCOUNT = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Become a member today and get a discount on your order.';
  var JOIN = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Become a Member';
  var GUEST = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'Checkout as a guest';
  var REGISTER_URL = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '#';
  var MEMBERSHIP_URL = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '#';
  var FORGOTPASSWORD_URL = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '#';
  var ALTRU_PREFIX = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'PC1953_ctl00_';
  var MINUTES = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 60;

  if ($('[id*="UserModalSignIn_UserModalPartEditLink"]').text().trim() !== 'Login' || $('[id*="MembershipExpress"]').length === 0 && $('[id*="divPriceList"]').length === 0 || $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]').css('display') === 'block') {
    return;
  }

  var basicHtml = "\n    <div style=\"display: none;\">\n      <div id=\"popuplogin\" class=\"container ui-corner-all\">\n        <div class=\"row row-eq-height\">\n          <div id=\"popuploginformcontainer\" class=\"col-xs-12 col-sm-7\">\n            <h3>".concat(MEMBER_SIGNIN, "</h3>\n            <p>").concat(MEMBER_DISCOUNT, "</p>\n            <div id=\"popuploginform\">\n              <div class=\"form-horizontal\">\n                <div class=\"form-group\">\n                  <label for=\"new-username\" id=\"new-username-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Email:</label>\n                  <div class=\"col-sm-12\">\n                    <input name=\"new-username\" type=\"text\" id=\"new-username\" autocomplete=\"new-username\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n                    <a href=\"").concat(REGISTER_URL, "\" id=\"").concat(ALTRU_PREFIX, "UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonRegisterDialog\" class=\"LoginLink\" href=\"javascript:__doPostBack('").concat(ALTRU_PREFIX.replace('_', '$'), "$UserModalSignIn$UserModalPartDialog1$UserModalPartDialogBody$LinkbuttonRegisterDialog','')\">Register for new account</a>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"new-password\" id=\"new-password-label\" class=\"col-sm-12 control-label\" style=\"padding-right:0\">Password:</label>\n                  <div class=\"col-sm-12\">\n                    <input name=\"new-password\" type=\"password\" autocomplete=\"new-password\" id=\"new-password\" class=\"BBFormTextbox LoginFormTextbox form-control\">\n                    <a href=\"").concat(FORGOTPASSWORD_URL, "\" id=\"PC1953_ctl00_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonForgotPassword\" class=\"LoginLink\" href=\"#\">Forgot your password?</a>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <div class=\"col-sm-12\">\n                    <div class=\"checkbox\">\n                      <input id=\"new-checkbox\" type=\"checkbox\" name=\"new-checkbox\">Remember me</label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div id=\"popupsubmitform\" class=\"ui-dialog-buttonpane\">\n              <button id=\"new-submit\">\n                ").concat(SIGNIN_AND_CHECKOUT, "\n              </button>\n            </div>\n          </div>\n          <div id=\"popuploginregister\" class=\"col-xs-12 col-sm-5 ui-dialog-buttonpane\">\n            <div class=\"join-container\">\n              <p class=\"join-discount\">").concat(JOIN_DISCOUNT, "</p>\n              <button id=\"join-button\" onClick=\"window.location = '").concat(MEMBERSHIP_URL, "'\">\n                ").concat(JOIN, "\n              </button>\n              <a id=\"checkoutguest\" href=\"#\">").concat(GUEST, "</a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    ");
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
      at: "top+100"
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
    if ($('div[id$="_panelEvent"]').length > 0 && showMemberDialog(MINUTES)) {
      $('#popuplogin').dialog('open');
      window.localStorage.setItem(MEMBERPOPUP_KEY, "".concat(new Date().getTime()));
    }
  }
};

var loadCSS = function loadCSS() {
  var ASSETS_PATH = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/assets/';
  var CSS_PATH = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'css/template.css';
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = "".concat(ASSETS_PATH).concat(CSS_PATH);
  link.media = 'all';
  head.appendChild(link);
};

(function () {
  loadCSS('../', 'css/dialog.css');
  var MINUTES = 60;
  createMemberDialog(undefined, undefined, undefined, 'Members receive unlimited free year-round admission + discounts on dining, shopping, workshops, and performances', undefined, undefined, '#register-url', '#membership-url', '#password-url', 'PC1954_ctl00_', MINUTES);
})();
