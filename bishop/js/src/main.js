(() => {
  const replaceText = () => {
    $('.MS_LoginLink a').text('Login');
    $('input[id*="buttonAddEventToCart"]').val('Continue');
    transformDateAndTime();
    dateTimeActions();
    transformCheckoutTime();
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

  const fixLayout = () => {
    $('.MSFootTextDiv:last').load('html/footer.html', () => {
      generalAdmissionBg();
      replaceText();
    });
  };
  fixLayout();
})();
