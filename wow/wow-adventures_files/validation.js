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
var AjaxQueue = {}; // Hold ajax requests
var CheckoutFlowsDynamicCode;

window.addEventListener('load', StartValidation, true);

function StartValidation() {
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

    function StartApp($) {
        if ($('.spinner').length === 0) {
            /* Ajax Loading Dialog injected into the page */
            $($('.MS_contentWrapper_inner')).parent().append('<div class="spinner" style="padding: 30px;margin-top: 80px;margin-bottom:  80px;display:none;"><img src="https://cdn.socialgoodsoftware.com/_default/images/loading.gif" style="display: block;margin-left: auto;margin-right: auto;width: 120px;"><p style="text-align: center;margin-top: 10px;">Loading please wait...</p></div>');
        }
        var page = GetPage($);
        var source = $('#auth-validation').attr('src');
        var auth = source.split('?auth=')[1];

        ShowLoadingDialog();
        /* Get setup from server */
        $.ajax({
            type: 'POST',
            headers: {
                'x-public-key': '434c4043e3c045cc8426e83f14709fca',
            },
            url: domain + '/api/checkout-flows',
            data: {
                auth: auth
            }
        }).then(function(flows) {
            var title = GetTitleOfItemBeingPurchased(page);
            if (title !== undefined && title.length > 0) {
                var ActiveFlows = [];
                for (var index = 0; index < flows.length; index++) {
                    var flow = flows[index];
                    var found = (flow[page] !== undefined && flow[page] ? true : false);
                    if (found && flow.active) {
                        // Run test for exact value
                        if (flow.type === 'exact-value') {
                            if (title === flow.value) {
                                ActiveFlows.push(flow);
                            }
                        }
                        // Run test for contains a value 
                        if (flow.type === 'contains-value') {
                            if (title.indexOf(flow.value) > -1) {
                                ActiveFlows.push(flow);
                            }
                        }
                        // Run test for does not contains a value
                        if (flow.type === 'does-not-contain-value') {
                            if (title.indexOf(value) <= -1) {
                                ActiveFlows.push(flow);
                            }
                        }
                    }
                }
                var StaticCode = '';
                CheckoutFlowsDynamicCode = '';
                for (var index = 0; index < ActiveFlows.length; index++) {
                    var flow = ActiveFlows[index];
                    if (page === 'checkout-page') {
                        StaticCode += flow['checkout-page-js'];
                        CheckoutFlowsDynamicCode += flow['checkout-page-dynamic-js'];
                    }
                    if (page === 'cart-page') {
                        StaticCode += flow['cart-page-js'];
                        if (flow['cart-page-dynamic-js']) {
                            CheckoutFlowsDynamicCode += flow['cart-page-dynamic-js'];
                        }
                    }
                    if (page === 'confirmation-page') {
                        StaticCode += flow['confirmation-page-js'];
                    }
                }
                ExecuteCode(StaticCode);
            }
        }).always(function() {
            HideLoadingDialog();
        });

        $('form').submit(function() { // Show loading on form submission
            ShowLoadingDialog();
            setTimeout(function() { // Just in case the form submission fails for some reason
                HideLoadingDialog();
            }, 1000 * 10); // Wait for 10 seconds
        });

        function ShowLoadingDialog() {
            $('.spinner').show();
            $($('.BBListingHeading').parent()).hide();
            $('.MS_contentWrapper_inner').hide();
        }

        function HideLoadingDialog() {
            $('.spinner').hide();
            $($('.BBListingHeading').parent()).show();
            $('.MS_contentWrapper_inner').show();
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

        function GetTitleOfItemBeingPurchased(page) {
            if (page === 'checkout-page') {
                var title = $('.BBListingHeading h1').text(); // Check item heading
                title = title.replace(/^\s+|\s+$/g, ''); // Check for empty spaces in heading
                if (title && title.length > 0) {
                    return title;
                }

                title = $('.Programming_Event_Title').text(); // Check for Event Registration Express
                title = title.replace(/^\s+|\s+$/g, ''); // Check for empty spacess
                if (title && title.length > 0) {
                    return title;
                }

                title = $('#PackageRegistrationHeaderSection .Programming_TicketPriceName:first').text(); // Add support for packages
                title = title.replace(/^\s+|\s+$/g, ''); // Check for empty spaces in heading
                if (title && title.length > 0) {
                    return title;
                }
            }
            if (page === 'cart-page') {
                var items = [];
                $('.PaymentPart_CartDescriptionCell').each(function(index) {
                    items.push($(this).text());
                });
                return items[0]; // First Item in the stack
            }
            return 'Museum Admission'; // For testing only!
        }
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

    function ExecuteCode(code) {
        if (code) {
            try {
                code = decodeURIComponent(code);
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.appendChild(document.createTextNode(code));
                document.body.appendChild(script);
            } catch (err) { // This code is not encoded just execute it
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.appendChild(document.createTextNode(code));
                document.body.appendChild(script);
            }
        }
    }

    window.ExecuteDynamicCheckoutFlows = function() {
        ExecuteCodeEval(CheckoutFlowsDynamicCode);
    }

    /* Executes code on the eval loop */
    function ExecuteCodeEval(code) {
        if (code) {
            try {
                code = decodeURIComponent(code);
                eval(code);
            } catch (err) { // This code is not encoded just execute it
                try {
                    eval(code);
                } catch (err) {
                    console.log('ERROR! - Invalid Code.');
                }
            }
        }
    }


};