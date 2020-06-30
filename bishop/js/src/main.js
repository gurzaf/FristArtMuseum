(() => {
  const fixLayout = () => {
    $('.MSFootTextDiv:first').load('html/header.html', () => {
      $('.MSFootTextDiv:last').load('html/footer.html');
    });
  };
  fixLayout();
})();
