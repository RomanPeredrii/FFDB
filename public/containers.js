const log = console.log;

document.querySelectorAll(".editContainerButton").forEach((node) => {
  node.addEventListener("click", async () => {
    const id = node.parentNode.textContent
      .trim()
      .split("\n")
      [node.parentNode.textContent.trim().split("\n").length - 1].trim();
    window.location.href = `/container/${id}/edit?allow=true`;
  });
});

document.querySelectorAll(".deleteContainerButton").forEach((node) => {
  node.addEventListener("click", async () => {
    const id = node.parentNode.textContent
      .trim()
      .split("\n")
      [node.parentNode.textContent.trim().split("\n").length - 1].trim();
    try {
      await fetch(`/container/${id}/delete`, {
        method: "DELETE",
        headers: {
          "CSRF-Token": document.querySelector("#_csrf").value,
        },
      });
      window.location.reload();
    } catch (error) {
      /******interim******/ log("DELETE CONTAINER ERROR:", error);
    }
  });
});

document.querySelectorAll(".title").forEach((node) => {
  node.addEventListener("click", () => {
    const id = node.parentNode.textContent
      .trim()
      .split("\n")
      [node.parentNode.textContent.trim().split("\n").length - 1].trim();
    window.open(`/container/${id}`, "_blank");
  });
});

document
  .querySelector("#add-containers-from-table")
  .addEventListener("change", async (e) => {
    if (!e.target.files.length) {
      return;
    }
    if (
      e.target.files[0].type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      e.target.files[0].type !== "application/vnd.ms-excel"
    ) {
      window.alert("WRONG TYPE");
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const response = await fetch("/containers/add-many", {
        method: "POST",
        body: formData,
        headers: {
          "CSRF-Token": document.querySelector("#_csrf").value,
        },
      });
      window.location.reload();
    } catch (error) {
      /******interim******/ log("UPLOAD ERROR:", error);
    }
  });

document.querySelector("#setPeriodReq")
.addEventListener('click', async (e) => {
if (!document.querySelector("#dateTo").value){
  document.querySelector("#dateTo").value = 
  new Date(Date.now()).toLocaleString().substring(0, 10);
} 
if (document.querySelector("#dateFrom").value) {  
  document.querySelector("#setPeriod")
  .appendChild(document.createElement("button"))
  .setAttribute("id", "sendReq");
  document.querySelector("#sendReq").click();
  document.querySelector("#sendReq").remove();
} else {
  window.alert("SET PERIOD");
}
});

/*************** AFTER **********/

// document
//   .querySelector(".addToActualPlan")
//   .addEventListener("click", async () => {
//     log("click");
//     const data = [];
//     document
//       .querySelectorAll(".planing input:checked")
//       .forEach(async (node) => {
//         log("node", node.value.slice(0, node.value.length - 1));
//         data.push(node.value.slice(0, node.value.length - 1));
//       });
//     log(JSON.stringify(data.toString()));

//     const response = await fetch("/planning", {
//       method: "POST",
//       redirect: "manual",
//       headers: {
//         "CSRF-Token": document.querySelector("#_csrf").value,
//       },
//       body: JSON.stringify(data),
//     });
//   });
