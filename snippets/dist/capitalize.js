"use strict";(function(){$("input[id*=\"txtFirstName\"],input[id*=\"txtLastName\"]").each(function(a,b){var c=$(b);c.keyup(function(){var a=c.val().split(" ").map(function(a){return"".concat(a.substr(0,1).toUpperCase()).concat(a.substr(1).toLowerCase())});c.val(a.join(" "))})})})();