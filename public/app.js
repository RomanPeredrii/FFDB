const log = console.log

// const a = document.createElement('a')

const containerEditInformation = document.querySelectorAll('.editButton').forEach(node => {    
    node.addEventListener("click", async () => {
        // log('Parent', node.parentNode.textContent.trim().split("\n")[0])
        const number = node.parentNode.textContent.trim().split("\n")[0]
        log('NUMBER FOR EDIT', number)
        window.location.href=`/container/${number}/edit?allow=true`
        
    })
    
})

const containerSortInformation = document.querySelectorAll('.titleTr').forEach(node => {        
    node.addEventListener("click", () => {
        const number = node.textContent.trim().split("\n")[0]
        log(number)
        window.open(`/container/${number}`, '_blank')
        
    })    
})

const addToActualPlan = document.querySelector('.addToActualPlan').addEventListener('click', async () => {
    log('click')
    const data = [] 
    document.querySelectorAll('.planing input:checked').forEach(async (node) => {
        log('node', node.value.slice(0,node.value.length-1))
        data.push(node.value.slice(0,node.value.length-1))

    })
    log(JSON.stringify(data.toString()))
    const dataForFetch = {
        method: 'POST', 
        body: JSON.stringify(data)
      }

      log(dataForFetch.body)
    await fetch('/makePlan', dataForFetch) 
})


