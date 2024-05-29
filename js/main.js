var siteNameItem = document.getElementById("sitename");
var siteUrlItem  = document.getElementById("siteurl");
var searchItem = document.getElementById("searchElement");
var addBtn = document.getElementById("SubmitItem");
var updateBtn = document.getElementById("update");
var updateIndex;
var siteArray=[];
if (localStorage.getItem('site')!==null) {
         siteArray =JSON.parse(localStorage.getItem('site'));
     displayItem();
 }
function submitItem() {
    var siteName = siteNameItem.value.trim();
    var siteUrl = siteUrlItem.value.trim();
    
    if (siteName === '' || siteUrl === '') {
        alert(`Site Name or Url is not valid, Please follow the rules below :

        Site name must contain at least 3 characters
        Site URL must be a valid one`);
        return; 
    }
    var sites ={
        siteName :siteNameItem.value,
        sitUrl : siteUrlItem.value
    }
    siteArray.push(sites);
  
    clearItem();
    displayItem();
    localStorage.setItem('site',JSON.stringify(siteArray));
}
function clearItem() {
    siteNameItem.value = null;
    siteUrlItem.value  = null;
}
function displayItem() {
    var table = ``
    
    for (var i = 0; i < siteArray.length; i++) {

       table+=`
                        <tr>
                        <td>${i+1}</td>
                        <td>${siteArray[i].siteName}</td>
                      
                        <td><a href="${siteArray[i].sitUrl}" target="_blank" class="btn visit text-light w-fa-500px"><i class="fa fa-eye p-2"></i>Visit</a></td>

                      
                        <td><button onclick="deleteItem(${i})" class="btn delete  w-fa-500px text-white"><i class="fa fa-trash-can p-2"></i>Delete</button></td>
                        <td><button onclick="updateItem(${i})" class="btn update  w-fa-500px text-white"><i class="fa fa-pen p-2"></i>Update</button></td>

                        </tr>

                  
                    `

                   
    }
    document.getElementById('demo').innerHTML=table 
    
}
function deleteItem(index) {
    siteArray.splice(index,1)
    displayItem()
    localStorage.setItem('site',JSON.stringify(siteArray))
   
}

function srechItem() {
   var term = searchItem.value;
    var table=``;
    for (var i = 0; i < siteArray.length; i++) {
        if (siteArray[i].siteName.toLowerCase().includes(term.toLowerCase())==true) 
        {
            table+=`
            <tr>
            <td>${i+1}</td>
            <td>${siteArray[i].siteName}</td>
          
            <td><a href="${siteArray[i].sitUrl}" target="_blank" class="btn visit text-light w-fa-500px"><i class="fa fa-eye p-2"></i>Visit</a></td>

            <td><button onclick="deleteItem(${i})" class="btn delete pe-2  w-fa-500px">  <i class="fa-solid fa-trash-can"></i> Delete</button></td>
            <td><button onclick="updateItem(${i})" class="btn update w-fa-500px"><i class="fa-solid fa-pen"></i>Update</button></td>
        </tr>
      
        `
        }
        
    }
   document.getElementById('demo').innerHTML=table;
}
function updateItem(i) {
    updateIndex = i
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    siteNameItem.value = siteArray[i].siteName;
    siteUrlItem.value  = siteArray[i].sitUrl;
}
function updateForm() {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    siteArray[updateIndex].siteName = siteNameItem.value;
    siteArray[updateIndex].sitUrl   = siteUrlItem.value;
    displayItem() ;
    localStorage.setItem('site',JSON.stringify(siteArray));
    clearItem();
}
function validateItem(element) {
   var regex = {
    sitename :/[a-z]{3,}/,
    siteurl  :/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*/
}
if (regex[element.id].test(element.value) == true) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element.nextElementSibling.classList.replace('d-block','d-none')
}else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.classList.replace('d-none','d-block')
}
}
