const log = console.log


document.querySelectorAll('.deleteUserButton')
.forEach(node => {    
    node.addEventListener("click", async () => {
        const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
        try {
            await fetch(`/admin/${id}/delete`, {
            method: 'DELETE', 
            }) 
            window.location.reload()
        } catch (error) {
            log('DELETE USER ERROR', error)
        }
    })
}) 

document.querySelectorAll('.editUserButton').
forEach(node => {
    node.addEventListener("click", async () => {      
        try {
        const raw = await fetch(`/admin/${node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()}/edit?allow=true`, {method: 'POST'})
        const body = await raw.json()
        log('USER', body.user)
        document.querySelector('#changeUserData').classList.remove('disabled')  
        document.querySelector('.changeUserData').click()
        document.querySelectorAll('#change-existing input')
        .forEach(node => {body.user[node.name] ? node.value = body.user[node.name]: 0
        log(node.value)})
        

        } catch (error) {
        log('EDIT USER ERROR', error)      
        }
    })    
})