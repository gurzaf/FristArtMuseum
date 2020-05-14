const fristEdits = () => {
  const LINK_TITLE = 'Review or edit item';
  const BILLING_TITLE = 'Billing Information';

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

  // Add links to edit cart items
  $('.PaymentPart_CartDescriptionCell').each((index, item) => {
    const titleElement = $(item).find('h4');
    const link = $(titleElement).find('a').attr('href');
    if (link) {
      titleElement.after(`<a class="edit-item-link" href="${link}">${LINK_TITLE}</a>`);
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
};

const init = () => {
  $('.MSFootTextDiv').html('');
  $('.MS_LoginButtonOuterWrapperContainer').hide();
  $('.MSFootTextDiv:first').load('html/header.html', () => {
    $('.MSFootTextDiv:last').load('html/footer.html', () => {
      fristEdits();
    });
  });
};

init();
