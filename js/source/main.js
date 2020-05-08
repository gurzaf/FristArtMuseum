const LINK_TITLE = 'Review or edit item';

const editPage = () => {
  // cart links
  $('.PaymentPart_CartDescriptionCell').each((index, item) => {
    const titleElement = $(item).find('h4');
    const link = $(titleElement).find('a').attr('href');
    if (link) {
      titleElement.after(`<a href="${link}">${LINK_TITLE}</a>`);
    }
  });
};

editPage();