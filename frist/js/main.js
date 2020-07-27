"use strict";

(function () {
  var init = function init() {
    var cdn = 'https://dev.juliangalvez.xyz/frist';
    $('link[rel=stylesheet][href*="Webforms-User-Stylesheet"]').remove();
    $('.MSFootTextDiv').html('');
    $('.MS_LoginButtonOuterWrapperContainer').hide();
    $('.MSFootTextDiv:first').load("".concat(cdn, "/html/header.html"), function () {
      $('.MSFootTextDiv:last').load("".concat(cdn, "/html/footer.html"));
    });
  };

  init();
})();