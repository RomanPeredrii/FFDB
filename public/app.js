M.Tabs.init(document.querySelectorAll(".tabs"));

document.addEventListener("DOMContentLoaded", function () {
  M.Datepicker.init(document.querySelectorAll(".datepicker"), {format: 'dd.mm.yyyy'});
});

document.addEventListener('DOMContentLoaded', function() {
 document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
});

document.addEventListener('DOMContentLoaded', function() {
M.FormSelect.init(document.querySelectorAll('select'));
});