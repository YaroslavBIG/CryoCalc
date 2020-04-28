const subm = (ev) => {
    ev.preventDefault()
    const form = document.forms.calc;
    console.log(form.elements.sex.value)

  };

  const buttonSubmit = document.querySelector('#calculate');

  buttonSubmit.addEventListener('click', event => subm(event))