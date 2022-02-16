const log = console.log


document.querySelectorAll('.deleteUserButton')
.forEach(node => {    
    node.addEventListener("click", async () => {
        try {
            await fetch(`/admin/${node.parentNode.textContent.trim()
                .split("\n")[node.parentNode.textContent.trim().split("\n")
                .length - 1].trim()}/delete`, 
                {method: 'DELETE', 
                headers: {
                  'CSRF-Token': document.querySelector('#_csrf').value 
                }}) 
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
            const raw = await fetch(`/admin/${node.parentNode.textContent.trim()
                .split("\n")[node.parentNode.textContent.trim().split("\n")
                .length - 1].trim()}/edit?allow=true`, 
                {method: 'POST', 
                headers: {
                    'CSRF-Token': document.querySelector('#_csrf').value 
                  }
                })
            const body = await raw.json()
            document.querySelector('#changeUserData').classList.remove('disabled')  
            document.querySelector('.changeUserData').click()
            document.querySelectorAll('#change-existing input')
            .forEach(node => {body.user[node.name] ? node.value = body.user[node.name]: 0})
        } catch (error) {
            log('EDIT USER ERROR', error)      
        }
    })    
})