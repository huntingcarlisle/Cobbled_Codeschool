$('input[type="checkbox"]').change(function(e) {

  var checked = $(this).prop("checked"),
      container = $(this).parent(),
      siblings = container.siblings();

  container.find('input[type="checkbox"]').prop({
    indeterminate: false,
    checked: checked
  });

  function checkSiblings(el) {

    var parent = el.parent().parent(),
        all = true;

    el.siblings().each(function() {
      return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
    });

    if (all && checked) {

      parent.children('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });

      checkSiblings(parent);

    } else if (all && !checked) {

      parent.children('input[type="checkbox"]').prop("checked", checked);
      parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
      checkSiblings(parent);

    } else {

      el.parents("li").children('input[type="checkbox"]').prop({
        indeterminate: true,
        checked: false
      });

    }

  }

  checkSiblings(container);
});


function App() { }

App.prototype.setState = function(key, state) {
  localStorage.setItem(key, state);
}

App.prototype.getState = function(key) {
  return localStorage.getItem(key);
}

function init() {
  var app = new App();

  // Get all checkboxes that we want to check
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Loop through all checkboxes
  for (var i = 0; i < checkboxes.length; i++) {

    // The current checkbox in the loop
    var checkbox = checkboxes[i];

    // Determine if the checkbox is saved in LocalStorage
    var isSaved = app.getState(checkbox.id);

    // Set the selected state
    if (isSaved === 'true') {
      checkbox.checked = true;
    }

    // Create an event listener for each checkbox
    checkbox.addEventListener('click', function(e) {
      // We save the checkbox id as the key in localStorage
      // We save the checkbox checked state as the value
      var _checkbox = e.target;
      app.setState(_checkbox.id, _checkbox.checked)
    });
  }
}

init();
