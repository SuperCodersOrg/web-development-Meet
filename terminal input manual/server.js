const { writeFile } = require("fs");
const fs   = require("fs/promises");


const arguements = process.argv.slice(2);

const filename = arguements[1];

const data = arguements[2];

const command  = arguements[0];
console.log(filename);

async function appendData() {
    try {

        
        await fs.appendFile(arguements[1], data);
        console.log('Content appended successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}
async function readData() {
    try {

        
 let content  =        await fs.readFile(arguements[1], "utf8");
        console.log(content);
    } catch (error) {
        console.error('Error:', error);
    }
}
async function removeData() {
    try {

        await fs.unlink(arguements[1]);
        console.log('File deleted successfully!');
    } catch (error) {
  
            console.error('error ', error);
        
    }
}
async function getDirectory() {
    try {
        // Read the directory contents
        const files = await fs.readdir(arguements[3]);
        
        console.log(`Contents of ${dirPath}:`, files);
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}
if(command == 1){
appendData();
}
if(command == 2){
readData();
}
if(command == 3){
removeData();
}
if(command == 4){
getDirectory();
}
