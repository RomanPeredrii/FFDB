// const { stringify } = require("uuid")

const log = console.log



document.querySelectorAll('.editButton').forEach(node => {    
    node.addEventListener("click", async () => {
      const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
      window.location.href=`/container/${id}/edit?allow=true`
        
    })    
})

document.querySelectorAll('.deleteButton').forEach(node => {    
    node.addEventListener("click", async () => {
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        log('CONTAINER ID FOR DELETE', id)
        const fetchData = {
        method: 'DELETE', 
        }
      await fetch(`/container/${id}/delete`, fetchData) 
    })
})    

document.querySelectorAll('.titleTr').forEach(node => {        
    node.addEventListener("click", () => {
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        log(id)
        window.open(`/container/${id}`, '_blank')
        
    })    
})

/*************** AFTER **********/


// const addToActualPlan = document.querySelector('.addToActualPlan').addEventListener('click', async () => {
//     log('click')
//     const data = [] 
//     document.querySelectorAll('.planing input:checked').forEach(async (node) => {
//         log('node', node.value.slice(0,node.value.length-1))
//         data.push(node.value.slice(0,node.value.length-1))

//     })
//     log(JSON.stringify(data.toString()))
//     const dataForFetch = {
//         method: 'POST', 
//         body: JSON.stringify(data)
//       }

//       log(dataForFetch.body)
//     await fetch('/makePlan', dataForFetch) 
// })

const addFromTable = document.querySelector('#add-containers-from-table')
.addEventListener('change', async (e) => {
  if (!e.target.files.length) { return }
  if (e.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { 
    log('WRONG TYPE')
    window.alert('WRONG TYPE')
    return } 
  
  const formData = new FormData();
  formData.append('file', e.target.files[0]);

  try {
    const response = await fetch('/containers/add-many', {
      method: 'POST',
      body: formData,
      });
    const result = await response.json()
    /******interim******/log('SUCCESS:', JSON.stringify(result))
  } catch (error) {
    /******interim******/log('UPLOAD ERROR:'); window.alert(error)
  } 
});

