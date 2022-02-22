const log = console.log;

document
  .querySelector("#daily-planing")
  .addEventListener("click", async () => {
    log("click");
    const data = [];
    document
      .querySelectorAll(".planing input:checked")
      .forEach(async (node) => {
        // log("node", node.value.slice(0, node.value.length - 1));
        data.push(node.value.slice(0, node.value.length));
      });
log(data)

    const response = await fetch("/planning", {
      method: "POST",
      redirect: "manual",
      headers: {
        "CSRF-Token": document.querySelector("#_csrf").value,
      },
      body: JSON.stringify(data),
    });

    log(JSON.stringify(response))
  });


