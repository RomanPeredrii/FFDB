const log = console.log;

// document.addEventListener("DOMContentLoaded", function () {
//   M.Datepicker.init(document.querySelectorAll(".datepicker"), {format: 'dd.mm.yyyy'});
// });

document.querySelectorAll(".deleteVesselButton").forEach((node) => {
  node.addEventListener("click", async () => {
    try {
      await fetch(
        `/vessel/${node.parentNode.textContent
          .trim()
          .split("\n")
          [
            node.parentNode.textContent.trim().split("\n").length - 1
          ].trim()}/delete`,
        {
          method: "DELETE",
          headers: {
            "CSRF-Token": document.querySelector("#_csrf").value,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      log("DELETE VESSEL ERROR", error);
    }
  });
});

document.querySelectorAll(".editVesselButton").forEach((node) => {
  node.addEventListener("click", async () => {
    try {
      const raw = await fetch(
        `/vessel/${node.parentNode.textContent
          .trim()
          .split("\n")
          [
            node.parentNode.textContent.trim().split("\n").length - 1
          ].trim()}/edit?allow=true`,
        {
          method: "POST",
          headers: {
            "CSRF-Token": document.querySelector("#_csrf").value,
          },
        }
      );
      const body = await raw.json();
      document.querySelector("#changeVesselData").classList.remove("disabled");
      document.querySelector(".changeVesselData").click();
      document.querySelectorAll("#change-existing input").forEach((node) => {
        body.vessel[node.name] ? (node.value = body.vessel[node.name]) : null;
      });
    } catch (error) {
      log("EDIT VESSEL ERROR", error);
    }
  });
});