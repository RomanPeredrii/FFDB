const log = console.log

document.querySelectorAll('.editContainerButton').
forEach(node => {    
    node.addEventListener("click", async () => {
      const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
      window.location.href=`/container/${id}/edit?allow=true`
        
    })    
})

document.querySelectorAll('.deleteContainerButton')
.forEach(node => {    
    node.addEventListener("click", async () => {
      const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
      await fetch(`/container/${id}/delete`, {
        method: 'DELETE', 
        }) 
      window.location.reload();
    })
})    

document.querySelectorAll('.title')
.forEach(node => {        
    node.addEventListener("click", () => {
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        window.open(`/container/${id}`, '_blank')
        
    })    
})

document.querySelector('#add-containers-from-table')
.addEventListener('change', async (e) => {
log(e)
  if (!e.target.files.length) { return }
  if ((e.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (e.target.files[0].type !== "application/vnd.ms-excel")) { 
log('WRONG TYPE')
    window.alert('WRONG TYPE')
    return } 
log(e.target.files)
  
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
    /******interim******/log('UPLOAD ERROR:'); log(error)
  } 
})

/*************** AFTER **********/

document.querySelector('.addToActualPlan').addEventListener('click', async () => {
log('click')
  const data = [] 
  document.querySelectorAll('.planing input:checked').forEach(async (node) => {
log('node', node.value.slice(0,node.value.length-1))
      data.push(node.value.slice(0,node.value.length-1))
  })
log(JSON.stringify(data.toString()))

  const response = await fetch('/planning', {
    method: 'POST', 
    redirect: 'manual',
    body: JSON.stringify(data)
  })    
})