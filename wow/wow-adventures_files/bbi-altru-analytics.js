/*! (c) Blackbaud, Inc.
 *
 * Pass the script a GTM container id and it will track Altru transactions
 * data-bbi-action="TagManager" data-container-id="GTM-XXXXXX"
 *
 */

//GA data layer
dataLayer = [];

(function(bbi) {
    var appOptions = {
        alias: "AltruAnalytics",
        author: "Blackbaud Inc."
    };


    /**
     * Embeds the official Google Tag Manager snippet.
     * Accepts the containerId, which is unique to the client's GTM account.
     */
    function embedGoogleTagManager(containerId) {
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', containerId);
    }


    /**
     * This function fires when the user has arrived on the donation
     * confirmation screen.
     * Pushes donation information to the GTM dataLayer and logs a conversion.
     */
    function trackDonationConfirmation(data) {
        dataLayer.push({
            'ecommerce': {
                'purchase': {
                    'actionField': {
                        'id': data.TransID, // Transaction ID. Required for purchases and refunds.
                        'affiliation': 'Altru',
                        'revenue': data.TransTotal // Total transaction value (incl. tax and shipping)
                            //'coupon': 'SUMMER_SALE'
                    },
                    'products': getProducts(data)
                }
            }
        });

        //GTM transaction trigger. Triggers conversion tracking like AdWords
        dataLayer.push({'event': 'altru_transaction','trans_value': data.TransTotal,'trans_id':data.TransID});

        console.log("Donation information: ", data);



        // $('span[id*="CartGrid_rptCategories_tdType"]'); //Purchase Categories
        // $('div[id*="CartGrid_rptCategories_cart_type_group"]'); // category parents
        // $('span[id*="_labelItemDescription_"]'); //item title
        // $('span[id*="labelItemUnitPrice_"]'); //item prices
        // $('span[id*="literalItemQuantity"]'); //item quantity
        // $('span[id*="_labelSummarySubtotal"]').html(); //cart total
    }

    // use the item array indice to tell us which label to use
    function getProduct(item, i) {
        //Categories = Memberships/Tickets/Events/Donations
        var category = $('span[id*="_labelItemDescription_"]').eq(i).closest('div[id*="CartGrid_rptCategories_cart_type_group"]').find('span[id*="CartGrid_rptCategories_tdType"]').text();
        var productName = $('span[id*="_labelItemDescription_"]').eq(i).html();

        if (category === 'Memberships') {
            var find = '<span>|</span>|<div>';
            var re = new RegExp(find, 'g');
            //Memberships have attributes such as level/term/person.
            var attributes = $('span[id*="attributeContainer"]').eq(i).html().replace(re, '').split('</div>');
            var level = attributes[0].match(/:(.*)/)[1].trim();
            var term = attributes[1].match(/:(.*)/)[1].trim();

            productName += ' - ' + level + ' - ' + term;
        } else {

        }
        return {
            //'id': $('span[id*="_labelItemDescription_"]').eq(i).html(), //not needed since id and name are the same
            'name': productName,
            'price': item.Price,
            'quantity': item.Quantity,
            'category': category //Calculate the category for each item since we're using a combination of the data object and the DOM
        };
    }

    function getProducts(data) {
        console.log($('span[id*="_labelItemDescription_"]'));
        var products = [];
        for (var i = 0, len = data.Items.length; i < len; i++) {
            products.push(getProduct(data.Items[i], i));
        }
        return products;
    }


    /**
     * GTM initializer. Must be called by data- attributes on the page.
     */
    function tagManager(app, bbi, $) {
        return {
            init: function(options) {
                console.log('init');
                // Don't track editor pages.
                if (false === bbi.isPageEditor()) {
                    $(function() {
                        if (typeof BBTransData !== 'undefined') {
                            trackDonationConfirmation(BBTransData);
                        }


                        // Embed GTM and wait for the donation confirmation screen.
                        //This must come last so that our DataLayer object is constructed.
                        embedGoogleTagManager(options.containerId);
                    });

                }
            }
        };
    }


    /**
     * Register our application with BBI.
     */
    bbi.register(appOptions)
        .action("TagManager", tagManager)
        .build();
}(window.bbiGetInstance()));
