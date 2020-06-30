"use strict";

(function () {
  var fixLayout = function fixLayout() {
    $('.MSFootTextDiv:first').load('html/header.html', function () {
      $('.MSFootTextDiv:last').load('html/footer.html');
    });
  };

  fixLayout();
})();