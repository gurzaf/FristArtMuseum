(() => {

  const addMessage = (m) => {
    const html = `
      <div class="alert alert-danger alert-dismissible show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        ${m}
      </div>
    `;
    $('[id*="ctl00_labelEventAvailability"]').html('');
    $('[id*="ctl00_labelEventAvailability"]').append(html);
  };

  const title = $('span[id*="_ctl00_labelEventName"]').text();
  if (title.indexOf('Online Group Sales') !== -1) {
    const inputs = $('#divPriceList input[type="text"]');
    const button = $('input[id*="_ctl00_buttonAddEventToCart"]');
    $(button).on('click', (e) => {
      let adults = parseInt($(inputs[0]).val(), 10);
      adults = isNaN(adults) ? 0 : adults;
      let children = parseInt($(inputs[1]).val(), 10);
      children = isNaN(children) ? 0 : children;
      let childrenUnder = parseInt($(inputs[2]).val(), 10);
      childrenUnder = isNaN(childrenUnder) ? 0 : childrenUnder;
      if (adults < 11) {
        addMessage('Minimum of 11 tickets is required for Online Group Sales.');
        e.preventDefault();
      } else if ((adults + children + childrenUnder) > 30) {
        addMessage('No more than 30 tickets are available for purchase in an Online Group Sale.');
        e.preventDefault();
      }
    }); 
  }
})();