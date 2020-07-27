(() => {
  const init = () => {
    const cdn = 'https://dev.juliangalvez.xyz/frist';
    // const cdn = '.';
    $('link[rel=stylesheet][href*="Webforms-User-Stylesheet.css"]').remove();
    $('.MSFootTextDiv').html('');
    $('.MS_LoginButtonOuterWrapperContainer').hide();
    $('.MSFootTextDiv:first').load(`${cdn}/html/header.html`, () => {
      $('.MSFootTextDiv:last').load(`${cdn}/html/footer.html`);
    });
  };
  init();
})();
