const LINK_TITLE = 'Review or edit item';

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
};

editPage();