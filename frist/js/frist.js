"use strict";function googleTranslateElementInit2(){new google.translate.TranslateElement({pageLanguage:"en",autoDisplay:!1},"google_translate_element2")}eval(function(b,d,a,e,f,g){if(f=function e(a){var b=String.fromCharCode;return(a<d?"":f(parseInt(a/d)))+(35<(a%=d)?b(a+29):a.toString(36))},!"".replace(/^/,String)){for(;a--;)g[f(a)]=e[a]||f(a);e=[function(a){return g[a]}],f=function(){return"\\w+"},a=1}for(;a--;)e[a]&&(b=b.replace(new RegExp("\\b"+f(a)+"\\b","g"),e[a]));return b}("6 7(a,b){n{4(2.9){3 c=2.9(\"o\");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s('t'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a=='')v;3 b=a.w('|')[1];3 c;3 d=2.x('y');z(3 i=0;i<d.5;i++)4(d[i].A=='B-C-D')c=d[i];4(2.j('k')==E||2.j('k').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,'m');7(c,'m')}}",43,43,["","","document","var","if","length","function","GTranslateFireEvent","value","createEvent","","","","","","true","else","doGTranslate","","getElementById","google_translate_element2","innerHTML","change","try","HTMLEvents","initEvent","dispatchEvent","createEventObject","fireEvent","on","catch","return","split","getElementsByTagName","select","for","className","goog","te","combo","null","setTimeout","500"],0,{})),function(){var a="Cart item image",b="Invisible link",c="https://dev.juliangalvez.xyz/frist",d=function(a){return a.replace(/AM/g,"a.m.").replace(/PM/g,"p.m.")};(function loadCSS(){var a=document.getElementsByTagName("head")[0],b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.href="".concat(c,"/css/main.css"),b.media="all",a.appendChild(b)})();(function dynamicallyLoadScript(a){var b=document.createElement("script");b.src=a,document.head.appendChild(b)})("https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"),$(".PaymentPart_CartDescriptionCell").each(function(a,b){var c=$(b).find("h4"),d=$(c).find("a").attr("href");d&&c.after("<a aria-label=\"Edit item in cart\" class=\"edit-item-link\" href=\"".concat(d,"\">").concat("Review or edit item","</a>"))}),$("div[id*=\"_divSummaryOuter\"]").after($("div[id*=\"_additionalDonationSection\"]")),$("div[id*=\"_divPersonalInfo\"]").after($("#divCartSummary .form-group.lead.text-success")),$("span[id*=\"_lblPersonalInfo\"]").text("Billing Information"),$("#menu-icon").click(function(a){a.preventDefault(),$("#menu-icon").hasClass("open")?($("#menu-icon").removeClass("open"),$(".site-wrapper header.site-header").removeClass("fixedmenu")):($("#menu-icon").addClass("open"),$(".site-wrapper header.site-header").addClass("fixedmenu")),$("#new-menu-links").slideToggle("fast")}),function transformDateAndTime(){var a=$(".Programming_Event_Date"),b=a.text().split(" ");if(0<b.length){var e="".concat(b.shift(),",");if(2==b.length)e="".concat(e," ").concat(b.join(" "),", ").concat(new Date().getFullYear());else{var f=b.pop();e="".concat(e," ").concat(b.join(" "),", ").concat(f)}a.text(e)}var c="".concat($(".Programming_Event_StartTime").text().trim(),"\u2013").concat($(".Programming_Event_EndTime").text().trim());c=d(c),$(".Programming_Event_TimeInnerContainer_Custom").text(c)}(),function dateTimeActions(){$("h2.Programming_Event_DateContainer + span a").text("Select other dates"),$("h2.Programming_Event_TimeContainer + span a").text("See other times")}(),function transformCheckoutTime(){$(".PaymentPart_CartItemDetails > div > span").each(function(a,b){var c=$(b);c.text(d(c.text()))})}(),function setFavicon(){document.querySelector("link[rel*='ICON']").remove();var a=document.createElement("link");a.type="image/x-icon",a.rel="shortcut icon",a.sizes="32x32",a.href="".concat(c,"/assets/favicon-32x32.png");var b=document.getElementsByTagName("head")[0];b.appendChild(a);var d=document.createElement("link");d.type="image/x-icon",d.rel="shortcut icon",d.sizes="16x16",d.href="".concat(c,"/assets/favicon-16x16.png"),b.appendChild(d)}(),$("[id*=\"_CartGrid_lbRemoveAll\"]").text("Empty cart"),$("[id*=\"_labelDeliveryMethodCaption\"]").text("How do you want us to deliver your tickets?"),function WCAG(){$("img.img-responsive.cartImg").attr("alt",a);var c=$("section")[0],d=$("<div/>",{html:c.innerHTML,class:c.className});c.replaceWith(d[0]),$("input[id*=\"_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword\"]").attr("autocomplete","current-password"),$("h3, h2, h1, h4, h5, h6").each(function(c,a){var b=$(a);""===b.text().trim()&&b.remove()}),$("img").each(function(b,c){var d=$(c);d.attr("alt")||d.attr("alt",a)}),$("a").each(function(a,c){var d=$(c);if(!d.attr("aria-label")&&0===d.find("img").length){var e=d.text().trim();if(""!==e)return void d.attr("aria-label",e);var f=d.attr("title");if(f)return f=f.trim().replace(/:/g,"").trim(),void d.attr("aria-label",f);d.text(b),d.attr("aria-label",b)}})}()}();