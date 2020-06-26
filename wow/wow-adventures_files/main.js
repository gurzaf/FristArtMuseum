$('style').remove();
$('body').removeAttr('style');
var spans = $('span');
for (var index = 0; index < spans.length; index++) {
    var span = spans[index];
    var parent = $(span).parent().parent().attr('class');
    var keep = false;
    if (parent && parent.length > 0 && parent.indexOf('Programming_Event_Description') > -1) {
        keep = true;
    }
    if (!keep) {
        $(span).removeAttr('style');
    }
}

// Hide the default buttons for register and login
$('.MS_LoginButtonOuterWrapperContainer').hide();

// Rename "Other dates..." to "Select other date"
$('[id*="labelAlternateDates"]').html('Select other date');
$('[id*="spanAlternateDatesLink"]').removeClass('pull-right');

// Rename "Other times:" to "Select other time"
$('[id*="labelAlternateTimes"]').html('Select other time');
$('[id*="spanAlternateTimesLink"]').removeClass('pull-right');

// Add the Selected date text
$('.Programming_Event_DateContainer').parent().prepend('<div class="selected-item">Selected Date</div>');

// Add the Selected time text
$('.Programming_Event_TimeContainer').parent().prepend('<div class="selected-item">Selected Time</div>');

// Setup home dialog
var config = {
    title: null,
    position: {
        my: 'top',
        at: 'center',
        of: '.site-header'
    },
    draggable: false,
    modal: true,
    resizable: false,
    autoOpen: false,
    width: 850
};

if ($(window).width() < 850) {
    config.width = $(window).width() * 0.90;
}

$('#home-dialog').dialog(config);

config = {
    title: null,
    position: {
        my: 'top',
        at: 'center',
        of: '.site-header'
    },
    draggable: false,
    modal: true,
    resizable: false,
    autoOpen: false,
    width: $(window).width() * 0.90
};

$('#home-dialog-mobile').dialog(config);
$('#home-dialog-mobile').parent().css('background', 'none');
$('#home-dialog-mobile').parent().css('border', 'none');

// Click event for dialog
$('.home').click(function (e) {
    if ($(window).width() < 630) { // Mobile dialog
        $('#home-dialog-mobile').dialog('open');
        $('#home-dialog-mobile').parent().css('top', '20px');
    } else { // Desktop dialog
        $('#home-dialog').dialog('open');
    }
});

// Close the dialog
$('.close-dialog').click(function (e) {
    var id = $(this).parent().attr('id');
    $('#' + id).dialog('close');
});

// Click event for sub navigation menu
$('.menu-btn').click(function (e) {
    if ($('.sub-navigation').hasClass('hidden')) {
        $('.sub-navigation').removeClass('hidden');
        $(this).find('img').attr('src', 'https://cdn.socialgoodsoftware.com/cd9b4efd89c39ed5fed18bcb6a107ffb9022b59aa6c75f99a1cb3651b9d47e4dbeaab272d0ec899014fbc43d735fb4fb/59bf8768-81a2-49ed-bad5-bfa8f80be98a/close.svg');
    } else {
        $('.sub-navigation').addClass('hidden');
        $(this).find('img').attr('src', 'https://cdn.socialgoodsoftware.com/cd9b4efd89c39ed5fed18bcb6a107ffb9022b59aa6c75f99a1cb3651b9d47e4dbeaab272d0ec899014fbc43d735fb4fb/67f9cc48-d9b8-403c-84b9-e36431bfd1c9/menu-icon.svg');
    }
});

// Click event register link
$('.register-btn').click(function (e) {
    $('[id*="LinkbuttonRegister"]').click();
});

// Click event forgot password link
$('.forgot-password-btn').click(function (e) {
    $('.DivForgotPassword .LoginLink').click();
});

// Click event for sign-in dialog
$('.login-btn').click(function (e) {
    $('#sign-in-dialog').dialog('open');
});

config = {
    title: null,
    position: {
        my: 'top',
        at: 'center',
        of: '.site-header'
    },
    draggable: false,
    modal: true,
    resizable: false,
    autoOpen: false,
    width: 450
};

if ($(window).width() < 450) {
    config.width = $(window).width() * 0.90;
}

// Setup sign-in dialog
$('#sign-in-dialog').dialog(config);

// Click event for sign-in input fields
$('#sign-in').click(function (e) {
    var email = $('#sign-in-email').val();
    var password = $('#sign-in-password').val();
    var remember = ($('#remember-me').is(':checked') ? true : false);

    $('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxUserName"]').val(email).trigger('change');
    $('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPassword"]').val(password).trigger('change');

    var checked = $('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]').is(':checked');

    if (!remember && checked) {
        $('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]').trigger('click');
    }
    if (remember && !checked) {
        $('[id$="UserModalSignIn_UserModalPartDialog1_UserModalPartDialogBody_CheckboxRememberSignIn"]').trigger('click');
    }
    var button = $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]').find('.ui-dialog-buttonset button')[1];
    $(button).click();
});

// Check if the default pop-up is enabled
var message = $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]').find('.MS_LoginMessage').html();
if (message && message.length > 0) {
    $('[aria-describedby$="UserModalSignIn_UserModalPartDialog1"]').hide();
    $('.ui-widget-overlay').hide();
    $('#sign-in-dialog-container .form-container .message').html(message);
    $('#sign-in-dialog-container .form-container .alert').removeClass('hidden');
    $('#sign-in-dialog').dialog('open');
}

// Member Dialog to login
config = {
    title: null,
    position: {
        my: 'top',
        at: 'center',
        of: '.site-header'
    },
    draggable: false,
    modal: true,
    resizable: false,
    autoOpen: false,
    width: 700
};

if ($(window).width() < 700) {
    config.width = $(window).width() * 0.90;
}

$('#member-dialog').dialog(config);

// Fix the forgot password page
var reset = $('[id*="trForgot"]').length;
if (reset > 0) {
    $('.checkout-page').removeClass('active');
    $('.checkout-page').addClass('disabled');
    $('.checkout-page').parent().find('.right-arrow').addClass('disabled');
    $('.cart-page').parent().addClass('disabled');
    $('#member-dialog').dialog('close');
}

// Fix the registration page
var registration = $('[id*="registrationDetailsHeader"]').length;
if (registration > 0) {
    $('.checkout-page').removeClass('active');
    $('.checkout-page').addClass('disabled');
    $('.checkout-page').parent().find('.right-arrow').addClass('disabled');
    $('.cart-page').parent().addClass('disabled');
    $('#member-dialog').dialog('close');
    $('[id*="registrationDetailsHeader"]').parent().parent().hide();
    $('[id*="UserRegistration"]').css('margin-top', '100px');
    $('#divPrimaryRegistrationCredentials').parent().parent().css('max-width', '550px');
    $('[id*="RegistrantCredentialsHeader"]').parent().css('margin-bottom', '20px');
    var markup = $('[id*="btnRegister"]').parent().html();
    $('[id*="btnRegister"]').parent().remove();
    $('[id*="UserRegistration"]').append('<div class="col-md-12"><div class="pull-right">' + markup + '</div></div>');
}

// Check if we are logged in
var auth = $('[id*="LinkbuttonSignOut"]').length;
if (auth > 0) {
    // Setup items for logged in user
    $('.auth-required').addClass('hidden');
    $('.auth').removeClass('hidden');
    var email = $('[id*="UserModalSignedIn_UserModalPartEditLink1"]').text();
    email = email.split('|')[0].replace(/\s/g, '');
    $('.main-navigation .auth li').first().html('<a href="#change-password" class="change-password"><span class="btn outline-btn user-details">' + email + '</span></a>');
    $('.mobile-nav-wrapper .auth li').first().html('<a href="#change-password" class="change-password"><span class="btn outline-btn user-details">' + email + '</span></a>');

    // Logout click event handler
    $('.logout-btn').click(function (e) {
        var href = $('[id*="LinkbuttonSignOut"]').attr('href');
        href = href.split(':')[1];
        eval(href);
    });

    // Change password dialog
    var config = {
        title: null,
        position: {
            my: 'top',
            at: 'center',
            of: '.site-header'
        },
        draggable: false,
        modal: true,
        resizable: false,
        autoOpen: false,
        width: 500
    };

    if ($(window).width() < 500) {
        config.width = $(window).width() * 0.90;
    }

    $('#change-password-dialog').dialog(config);

    // Open the change password dialog
    $('.change-password').click(function (e) {
        $('#change-password-dialog').dialog('open');
    });

    // Check if we should open the dialog
    var message = $('.UserModalPartDialog').find('.MS_LoginMessage').html();
    if (message && message.length > 0) {
        $('#change-password-dialog .message').html(message);
        $('#change-password-dialog .alert').removeClass('hidden');
        if (message === 'Your password was changed.') {
            $('#change-password-dialog .alert').addClass('alert-success');
            $('#change-password-dialog .alert').removeClass('alert-danger');
        }
        $('#change-password-dialog').dialog('open');
    }

    // Change password confirm button
    $('#change-password-btn').click(function (e) {
        var password = $('#current-password').val();
        var newPassword = $('#new-password').val();
        var confirmedPassword = $('#confirmed-password').val();

        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChangeOld"]').val(password);
        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChangeOld"]').trigger('change');

        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange1"]').val(newPassword);
        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange1"]').trigger('change');

        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange2"]').val(confirmedPassword);
        $('[id$="UserModalSignedIn_UserModalPartDialog1_UserModalPartDialogBody_TextboxPasswordChange2"]').trigger('change');

        var button = $('[aria-describedby$="UserModalSignedIn_UserModalPartDialog1"]').find('.ui-dialog-buttonset button')[1];
        $(button).click();
    });
}

// Mobile device fixes
if ($(window).width() < 630) {
    $('[id*="CartGrid_topLinkBar"]').css('position', 'absolute');
    $('[id*="CartGrid_topLinkBar"]').css('top', '25px');
    $('[id*="CartGrid_topLinkBar"]').css('right', '5px');
    $('[id*="CartGrid_cartPanel"]').css('padding', '0px');

    $('.col-xs-9').addClass('col-xs-12').removeClass('col-xs-9');
    $('.PaymentPart_CartDiscountApplyButton').parent().removeClass('col-xs-3').addClass('col-xs-4').addClass('pull-right');
    $('.PaymentPart_CartDiscountApplyButton').css('margin-top', '10px');
    $('[id*="divDiscountCodeEntry"]').css('margin-bottom', '0px');

    // Fix registration page 
    $('[id*="UserRegistration"]').css('margin-top', '0px');
    $('[id*="userMessage"]').css('margin-top', '10px').css('display', 'block');
    $('[id*="userMessageTitle"]').css('margin-top', '0px');
    $('[id*="txtForgotPWDUserNameEmail"]').css('width', $(window).width() * 0.68 + 'px');
    $('.LoginFormSubmitButton').parent().css('float', 'right');

    // Check if the cart items expired
    var message = $('[id*="CartGrid_itemExpirationContainer"]').find('.alert').text();
    message = message.replace(/\s/g, '');
    if (message && message.length > 0) {
        $('[id*="CartGrid_topLinkBar"]').hide();
    }
}

// Safari Fix
if ('safari' in window) {
    $('.home').addClass('home-fix');
}

// Fix reset password page
$('[id*="tbdResetPassword"]').find('tr').css('margin-bottom', '10px');
$('[id*="tbdResetPassword"]').find('tr').css('display', 'block');
$('[id*="txtResetPassword"]').css('margin-left', '10px');
$('[id*="txtConfirmPassword"]').css('margin-left', '10px');
$('[id*="trSignInBody"]').find('[id*="trLogout"]').hide();

// Hide errors onload
$('.text-danger').hide();