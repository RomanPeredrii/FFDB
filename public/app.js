M.Tabs.init(document.querySelectorAll(".tabs"));

document.addEventListener("DOMContentLoaded", function () {
  M.Datepicker.init(document.querySelectorAll(".datepicker"), {format: 'dd.mm.yyyy'});
  M.FormSelect.init(document.querySelectorAll('select'));
});

