'use strict';

var MEMBERPOPUP_KEY = 'memberpopup';

var showMemberDialog = function showMemberDialog() {
  var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var difference = 1000 * (minutes * 60);
  var now = new Date().getTime();
  var lastTime = window.localStorage.getItem(key || MEMBERPOPUP_KEY);
  return !(lastTime && now - parseInt(lastTime) < difference);
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
  var CDN = '../';
  loadCSS(CDN, 'css/dialog.css');
  var LINK = '#';
  var html = "\n    <div style=\"display: none;\">\n        <div id=\"popupmap\">\n          <div class=\"popupmapcontent\">\n            <h3>Los Angeles County Arboretum</h3>\n            <p>\n              Los Angeles County Arboretum is located in <strong>Arcadia, California</strong>. Please confirm you wish to buy tickets to visit this garden.\n            </p>\n            <a class=\"maplink\" href=\"https://goo.gl/maps/4gTZoCAXKBh1RDSh6\" target=\"_blank\" rel=\"noreferrer nofollow\">\n              <img src=\"".concat(CDN, "assets/map.png\" alt=\"Arboretum Map\" width=\"595\" height=\"492\" />\n            </a>\n            <a class=\"buyticket\" href=\"").concat(LINK, "\">Buy Tickets</a>\n          </div>\n        </div>\n      </div>\n  ");
  $(html).appendTo('body');
  $('#popupmap').dialog({
    title: null,
    draggable: false,
    modal: true,
    resizable: false,
    dialogClass: 'popupDialog',
    autoOpen: false,
    open: function open() {
      window.scrollTo(0, 0);
      $('.ui-widget-overlay').on('click', function (evt) {
        evt.preventDefault();
        $('#popupmap').dialog('close');
      });
    }
  });
  var MINUTES = 60;
  var MAP_KEY = 'popupmap';

  if (showMemberDialog(MINUTES, MAP_KEY)) {
    $('#popupmap').dialog('open');
    window.localStorage.setItem(MAP_KEY, "".concat(new Date().getTime()));
  }
})();
