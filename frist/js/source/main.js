const LINK_TITLE = 'Review or edit item';
const BILLING_TITLE = 'Billing Information';

const editPage = () => {
  // cart links
  $('.PaymentPart_CartDescriptionCell').each((index, item) => {
    const titleElement = $(item).find('h4');
    const link = $(titleElement).find('a').attr('href');
    if (link) {
      titleElement.after(`<a class="edit-item-link" href="${link}">${LINK_TITLE}</a>`);
    }
  });
  // Donations
  $('div[id*="_divSummaryOuter"]').after($('div[id*="_additionalDonationSection"]'));
  $('div[id*="_divPersonalInfo"]').after($('#divCartSummary .form-group.lead.text-success'));
  // Changes billing title
  $('span[id*="_lblPersonalInfo"]').text(BILLING_TITLE);
  // register menu event
  $('#menu-icon').click((evt) => {
    evt.preventDefault();
    if ($('#menu-icon').hasClass('open')) {
      $('#menu-icon').removeClass('open');
    } else {
      $('#menu-icon').addClass('open');
    }
    $('#new-menu-links').slideToggle('fast');
  });
};

const init = () => {
  $('.MSFootTextDiv').html('');
  $('.MS_LoginButtonOuterWrapperContainer').hide();
  $('.MSFootTextDiv:first').load('html/header.html', () => {
    $('.MSFootTextDiv:last').load('html/footer.html', () => {
      editPage();
    });
  });
};

init();
