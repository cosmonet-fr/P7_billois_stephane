const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let formData = new FormData(form);

  const contactData = {
    "name": null
  };

  formData.forEach((value, key) => {formData[key] = value});
  localStorage.setItem('contact', JSON.stringify(formData));
  window.location.href='confirm.html';

});
