// get all data in form and return object
function getFormData(form) {
  var elements = form.elements;
  var honeypot;

  var fields = Object.keys(elements).filter(function(k) {
    if (elements[k].name === "honeypot") {
      honeypot = elements[k].value;
      return false;
    }
    return true;
  }).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });

  var formData = {};
  fields.forEach(function(name){
    var element = elements[name];
    
    // singular form elements just have one value
    formData[name] = element.value;

    // when our element has multiple items, get their values
    if (element.length) {
      var data = [];
      for (var i = 0; i < element.length; i++) {
        var item = element.item(i);
        if (item.checked || item.selected) {
          data.push(item.value);
        }
      }
      formData[name] = data.join(', ');
    }
  });

  //add reading progress data
  formData.progress = window.location.hash
  formData.url = window.location.href

  fields = fields.concat(['progress', 'url'])

  // add form-specific values into the data
  formData.formDataNameOrder = JSON.stringify(fields);
  formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
  formData.formGoogleSend
    = form.dataset.email || ""; // no email by default

  return {data: formData, honeypot: honeypot};
}

function disableAllButtons(form) {
  var buttons = form.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

const handleFormSubmit = form => {
  var formData = getFormData(form)
  const $message = document.querySelector('#submit-message')
  var data = formData.data;

  // If a honeypot field is filled, assume it was done so by a spam bot.
  if (formData.honeypot) {
    $message.innerHTML = 'Spam Detected!'
    return false;
  }
  $message.innerHTML = 'Sending...'

  disableAllButtons(form)
  var url = form.action
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  // xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset()
        $message.innerHTML = 'Your email has been received!'
      }
  };
  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded)
}


export default handleFormSubmit