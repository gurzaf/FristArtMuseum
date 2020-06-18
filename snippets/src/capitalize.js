(() => {
  // Function doAction optional (to fix an issue with other scripts manipulating DOM)
  // const doAction = () => {
    $('input[id*="txtFirstName"],input[id*="txtLastName"]').each((index, item) => {
      const input = $(item);
      input.keyup(() => {
        const parts = input.val().split(' ')
          .map((val) => `${val.substr(0, 1).toUpperCase()}${val.substr(1).toLowerCase()}`);
        input.val(parts.join(' '));
      });
    });
  // };
  // Calling doAction after 3s (waiting until other scripts finish to manipulate DOM)
  // setTimeout(doAction, 3000);
})();
