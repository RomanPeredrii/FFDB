const log = console.log;

const eFetch = async (path, method, token, body = undefined) => {
  const response = await fetch(path, {
    method: method,
    redirect: 'manual',
    headers: {
      'CSRF-Token': token,
      },
      body: JSON.stringify(body),
    });
  return response.json();
};

const getReadyDrivers = async () => {
  return eFetch('/drivers/get-ready-drivers-list', 'POST', document.querySelector('#_csrf').value);
};

const makeReadyDriversList = (readyDriversArray) => {
  const readyDriverList = new Object();
  readyDriversArray.map((driver) => {
    readyDriverList[driver.lastName.concat(' ', driver.firstName)] = null;
  });
  return readyDriverList;
};

const getParrentNode = function (node, level = 0) {
  if (level <= 0) {  
    return node;
  } else {
      const parrent = getParrentNode(node, level - 1).parentNode;    
      return parrent;
  }
};   

const setReadyDrivers = document.querySelector('#set-ready-driver')
const readyDrivers = document.querySelector('#ready-drivers')
setReadyDrivers.addEventListener('click', async () => {
  const drivers = await eFetch('/drivers', 'POST', document.querySelector('#_csrf').value, {});
  if (readyDrivers.querySelector('#row')) {
    readyDrivers.querySelectorAll('#row')
      .forEach(node => readyDrivers.querySelector('#redyDrivers')
      .removeChild(node));
  };

  const row = document.querySelector('#redyDrivers');  
  drivers.forEach((driver) => {
    if (driver.ready) {
      ready = 'checked';
    } else {
      ready = '';
    };
    const tr = document.createElement('tr');
    tr.setAttribute('id', 'row');
    row.appendChild(tr)    
    .innerHTML=`
    <td class="readiness" title="ready?">
    <label>
        <input type="checkbox" id="readiness" ${ready} name="readiness" value='${driver._id}' />
      <span></span>
    </label>
    </td>
    <td class="firstName" title="firstName">${driver.firstName}</td>
    <td class="lastName" title="lastName">${driver.lastName}</td>
    <td class="vehicle" title="vehicle">${driver.vehicle}</td>
    <td class="trailer" title="trailer">${driver.trailer}</td>
    <td class="carrier" title="carrier">${driver.carrier}</td>
    <td class="phone" title="phone">${driver.phone}</td>
    <td class="comments" title="comments"${driver.comments}</td>
    <td class="container_id" hidden>${driver._id}</td>
    `;
    });  

  readyDrivers.querySelectorAll('#readiness')
  .forEach(function (node) {
    node.addEventListener('click', async () => {
      try {
        await eFetch('/driver/set-readiness', 'POST',
          document.querySelector('#_csrf').value,
          { _id: node.value, ready: node.checked });
      } catch (error) {
        log("EDIT DRIVER ERROR", error);
      };
    });
  });
});








const dailyPlaning = document.querySelector("#daily-planing");
const readyContainers = document.querySelector('#containers-for-planning')
const planning = document.querySelector('#planning');
dailyPlaning.addEventListener('click', async () => {
    const data = [];
    readyContainers.querySelectorAll('.planing input:checked')
      .forEach((node) => {
        data.push(node.value.slice(0, node.value.length));
      });
    const containersPlanning = await eFetch('/planning', 'POST', document.querySelector('#_csrf').value, data); 
    if (planning.querySelector('#row')) {
      planning.querySelectorAll('#row')
        .forEach(node => planning.querySelector('#makePlan')
        .removeChild(node));
    };
    const row = planning.querySelector('#makePlan');  
    containersPlanning.forEach(rec => {
      
  //*********************************************************** */ necessary to add default values into schemas!!!!!!!!!!!!!!
      record = Object.assign({
        number: '',
        size: '',
        status: '',
        client: '',
        POD: '',
        FD: '',
        BL: '',
        line: '',
        vessel: '',
        driver: '',
        weight: '',
        cargo: '',
        comments: ''
      }, rec);
  //*********************************************************** */ necessary to add default values into schemas!!!!!!!!!!!!!!

    const tr = document.createElement('tr');
    tr.setAttribute('id', 'row');
    row.appendChild(tr)    
    .innerHTML=`
    <td class="number" title="number">${record.number}</td>
    <td class="size" title="size">${record.size}</td>
    <td class="status" title="status">${record.status}</td>
    <td class="client" title="client">${record.client}</td>
    <td class="POD" title="port">${record.POD}</td>
    <td class="FD" title="final  destination">${record.FD}</td>
    <td class="line" title="containers line">${record.line}</td>
    <td class="vessel" title="arive date & vessel">${record.vessel}</td>          
    <td class="weight" title="cargo weight">${record.weight}</td>
    <td class="cargo" title="cargo">${record.cargo}</td>
    <td class="comments" title="comments">${record.comments}</td>
    <td class="container_id" hidden>${record._id}</td>
    <td class="driver_id" hidden></td>
    <td title="driver">
      <div class="input-field col s12 autocomplete-input">
        <input type="text" id="autocomplete-input" autocomplete="off" class="autocomplete driver">
      </div>
    </td>
    `;
    });  

    

    planning.querySelectorAll('#autocomplete-input').forEach((node) => {
    node.addEventListener('click', async () => { 
      const instance = M.Autocomplete.getInstance(node);
      instance.updateData(makeReadyDriversList(await getReadyDrivers()));
      instance.open();   

      document.querySelectorAll('.dropdown-content li').forEach((node) => {
        node.addEventListener('click', async (e) => {
          const names = e.target.innerText;
          const driver_id = getParrentNode(e.target, 5).querySelector('.driver_id');
          const driver = await eFetch('/driver/off-readiness', 'POST', document.querySelector('#_csrf').value, {names});
          driver_id.innerText = driver._id  
        });
      });      
    });    
  });

  const elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {
    minLength: 0, 
    data: makeReadyDriversList(await getReadyDrivers())
  });

  planning.querySelector('.make-plan').addEventListener('click', async() => {
    const plan = Array();
     planning.querySelectorAll('#row').forEach(  (tr) => {
        let transportation = new Array();
        transportation = [
          tr.querySelector('.container_id').textContent, 
          tr.querySelector('.driver_id').textContent];      
          plan.push(transportation);
        })

        const driver = await eFetch('/planning/make-plan', 'POST', document.querySelector('#_csrf').value, {plan});





      
    



     });
    

 



});






