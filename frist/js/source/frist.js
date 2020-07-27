(() => {
  const LINK_TITLE = 'Review or edit item';
  const BILLING_TITLE = 'Billing Information';
  const EMPTY_CART_TEXT = 'Empty cart';
  const DELIVERY_TEXT = 'How do you want us to deliver your tickets?';
  const ALT_CART_IMAGE = 'Cart item image';
  const ARIA_DEFAULT = 'Invisible link';
  const CDN = 'https://dev.juliangalvez.xyz/frist';
  
  const loadCSS = () => {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `${CDN}/css/main.css`;
    // link.href = 'css/main.css';
    link.media = 'all';
    head.appendChild(link);
  }
  
  const dynamicallyLoadScript = (url, content) => {
    var script = document.createElement('script');  // create a script DOM node
    if (url) {
      script.src = url;  // set its src to the provided URL
    } else if (content) {
      script.textContent = content;
    }
    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
  };
  
  // Function to fix WCAG issues
  const WCAG = () => {
    // define alt attribute for cart images
    $('img.img-responsive.cartImg').attr('alt', ALT_CART_IMAGE);
    
    // change section to div
    // const element = $('section')[0];
    // const res = $('<div/>', {
    //   html: element.innerHTML,
    //   class: element.className,
    // });
    // element.replaceWith(res[0]);
    
    //Fix autocomplete
    $('input[id*="_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]').attr('autocomplete', 'current-password');
    
    //Remove empty headings
    $('h3, h2, h1, h4, h5, h6').each((a, b) => {
      const e = $(b);
      if (e.text().trim() === '') {
        e.remove();
      }
    });
    
    // put default alt to images without alt (basically hidden images)
    $('img').each((index, item) => {
      const element = $(item);
      if (!element.attr('alt')) {
        element.attr('alt', ALT_CART_IMAGE);
      }
    });
    
    $('a').each((index, item) => {
      const element = $(item);
      if (!element.attr('aria-label') && element.find('img').length === 0) {
        const text = element.text().trim();
        if (text !== '') {
          element.attr('aria-label', text);
          return;
        }
        let title = element.attr('title');
        if (title) {
          title = title.trim().replace(/:/g, '').trim();
          element.attr('aria-label', title);
          return;
        }
        element.text(ARIA_DEFAULT);
        element.attr('aria-label', ARIA_DEFAULT);
      }
    });
  };
  
  // Function to change AM and PM to a.m. and p.m.
  const changeAMPM = (val) => val.replace(/AM/g, 'a.m.').replace(/PM/g, 'p.m.');
  
  // Function add HTML for date and time action links
  const dateTimeActions = () => {
    $('h2.Programming_Event_DateContainer + span a').text('Select other dates');
    $('h2.Programming_Event_TimeContainer + span a').text('See other times');
  };
  
  // set favicon function
  const setFavicon = () => {
    document.querySelector("link[rel*='ICON']").remove();
    const l32 = document.createElement('link');
    l32.type = 'image/x-icon';
    l32.rel = 'shortcut icon';
    l32.sizes= '32x32'
    l32.href = `${CDN}/assets/favicon-32x32.png`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(l32);
    const l16 = document.createElement('link');
    l16.type = 'image/x-icon';
    l16.rel = 'shortcut icon';
    l16.sizes= '16x16'
    l16.href = `${CDN}/assets/favicon-16x16.png`;
    head.appendChild(l16);
  };
  
  // Function to change date and time html
  const transformDateAndTime = () => {
    const dateElement = $('.Programming_Event_Date');
    const parts = dateElement.text().split(' ');
    if (parts.length > 0) {
      let newDate = `${parts.shift()},`;
      if (parts.length == 2) {
        newDate = `${newDate} ${parts.join(' ')}, ${new Date().getFullYear()}`;
      } else {
        const year = parts.pop();
        newDate = `${newDate} ${parts.join(' ')}, ${year}`;
      }
      dateElement.text(newDate);
    }
    let time = `${$('.Programming_Event_StartTime').text().trim()}–${$('.Programming_Event_EndTime').text().trim()}`;
    time = changeAMPM(time);
    $('.Programming_Event_TimeInnerContainer_Custom').text(time);
  };
  
  // Function to change AMPM on checkout page
  const transformCheckoutTime = () => {
    $('.PaymentPart_CartItemDetails > div > span').each((index, item) => {
      const element = $(item);
      element.text(changeAMPM(element.text()));
    });
  };
  
  // Function to load Google Translate
  const loadGoogleTranslate = () => {
    dynamicallyLoadScript(null, `
    function googleTranslateElementInit2() {
      new google.translate.TranslateElement({ pageLanguage: 'en',autoDisplay: false }, 'google_translate_element2');
    }
    `);
    dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2', null);
    dynamicallyLoadScript(null, `
    /* <![CDATA[ */
      function GTranslateFireEvent(element, event) {
        try {
          if (document.createEventObject) {
            var evt = document.createEventObject();
            element.fireEvent('on' + event, evt)
          } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt)
          }
        } catch (e) {}
      }
      
      function doGTranslate(lang_pair) {
        if (lang_pair.value) lang_pair = lang_pair.value;
        if (lang_pair == '') return;
        var lang = lang_pair.split('|')[1];
        var teCombo;
        var sel = document.getElementsByTagName('select');
        for (var i = 0; i < sel.length; i++)
        if (sel[i].className == 'goog-te-combo') teCombo = sel[i];
        if (document.getElementById('google_translate_element2') == null ||
        document.getElementById('google_translate_element2').innerHTML.length == 0 || 
        teCombo.length == 0 || 
        teCombo.innerHTML.length == 0) {
          setTimeout(function() {
            doGTranslate(lang_pair)
          }, 500)
        } else {
          teCombo.value = lang;
          GTranslateFireEvent(teCombo, 'change');
          GTranslateFireEvent(teCombo, 'change')
        }
      }
      
      function GTranslateGetCurrentLang() {
        var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
        return keyValue ? keyValue[2].split('/')[2] : null;
      }
      if (GTranslateGetCurrentLang() != null) jQuery(document).ready(function() {
        jQuery('div.switcher div.selected a').html(jQuery('div.switcher div.option').find('span.gflag img[alt="' + GTranslateGetCurrentLang() + '"]').parent().parent().html());
      });
      /* ]]> */
      `);
    };
    
    const MEMBERPOPUP_KEY = 'memberpopup';
    
    /**
    * Pass submit event from member dialog to login form
    * @param evt HTML event
    */
    const newLoginSubmit = (evt) => {
      evt.preventDefault();
      // $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]')
      //   .find('.ui-dialog-buttonset button:last-child')
      //   .click();
      const sign = Object.keys(window).filter(key => key.indexOf('UserModalSignIn') !== -1);
      if (sign.length === 1) {
        window[sign[0]].doEditSave();
      }
    };
    
    /**
    * Pass text from an input to another
    * @param from Input source
    * @param to Input destination
    */
    const passTextValue = (from, to) => {
      $(from).on('keyup', () => {
        $(to).val($(from).val());
      });
      $(from).on('keydown', (e) => {
        if (e.keyCode === 13) {
          newLoginSubmit(e);
          return false;
        }
      })
    };
    
    /**
    * Pass click event from one html element to another
    * @param from Element source
    * @param to Element destination
    */
    const passClick = (from, to) => {
      $(from).on('change', () => {
        $(to).click();
      });
    };
    
    /**
    * Check if page should show member dialog
    * @returns {boolean}
    */
    const showMemberDialog = () => {
      const difference = 1000 * 3600;
      const now = new Date().getTime();
      const lastTime = window.localStorage.getItem(MEMBERPOPUP_KEY);
      return !(lastTime && (now - parseInt(lastTime) < difference));
    };
    
    /**
    * Check if user is logged in
    * @returns {boolean} true when user is logged in
    */
    const isAuthenticated = () => {
      const auth = $('[id*="LinkbuttonSignOut"]').length;
      return auth > 0;
    };
    
    /**
    * Get message to be displayed on login or change password dialogs
    * @returns {string} the message to show or null if there's no message
    */
    const getLoginMessage = () => {
      const m = $('.UserModalPartDialog').find('.MS_LoginMessage').html();
      return (m && m.length > 0) ? m : null;
    };
    
    /**
    * Create markup for member dialog
    * @param MEMBER_SIGNIN
    * @param MEMBER_DISCOUNT
    * @param SIGNIN_AND_CHECKOUT
    * @param JOIN_DISCOUNT
    * @param JOIN
    * @param GUEST
    * @param REGISTER_URL
    * @param MEMBERSHIP_URL
    * @param FORGOTPASSWORD_URL
    * @param ALTHRU_PREFIX
    */
    const createMemberDialog = (
      MEMBER_SIGNIN = 'Member Sign-In',
      MEMBER_DISCOUNT = 'Please sign in to receive your member discount.',
      SIGNIN_AND_CHECKOUT = 'Sign in & Check Out',
      JOIN_DISCOUNT = 'Become a member today and get a discount on your order.',
      JOIN = 'Become a Member',
      GUEST = 'Check Out as Guest',
      REGISTER_URL = '#',
      MEMBERSHIP_URL = '#',
      FORGOTPASSWORD_URL = '#',
      ALTHRU_PREFIX = 'PC1335_ctl00_') => {
        const actions = () => {
          const basicHtml = `
          <div style="display: none;">
          <div id="popuplogin" class="container ui-corner-all">
          <div class="row row-eq-height">
          <div id="popuploginformcontainer" class="col-xs-12 col-sm-8">
          <h3>${MEMBER_SIGNIN}</h3>
          <p>${MEMBER_DISCOUNT}</p>
          <div id="popuploginform">
          <div class="form-horizontal">
          <div class="form-group">
          <label for="new-username" id="new-username-label" class="col-sm-12 control-label" style="padding-right:0">Email:</label>
          <div class="col-sm-12">
          <input name="new-username" type="text" id="new-username" autocomplete="new-username" class="BBFormTextbox LoginFormTextbox form-control">
          <a href="${REGISTER_URL}" id="${ALTHRU_PREFIX}UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonRegisterDialog" class="LoginLink" href="javascript:__doPostBack('${ALTHRU_PREFIX.replace('_', '$')}$UserModalSignIn$UserModalPartDialog1$UserModalPartDialogBody$LinkbuttonRegisterDialog','')">Register for new account</a>
          </div>
          </div>
          <div class="form-group">
          <label for="new-password" id="new-password-label" class="col-sm-12 control-label" style="padding-right:0">Password:</label>
          <div class="col-sm-12">
          <input name="new-password" type="password" autocomplete="new-password" id="new-password" class="BBFormTextbox LoginFormTextbox form-control">
          <a href="${FORGOTPASSWORD_URL}" id="${ALTHRU_PREFIX}_UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonForgotPassword" class="LoginLink" href="#">Forgot your password?</a>
          </div>
          </div>
          <div class="form-group">
          <div class="col-sm-12">
          <div class="checkbox">
          <input id="new-checkbox" type="checkbox" name="new-checkbox">Remember me</label>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div id="popupsubmitform" class="ui-dialog-buttonpane">
          <button id="new-submit">
          ${SIGNIN_AND_CHECKOUT}
          </button>
          </div>
          </div>
          <div id="popuploginregister" class="col-xs-12 col-sm-4 ui-dialog-buttonpane">
          <div class="join-container">
          <p class="join-discount">${JOIN_DISCOUNT}</p>
          <button id="join-button" onClick="window.location = '${MEMBERSHIP_URL}'">
          ${JOIN}
          </button>
          <a id="checkoutguest" href="#">${GUEST}</a>
          </div>
          </div>
          </div>
          </div>
          </div>
          `;
          $('[aria-describedby*="UserModalSignIn_UserModalPartDialog1"]').appendTo('form');
          $(basicHtml).appendTo('form');
          $('#new-submit').on('click', newLoginSubmit);
          passTextValue('#new-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
          passTextValue('#new-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
          passClick('#new-checkbox', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
          
          $('#popuplogin').dialog({
            title: null,
            position: { my: "top", at: "center", of: ".site-header.row" },
            draggable: false,
            modal: true,
            resizable: false,
            dialogClass: 'newLogin',
            autoOpen: false,
            open: () => {
              window.scrollTo(0, 0);
              $('.ui-widget-overlay, #checkoutguest').on('click', (evt) => {
                evt.preventDefault();
                $('#popuplogin').dialog('close');
              });
            },
          });
          
          if (!isAuthenticated() && !getLoginMessage()) {
            if ($('div[id$="_panelEvent"]').length > 0 && showMemberDialog()) {
              $('#popuplogin').dialog('open');
              // set timer
              window.localStorage.setItem(MEMBERPOPUP_KEY, `${new Date().getTime()}`);
            }
            // $('#signindialog').dialog('close');
          }
        }
        setTimeout(actions, 3000);
      };
      
      /**
      * Edit original login popup
      * @param LOGIN_TITLE
      * @param CHANGEPASSWORD_TITLE
      */
      const editCurrentLoginPopup = (
        LOGIN_TITLE = 'Sign in',
        CHANGEPASSWORD_TITLE = 'Change your password') => {
          const edits = () => {
            const newButtonReference = $('.account');
            const buttonReference = $('[id*="UserModalSignIn_UserModalPartEditLink"]');
            try {
              buttonReference.click();
              $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"] .ui-dialog-buttonset button:first').click();
              $('.ui-dialog-content').dialog('close');
            } catch (e) {}
            
            $('#signindialog').dialog({
              autoOpen: false,
              title: LOGIN_TITLE,
              position: { my: "top", at: "center", of: ".site-header.row" },
              draggable: false,
              modal: true,
              resizable: false,
              dialogClass: 'signindialog',
              open: () => {
                $('.ui-widget-overlay').on('click', (evt) => {
                  evt.preventDefault();
                  $('#signindialog').dialog('close');
                });
              },
            });
            
            $('#changepassword').dialog({
              autoOpen: false,
              title: CHANGEPASSWORD_TITLE,
              position: { my: "top", at: "center", of: ".site-header.row" },
              draggable: false,
              modal: true,
              resizable: false,
              dialogClass: 'changepassword',
              open: () => {
                $('.ui-widget-overlay').on('click', (evt) => {
                  evt.preventDefault();
                  $('#changepassword').dialog('close');
                });
              },
            });
            
            if (isAuthenticated()) {
              const changeButtonReference = $('[id*="UserModalSignedIn_UserModalPartEditLink"]');
              try{
                changeButtonReference.click();
                $('.ui-dialog-content').dialog('close');
              } catch(e) {}
              changeButtonReference.off();
              newButtonReference.on('click', () => {
                $('#changepassword').dialog('open');
              });
              const message = getLoginMessage();
              if (message) {
                // $('#popuplogin').dialog('close');
                $('#changepasswordMessage').html(`<div class="signinmessage">${message}</div>`);
                // $('#signindialog .alert').removeClass('hidden');
                $('#changepassword').dialog('open');
              }
              passTextValue('#currentpassword', '[id$="TextboxPasswordChangeOld"]');
              passTextValue('#newpassword', '[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange1"]');
              passTextValue('#confirmpassword', '[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange2"]');
              $('#submitchangepassword').on('click', () => {
                const change = Object.keys(window).filter(key => key.indexOf('UserModalSignedIn') !== -1);
                if (change.length === 1) {
                  window[change[0]].doEditSave();
                }
              });
              $('#changepasswordcancel').on('click', () => {
                $('#changepassword').dialog('close');
              });
            } else {
              const message = getLoginMessage();
              if (message) {
                // $('#popuplogin').dialog('close');
                $('#signindialog_DivSignInMessage').html(`<div class="signinmessage">${message}</div>`);
                // $('#signindialog .alert').removeClass('hidden');
                $('#signindialog').dialog('open');
              }
              buttonReference.off();
              newButtonReference.on('click', () => {
                $('#signindialog').dialog('open');
              });
              
              $('#signinbutton').on('click', newLoginSubmit);
              passTextValue('#sign-username', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
              passTextValue('#sign-password', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
              passClick('#remember-sign', '[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]');
            }
          };
          setTimeout(edits, 1000);
        };
        
        const popups = (
          MEMBER_SIGNIN = undefined,
          MEMBER_DISCOUNT = undefined,
          SIGNIN_AND_CHECKOUT = undefined,
          JOIN_DISCOUNT = undefined,
          JOIN = undefined,
          GUEST = undefined,
          REGISTER_URL = undefined,
          MEMBERSHIP_URL = undefined,
          FORGOTPASSWORD_URL = undefined,
          ALTHRU_PREFIX = undefined,
          LOGIN_TITLE = undefined,
          CHANGEPASSWORD_TITLE = undefined) => {
            createMemberDialog(
              MEMBER_SIGNIN,
              MEMBER_DISCOUNT,
              SIGNIN_AND_CHECKOUT,
              JOIN_DISCOUNT,
              JOIN,
              GUEST,
              REGISTER_URL,
              MEMBERSHIP_URL,
              FORGOTPASSWORD_URL,
              ALTHRU_PREFIX);
              editCurrentLoginPopup(
                LOGIN_TITLE,
                CHANGEPASSWORD_TITLE);
              };
              
              // Load external CSS
              loadCSS();
              
              // Load Google Translate
              loadGoogleTranslate();
              
              // Add links to edit cart items
              $('.PaymentPart_CartDescriptionCell').each((index, item) => {
                const titleElement = $(item).find('h4');
                const link = $(titleElement).find('a').attr('href');
                if (link) {
                  titleElement.after(`<a aria-label="Edit item in cart" class="edit-item-link" href="${link}">${LINK_TITLE}</a>`);
                }
              });
              
              // Change position of donations section
              $('div[id*="_divSummaryOuter"]').after($('div[id*="_additionalDonationSection"]'));
              
              // Change position of cart summary section
              $('div[id*="_divPersonalInfo"]').after($('#divCartSummary .form-group.lead.text-success'));
              
              // Change billing section title
              $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);
              
              // register menu event
              $('#menu-icon').click((evt) => {
                evt.preventDefault();
                if ($('#menu-icon').hasClass('open')) {
                  $('#menu-icon').removeClass('open');
                  $('.site-wrapper header.site-header').removeClass('fixedmenu');
                } else {
                  $('#menu-icon').addClass('open');
                  $('.site-wrapper header.site-header').addClass('fixedmenu');
                }
                $('#new-menu-links').slideToggle('fast');
              });
              
              // transform dates and time
              transformDateAndTime();
              
              // add date and time action links
              dateTimeActions();
              
              // transform time on checkout page
              transformCheckoutTime();
              
              // set favicon
              setFavicon();
              
              // change Empty cart text
              $('[id*="_CartGrid_lbRemoveAll"]').text(EMPTY_CART_TEXT);
              $('[id*="_labelDeliveryMethodCaption"]').text(DELIVERY_TEXT);
              
              // Fix WCAG issues
              WCAG();
              
              popups();
              
            })();
            