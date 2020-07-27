(() => {
  const init = () => {
    const cdn = 'https://gitcdn.link/repo/gurzaf/FristArtMuseum/master/frist';
    $('.MSFootTextDiv').html('');
    $('.MS_LoginButtonOuterWrapperContainer').hide();
    $('.MSFootTextDiv:first').load(`${cdn}/html/header.html`, () => {
      $('.MSFootTextDiv:last').load(`${cdn}/html/footer.html`);
    });
  };
  init();
})();
