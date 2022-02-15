document.querySelectorAll('.deleteUserButton')
.forEach(node => {    
    node.addEventListener("click", async () => {
      const id = node.parentNode.textContent.trim().split("\n")[node.parentNode.textContent.trim().split("\n").length - 1].trim()
      await fetch(`/admin/${id}/delete`, {
        method: 'DELETE', 
        }) 
      window.location.reload();
    })
})    