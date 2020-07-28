'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $ = window['$'];

  var init = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var cdn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cdn = 'https://dev.juliangalvez.xyz/frist';
              $('link[rel=stylesheet][href*="Webforms-User-Stylesheet"]').remove();
              $('.MSFootTextDiv').html('');
              $('.MS_LoginButtonOuterWrapperContainer').hide();
              $('.MSFootTextDiv:first').load("".concat(cdn, "/html/header.html"), function () {
                $('.MSFootTextDiv:last').load("".concat(cdn, "/html/footer.html"));
              });
              _context.next = 7;
              return new Promise(function (res) {
                return setTimeout(res, 5000);
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init().then(function () {
    return console.warn('Done!');
  });
})();
