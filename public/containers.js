const log = console.log;

function getId (n) {
  return n.parentNode.textContent
      .trim()
      .split("\n")
      [n.parentNode.textContent.trim().split("\n").length - 1].trim();
};

document.querySelectorAll(".edit").forEach((node) => {
  node.addEventListener("click", async () => {
    window.location.href = `/container/${getId(node)}/edit?allow=true`;
  });
});


document.querySelectorAll(".copy").forEach((node) => {
  node.addEventListener("click", async () => {
    window.location.href = `/container/${getId(node)}/edit?allow=true`;
  });
});

document.querySelectorAll(".delete").forEach((node) => {
node.addEventListener("click", async () => {
  try {
  await fetch(`/container/${getId(node)}/delete`, {
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
    window.open(`/container/${getId(node)}`, "_blank");
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
      await fetch("/containers/add-many", {
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


