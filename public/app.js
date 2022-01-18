const log = console.log

// const a = document.createElement('a')

const containerEditInformation = document.querySelectorAll('.editButton').forEach(node => {    
    node.addEventListener("click", async () => {
        // log(node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim())
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        // log('CONTAINER ID FOR EDIT', id)
        window.location.href=`/container/${id}/edit?allow=true`
        
    })    
})

const containerDeleteiformation = document.querySelectorAll('.deleteButton').forEach(node => {    
    node.addEventListener("click", async () => {
        // log(node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim())
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        log('CONTAINER ID FOR DELETE', id)
        const fetchData = {
        method: 'DELETE', 
        // body: JSON.stringify(id)
        }

      log(fetchData.body)
      await fetch(`/container/${id}/delete`, fetchData) 

        // window.location.href=`/container/${id}/delete`
        
    })
})    

const containerSortInformation = document.querySelectorAll('.titleTr').forEach(node => {        
    node.addEventListener("click", () => {
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        log(id)
        window.open(`/container/${id}`, '_blank')
        
    })    
})

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


