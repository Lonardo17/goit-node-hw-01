const fs = require ('fs');
const FsPromises = fs.promises
const path = require('path');

  const contactsPath = path.resolve('./db/contacts.json');

  async function readListContacts(){
    const list = await FsPromises.readFile(contactsPath,"utf-8")
    return JSON.parse(list);
  }

  async function changeListContacts(list){
    return await FsPromises.writeFile(contactsPath,JSON.stringify(list),"utf-8")
  }

async function listContacts() {
    try{
        const list = await readListContacts();
        console.log(list)
    }
    catch{
        console.error(error.message);
    }
  }
  
  async function getContactById(contactId) {
    try{
        const list = await readListContacts();
        const result = list.find(r => r.id == contactId)
        console.log(result)
    }
    catch{
        console.error(error.message);
    }
  }
  
  async function removeContact(contactId) {
    try{
        const list = await readListContacts();
        const i = list.findIndex(r => r.id == contactId);
        const remove = list.splice(i,1);
        await changeListContacts(list); 
        console.log(list)
  }
  catch{
    console.error(error.message);
}
}
  
  async function addContact(name, email, phone) {
    try{
        const list = await readListContacts();
        const id = list.reduce((acc,num)=> acc>Number(num.id)?acc:acc=Number(num.id),0)
        const newArray = {id: `${id+1}`,name,email,phone};
       await changeListContacts([...list, newArray]); 
       const result = await readListContacts();
        console.log(result)
    }
    catch{
        console.error(error);
    }
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }