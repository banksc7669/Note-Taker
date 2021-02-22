// Importing File System and Utilities module 
const fs = require('fs') 
const util = require('util') 
  
// Convert callback based methods to 
// promise based methods 
const readFileContent = util.promisify(fs.readFile) 
  
const fetchFile = async (path) => { 
    
  // The readFileContent() method reads the file 
  // and returns buffer form of the data  
  const buff = await readFileContent(path) 
    
  const contents = buff.toString() 
  console.log(`\nContents of the file :\n${contents}`) 
} 
   
fetchFile('./testFile.txt') 
  
// If promise get rejected 
.catch(err => { 
   console.log(`Error Occurs, Error code -> ${err.code},  
   Error NO -> ${err.errno}`); 
}); 