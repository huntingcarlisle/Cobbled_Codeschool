$(":checkbox").on("change", function(){
  alert("The checkbox with the ID '" + this.id + "' changed");
});

var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {},
    $checkboxes = $(":checkbox");

$checkboxes.on("change", function(){
  $checkboxes.each(function(){
    checkboxValues[this.id] = this.checked;
  });

  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

// On page load
$.each(checkboxValues, function(key, value) {
  $("#" + key).prop('checked', value);
});
