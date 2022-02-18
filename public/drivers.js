const log = console.log;

document.querySelectorAll(".deleteDriverButton").forEach((node) => {
  node.addEventListener("click", async () => {
    try {
      await fetch(
        `/driver/${node.parentNode.textContent
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
      log("DELETE DRIVER ERROR", error);
    }
  });
});

document.querySelectorAll(".editDriverButton").forEach((node) => {
  node.addEventListener("click", async () => {
    try {
      const raw = await fetch(
        `/driver/${node.parentNode.textContent
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
      document.querySelector("#changeDriverData").classList.remove("disabled");
      document.querySelector(".changeDriverData").click();
      document.querySelectorAll("#change-existing input").forEach((node) => {
        body.driver[node.name] ? (node.value = body.driver[node.name]) : null;
      });
    } catch (error) {
      log("EDIT DRIVER ERROR", error);
    }
  });
});