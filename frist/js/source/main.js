(() => {
  const init = () => {
    const cdn = 'https://dev.juliangalvez.xyz/frist';
    $('.MSFootTextDiv').html('');
    $('.MS_LoginButtonOuterWrapperContainer').hide();
    $('.MSFootTextDiv:first').load(`${cdn}/html/header.html`, () => {
      $('.MSFootTextDiv:last').load(`${cdn}/html/footer.html`);
    });
  };
  init();
})();
