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
    const containersPlanning = await response.json();
    log( 'response', containersPlanning);
    if (document.querySelector('#row')) {    
        document.querySelectorAll('#row')
        .forEach(node => document.querySelector('#makePlan')
        .removeChild(node));
    };
log(document.querySelector('#makePlan'))
    const row = document.querySelector('#makePlan');
    containersPlanning.forEach(record => {
    const tr = document.createElement('tr')
    tr.setAttribute("id", "row");
       log(tr)
    row.appendChild(tr)
    
    .innerHTML=`<td class="number">${record.number}</td>
    <td class="size">${record.size}</td>
    <td class="status">${record.status}</td>
    <td class="client">${record.client}</td>
    <td class="POD">${record.POD}</td>
    <td class="FD">${record.FD}</td>
    <td class="BL">${record.BL}</td>
    <td class="line">${record.line}</td>
    <td class="vessel">${record.vessel}</td>          
    <td class="driver">${record.driver}</td>
    <td class="weight">${record.weight}</td>
    <td class="cargo">${record.cargo}</td>
    <td class="comments">${record.comments}</td>`

    })    
});


