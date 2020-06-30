/**
 * © Copyright 2019 - Salty Slopes LLC. All rights reserved.
 * See https://socialgoodsoftware.com/terms-of-service for terms.
 * Contact us for licensing - hello @socialgoodsoftware.com
 **/
var domain = 'https://api.socialgoodsoftware.com';
if (location.origin.indexOf('sgs.com') > -1 ||
    location.origin.indexOf(':3000') > -1 ||
    location.origin.indexOf('file://') > -1) {
    domain = 'http://api.sgs.com:2999';
}
var AjaxQueue = {};
var TemplateDynamicCode = '';

window.addEventListener('load', StartTemplateValidation, true);

function StartTemplateValidation() {
    if (typeof jQuery === 'undefined') { // jQuery is NOT available
        LoadScript('https://code.jquery.com/jquery-3.4.1.js', function() { // Download jQuery
            InitApplication();
        });
    } else {
        InitApplication();
    }

    function InitApplication() {
        (function($) {
            $(document).ready(function() {
                StartApp($);
            });
        }(jQuery));
    }

    /* Get setup from server */
    function StartApp($) {
        if ($('.spinner').length === 0) {
            /* Ajax Loading Dialog injected into the page */
            $($('.MS_contentWrapper_inner')).parent().append('<div class="spinner" style="padding: 30px;margin-top: 80px;margin-bottom:  80px;display:none;"><img src="https://cdn.socialgoodsoftware.com/_default/images/loading.gif" style="display: block;margin-left: auto;margin-right: auto;width: 120px;"><p style="text-align: center;margin-top: 10px;">Loading please wait...</p></div>');
        }

        var source = $('#custom-template').attr('src');
        var auth = source.split('?auth=')[1];

        /* Get current setup from server */
        $.ajax({
            type: 'POST',
            headers: {
                'x-public-key': '434c4043e3c045cc8426e83f14709fca',
            },
            url: domain + '/api/template',
            data: {
                auth: auth
            }
        }).then(function(template) {
            var StaticCode = '';
            var StaticCSS = '';
            var page = GetPage($);

            if (page === 'checkout-page') {
                StaticCode = template['checkout-page-js'];
                TemplateDynamicCode = template['checkout-page-dynamic-js'];
                StaticCSS = template['checkout-page-css'];
            }

            if (page === 'cart-page') {
                StaticCode = template['cart-page-js'];
                TemplateDynamicCode = template['cart-page-dynamic-js'];
                StaticCSS = template['cart-page-css'];
            }

            if (page === 'confirmation-page') {
                StaticCode = template['confirmation-page-js'];
                StaticCSS = template['confirmation-page-css'];
            }
            ExecuteTemplateCode(StaticCode); // Execute JavaScript Code
            $('head').append('<style>' + decodeURIComponent(StaticCSS) + '</style>'); //Execute CSS

            (function(open) {
                XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
                    AjaxQueue[url] = url;
                    this.addEventListener('error', function() { // Check when request have completed with error
                        delete AjaxQueue[url];
                        setTimeout(function() { // We have to wait at least 200th of second to make sure no new calls go out
                            if (EmptyQueue(AjaxQueue)) {
                                ExecuteTemplateCode(TemplateDynamicCode);
                                if ('ExecuteDynamicCheckoutFlows' in window) {
                                    window.ExecuteDynamicCheckoutFlows();
                                }
                            }
                        }, 200);
                    }, false);
                    this.addEventListener('load', function() { // Check when request have completed
                        delete AjaxQueue[url];
                        setTimeout(function() { // We have to wait at least 200th of second to make sure no new calls go out
                            if (EmptyQueue(AjaxQueue)) {
                                ExecuteTemplateCode(TemplateDynamicCode);
                                if ('ExecuteDynamicCheckoutFlows' in window) {
                                    window.ExecuteDynamicCheckoutFlows();
                                }
                            }
                        }, 200);
                    }, false);
                    open.call(this, method, url, async, user, pass);
                };
            })(XMLHttpRequest.prototype.open);
        });
    }

    /* Downloads a script into the page */
    function LoadScript(src, callback) {
        var s,
            r,
            t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                callback();
            }
        };
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }

    /* Executes code using script tag */
    function ExecuteTemplateCode(code) {
        if (code) {
            try {
                code = decodeURIComponent(code);
                eval(code);
            } catch (err) {
                console.log('ERROR! - Invalid Code.');
            }
        }
    }

    function GetPage($) {
        // Checkout page validation
        var DailyAdmissionPage = $('[id*="panelDailyAdmission"]');
        var MembershipPage = $('[id*="MembershipExpress"]');
        var EventPage = $('[id*="panelEvent"]');
        var EventRegistrationPage = $('[id*="EventRegistrationExpress"]');
        var DonationPage = $('[id*="UpdatePanel"]');
        var PackagesRegistrationPage = $('[id*="PackageRegistrationExpress"]');
        var ComboTickets = $('[id*="divComboPriceList"]');
        var PanelCombination = $('[id*="panelCombination"]');

        if (DailyAdmissionPage.length > 0) {
            return 'checkout-page';
        }

        if (MembershipPage.length > 0) {
            return 'checkout-page';
        }

        if (EventPage.length > 0) {
            return 'checkout-page';
        }

        if (EventRegistrationPage.length > 0) {
            return 'checkout-page';
        }

        if (DonationPage.length > 0) {
            return 'checkout-page';
        }

        if (PackagesRegistrationPage.length > 0) {
            return 'checkout-page';
        }

        if (ComboTickets.length > 0) {
            return 'checkout-page';
        }

        if (PanelCombination.length > 0) {
            return 'checkout-page';
        }

        // Other pages 
        var RegistrationPage = $('[id*="UserRegistration"]');
        var PasswordResetPage = $('[id*="txtForgotPWDUserNameEmail"]');

        if (RegistrationPage.length > 0) {
            return 'checkout-page';
        }

        if (PasswordResetPage.length > 0) {
            return 'checkout-page';
        }

        var CartContainer = $('[id*="CartGrid_CartContainer"]');
        var ConfirmationPage = $('[id*="PaymentPartFormContainer"]');
        if (CartContainer.length > 0 || ConfirmationPage.length > 0) {
            var url = window.location.href;
            if (url.indexOf('tab=3') > -1 && url.indexOf('pid=') > -1 && url.indexOf('csid=') > -1) { // Confirmation page
                return 'confirmation-page';
            } else {
                return 'cart-page';
            }
        }
    }

    function EmptyQueue(queue) {
        var count = 0;
        $.each(queue, function(key, value) {
            count++;
        });
        return (count === 0 ? true : false);
    }
}