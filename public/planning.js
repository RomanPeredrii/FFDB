const log = console.log;

document
  .querySelector("#daily-planing")
  .addEventListener("click", async () => {
    log("click");
    const data = [];
    document
      .querySelectorAll(".planing input:checked")
      .forEach(async (node) => {
        data.push(node.value.slice(0, node.value.length));
      });
    const response = await fetch("/planning", {
      method: "POST",
      redirect: "manual",
      headers: {
        "CSRF-Token": document.querySelector("#_csrf").value,
      },
      body: JSON.stringify(data),
    });
    const containersPlanning = await response.json();
    // log( 'response', containersPlanning);
    if (document.querySelector('#row')) {    
        document.querySelectorAll('#row')
        .forEach(node => document.querySelector('#makePlan')
        .removeChild(node));
    }

    const row = document.querySelector('#makePlan');
    containersPlanning.forEach(record => {
    const tr = document.createElement('tr');
    tr.setAttribute("id", "row");
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
    <td class="comments">${record.comments}</td>
    <td class="driver" title="add driver">
    <input type="text" id="autocomplete-input" class="autocomplete" name="driver"/>
    </td>
    `;
    });  



    let event = new Event("tabel-done", {"bubbles":true, "cancelable":false});
    document.dispatchEvent(event);






//     document.querySelectorAll('.autocomplete').forEach(function(elems) {    
//     document.addEventListener('load', function () {      
//       
//       var instances = M.Autocomplete.init(document.querySelectorAll('.autocomplete'),
//         {data: {
//         "Apple": null,
//         "Microsoft": null,
//         "Google": null}});
//     });
//  })
});

    document.addEventListener("tabel-done", function() {
      var elems = document.querySelectorAll('.autocomplete');
      log('ELEMS', elems);

      elems.forEach(function(elem) {
              var instances = M.Autocomplete.init(elem, {data: {
                "Apple": null,
                "Microsoft": null,
                "Google": null}});
      })

    });  



