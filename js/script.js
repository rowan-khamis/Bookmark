var siteName = document.getElementById('sName');
var siteURL = document.getElementById('url');
var warMessage = document.getElementById('message');
var btn= document.getElementById('btnAdd');
var currentIndex='';
var closeBtn = document.getElementById('closeBtn');
var markList=[]  
if(localStorage.getItem('mark') ==null){
 var markList=[]   
}
else{
    var markList=[] = JSON.parse(localStorage.getItem('mark'));
    display();    
}

btn.onclick=function(){
    if(ValidationName()==true && validateURL()==true){
        createBookmark();
        display();
        localStorage.setItem('mark',JSON.stringify(markList));
        reset();
        }
        else{
            warMessage.classList.remove("d-none");
        } 
}
closeBtn.addEventListener('click',closeMessage); 
function closeMessage(){
    warMessage.classList.add("d-none");
}
function createBookmark(){
    var mark={
        sName:siteName.value,
        sUrl:siteURL.value,
        
    }
    markList.push(mark);
        console.log(markList);
        console.log(mark);
display();
localStorage.setItem('mark',JSON.stringify(markList));
reset();
}

function display(){
    var trs=``;
    for(var i = 0 ; i< markList.length ; i++){
        trs +=`
        <tr class="text-center">
                <td >${i+1}</td>
                <td>${markList[i].sName}</td>               
                <td><a href="${markList[i].sUrl}" target="_blank" class="btn visite><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                <td><button class="btn btn-danger " onclick='del(${i})'><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `

    }
    document.getElementById('tableBody').innerHTML=trs;
}


function reset(){
    siteName.value='';
    siteURL.value='';
}


// splice(index,count)
function del(index){
markList.splice(index,1);
localStorage.setItem('mark',JSON.stringify(markList));
display();
}

// keyup
// keydown
var search = document.getElementById('Search');
function searchmark(){
var trs=``;
for(var i =0 ; i<markList.length ;i++){
    if(markList[i].sName.includes(search.value))
    trs += `
    <tr class="text-center">
                <td >${i+1}</td>
                <td>${markList[i].sName}</td>               
                <td><a href="${markList[i].sUrl}" target="_blank" class="btn visite"'><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                <td><button class="btn btn-danger " onclick='del(${i})'><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
    `
}
document.getElementById('tableBody').innerHTML=trs;
}

// ///////// Validation ////////////////////

function ValidationName(){
    var nameRegex = /^[a-zA-Z]{3,}$/;
    var markName = siteName.value;
    if (nameRegex.test(markName)) {
        siteName.classList.add("valid");
        siteName.classList.remove("invalid");
      } else {
        siteName.classList.add("invalid");
        siteName.classList.remove("valid");
      }
      return nameRegex.test(markName);
}


function validateURL() {
    var urlRegex = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    var markUrl = siteURL.value;
    if (urlRegex.test(markUrl)) {
      siteURL.classList.add("valid");
      siteURL.classList.remove("invalid");
    } else {
      siteURL.classList.add("invalid");
      siteURL.classList.remove("valid");
    }
    return urlRegex.test(markUrl);
  }
siteURL.addEventListener('keyup',validateURL);
siteName.addEventListener('keyup',ValidationName);
