const setupHeaderAndFooter = () => {
  $('.MSFootTextDiv').html('');
  $('.MS_LoginButtonOuterWrapperContainer').hide();
  $('.MSFootTextDiv:first').load('header.html');
  $('.MSFootTextDiv:last').load('footer.html');
};

setupHeaderAndFooter();