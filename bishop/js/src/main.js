function googleTranslateElementInit2() {
  console.log('Callback');
  new google.translate.TranslateElement({pageLanguage: 'en',autoDisplay: false}, 'google_translate_element2');
}

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}));

(() => {
  const LINK_TITLE = 'Review or edit item';
  const BILLING_TITLE = 'Billing Information';
  // const EMPTY_CART_TEXT = 'Empty cart';
  // const DELIVERY_TEXT = 'How do you want us to deliver your tickets?';
  const ALT_CART_IMAGE = 'Cart item image';
  const ARIA_DEFAULT = 'Invisible link';
  const DONATION_TEXT = 'Make a donation';
  const LOGIN_TITLE = 'Sign in';
  // const MEMBER_SIGNIN = 'Member Sign-In';
  // const MEMBER_DISCOUNT = 'Please sign in to receive your member discount.';
  const LOGIN_DESCRIPTION = '<p class="new-login-description">If you don’t know what your membership e-mail is, please call our Membership Department at 615-353-6984 or 615-354-6389 or Email our Membership Department.</p>';
  const REGISTER_NEW_ACCOUNT = 'Register for new account';
  // const SIGNIN_AND_CHECKOUT = 'Sign in & Check Out';

  const readCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const editCurrentLoginPopup = () => {
    // Login button reference
    const buttonReference = $('[id*="UserModalSignIn_UserModalPartEditLink"]');

    // $('.ui-dialog').css('width',  'auto');
   
    buttonReference.on('click', () => {
      setTimeout(() => {
        $('.ui-widget-overlay').on('click', (evt) => {
          evt.preventDefault();
          $('[id*="UserModalSignIn_UserModalPartDialog1"]').dialog('close');
        });
      })
    });
   
    // getting a login dialog reference
    const dialog = $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]');
    // getting a reference of title html
    const title = $(dialog).find('.ui-dialog-title.modal-title');
    $(title).html(LOGIN_TITLE);
    // prepending a text section in dialog
    const body = $(dialog).find('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_DivSignInContainer"]');
    $(body).prepend(LOGIN_DESCRIPTION);
   
    // move register link
    const linkRegister = $(dialog).find('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonRegisterDialog"]');
    $(linkRegister).text(REGISTER_NEW_ACCOUNT);
    const usernameField = $(dialog).find('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]');
    linkRegister.insertAfter(usernameField);
   
    // move recover password link
    const linkPassword = $(dialog).find('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_LinkbuttonForgotPassword"]');
    const passwordField = $(dialog).find('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]');
    linkPassword.insertAfter(passwordField);
    // hide close button
    $(dialog).find('.ui-dialog-buttonset button:first-child').css('display', 'none');
  };
  
  // Function to fix WCAG issues
  const WCAG = () => {
    // define alt attribute for cart images
    $('img.img-responsive.cartImg').attr('alt', ALT_CART_IMAGE);
    
    // change section to div
    const element = $('section')[0];
    const res = $('<div/>', {
      html: element.innerHTML,
      class: element.className,
    });
    element.replaceWith(res[0]);
    
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
  
  const replaceText = () => {
    $('.MS_LoginLink a').text('Login');
    $('input[id*="buttonAddEventToCart"]').val('CONTINUE');
    $('div.cart-type-group.cart-type-Donations.single-cart-item .PaymentPart_CartDescriptionCell')
      .html(`<span>${DONATION_TEXT}</span>`);
    transformDateAndTime();
    dateTimeActions();
    transformCheckoutTime();
    WCAG();
  };
  
  const generalAdmissionBg = () => {
    if ($('h1 span[id*="_labelEventName"]').text() === 'Timed General Admission') {
      $('.site-container').addClass('admissionBg');
    }
  };
  
  // Function to change AM and PM to a.m. and p.m.
  const changeAMPM = (val) => val.replace(/AM/g, 'a.m.').replace(/PM/g, 'p.m.');
  
  // Function add HTML for date and time action links
  const dateTimeActions = () => {
    $('h2.Programming_Event_DateContainer + span a').text('Select other dates');
    $('h2.Programming_Event_TimeContainer + span a').text('See other times');
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
  
  const organiceItems = () => {
    // Add links to edit cart items
    $('.PaymentPart_CartDescriptionCell').each((index, item) => {
      const titleElement = $(item).find('h4');
      const link = $(titleElement).find('a').attr('href');
      if (link) {
        titleElement.after(`<a aria-label="Edit item in cart" class="edit-item-link" href="${link}">${LINK_TITLE}</a>`);
        const thumb = `
          <div id="PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_tdImageItem_0">
            <a href="${link}" id="PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_hyperlinkItemThumbnail_0">
              <img id="PC1280_ctl00_CartGrid_rptCategories_rptItems_0_itemTemplate_0_imageItemThumbnail_0" class="img-responsive cartImg" src="assets/bishop-thumbnail.png" alt="Cart item image">
            </a>
          </div>
        `;
        $(item).before(thumb);
      }
    });
    
    // Change position of cart summary section
    $('div[id*="_divUserSignUp"]').after($('#divCartSummary .form-group.lead.text-success'));

    // Change position of dicount section
    $('#divCartSummary .form-group:first-child').before($('div[id*="_divDiscountCodeEntry"]'));
    
    // Change billing section title
    $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);

    // Add image on checkout page
    // $('div[id*="_upPayment"] > div > div:nth-child(2)').before(`
    //   <div class="col-xs-12">
    //     <img id="checkout-bishop-image" class="img-responsive cartImg" src="assets/bishop-thumbnail.png" alt="Bishop Logo">
    //   </div>
    // `);

    $('div[id*="_registrantBioInfoSection"] .form-group label').each((index, item) => {
      const t = $(item).text();
      $(item).text(t.replace(':', ''));
    });
  };

  const checkLanguage = () => {
    const current = readCookie('googtrans');
    let selector = '#translate-menu a';
    $(selector).removeClass('active');
    if (current === '/en/ja') {
      selector = `${selector}:last-child`;
    } else {
      selector = `${selector}:first-child`;
    }
    $(selector).addClass('active');
  };
  
  const translateOptions = () => {

    $('.MS_LoginButtonOuterWrapperContainer .MS_LoginButtonInnerContainer').after(`
      <div id="translate-menu">
        <a href="#" onclick="doGTranslate('en|en');" title="English" class="skiptranslate active">
          English
        </a>
        <a href="#" onclick="doGTranslate('en|ja');" title="日本語" class="skiptranslate">
          日本語
        </a>
      </div>
    `);

    $('form#form1').before('<div id="google_translate_element2"></div>');

    const dynamicallyLoadScript = (url) => {
      var script = document.createElement('script');  // create a script DOM node
      script.src = url;  // set its src to the provided URL
      document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    };

    dynamicallyLoadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2');

    checkLanguage();

    $('#translate-menu a').click((e) => {
      checkLanguage();
      e.preventDefault();
    });

  };

  const fixLayout = () => {
    $('.MSFootTextDiv:last').load('html/footer.html', () => {
      generalAdmissionBg();
      replaceText();
      organiceItems();
      editCurrentLoginPopup();
      translateOptions();
    });
  };
  fixLayout();
})();
