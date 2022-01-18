const log = console.log

const filesExecute = (e, socket) => {
    // handleFileSelect(e);  
    const handleDragOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }  
    // Setup the dnd listeners.  
    const dropZone = document.getElementById('message');
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleFileSelect); 
  
    parseFile = (file, callback) => {
        const fileSize = file.size;
        const chunkSize = 64 * 1024; // bytes
        const offset = 0;
        const self = this; // we need a reference to the current object
        const chunkReaderBlock = null;
  
      
        const readEventHandler = (evt) => {
        if (evt.target.error == null) {
          offset += evt.target.result.length;
          callback(evt.target.result); // callback for handling read chunk
        } else {
          console.log("Read error: " + evt.target.error);
          return;
        }
        if (offset >= fileSize) {
          console.log("Done reading file");
          return;
        }
  
        // of to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
      };
  
  
      chunkReaderBlock = function (_offset, length, _file) {
        const r = new FileReader();
        let blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsText(blob);
      };
  
      // now let's start the read with the first block
      chunkReaderBlock(offset, chunkSize, file);
    }
  
    const handleFileSelect = (e) => {
  
      let files = e.target.files; // FileList object
      // Loop through the FileList and render image files as thumbnails.
      for (let i = 0, f; f = files[i]; i++) {
        //log(files);
        // Only process image files.
        //if (!f.type.match('image.*')) continue;
  
        log(f.size);
        let slice = f.slice(0, f.size);
        const reader = new FileReader();
        const binaryReader = new FileReader();   // for read binary data
        binaryReader.readAsBinaryString(slice);
  
        parseFile(f, (chunk) => {
          log(chunk.length);
        });
  
        binaryReader.onload = (e, f, socket) => {  
          window.socket.emit('uploadFile', e.target.result);
        };
  
        reader.readAsDataURL(f);
        // reader.onload = (function (f) {
        //   return function (e) {
        //     let allMessages = document.querySelector('.allMessages');
        //     allMessages.innerHTML += `<img src=" ${e.target.result}" title=" ${escape(f.name)}"/>`
        //   }
        // })(f, e);
      }
    }
}

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
addFromTable.addEventListener('change', (e) => {
    const socket = io()
    log('MAIN_EVENT', e); 
    log('MAIN_SOCKET', socket)  
    filesExecute(e, socket); 
  
});

