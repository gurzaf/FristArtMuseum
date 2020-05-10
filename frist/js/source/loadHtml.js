const setupHeaderAndFooter = () => {
  $('.MSFootTextDiv').html('');
  $('.MS_LoginButtonOuterWrapperContainer').hide();
  $('.MSFootTextDiv:first').load('html/header.html');
  $('.MSFootTextDiv:last').load('html/footer.html');
};

setupHeaderAndFooter();