//Getting all the required elements
var inputValue = document.querySelector('.inputField input');
var addBtn = document.querySelector('.inputField button');
var clrAllBtn = document.querySelector('.footer-div button');
var todoList = document.querySelector('.todoList');

inputValue.onkeyup = ()=>{
    let userData = inputValue.value; //getting user value
    if(userData.trim() !==0){   //if user values are not only spaces
        addBtn.classList.add("active");//active the add button
    }
    
    if(userData.trim() ==0){   //if user values are only spaces
        addBtn.classList.remove("active");//unactive the add button
    }
    
}

showTasks(); //showTask function calling

//if user clicks on add button
addBtn.onclick = ()=>{
    let userData = document.querySelector('.inputField input').value; //getting user entered value
    let getLocalStorage = localStorage.getItem("Todo");// getting local storage
    if(getLocalStorage == null){ //if localstorage is null
        listArr=[]; //creating empty array
    }
    else{
        listArr = JSON.parse(getLocalStorage); //Transforming Json string into object
    }
    listArr.push(userData); //Adding user data
    localStorage.setItem("Todo", JSON.stringify(listArr));
    showTasks(); //calling showTask function
    addBtn.classList.remove("active");//unactive the add button
}
//function to add task list inside ul tag
function showTasks(){
    let getLocalStorage = localStorage.getItem("Todo");// getting local storage
    if(getLocalStorage == null){ //if localstorage is null
        listArr=[]; //creating empty array
    }
    else{
        listArr = JSON.parse(getLocalStorage); //Transforming Json string into object
    }
    var pendingtasks = document.querySelector(".pendingtasks");
    pendingtasks.textContent = listArr.length; // passing the array length
    if(listArr.length>0){
        clrAllBtn.classList.add("active");//active the clear all button
    }
    else{
        clrAllBtn.classList.remove("active");
    }
    let newLiTag ="";
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputValue.value = ""; //once task added, leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("Todo");// getting local storage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1); //removing a particular indexed li
    //After removing, update again the local storage
    localStorage.setItem("Todo", JSON.stringify(listArr));
    showTasks(); //calling showTask function
}

//clear All button
clrAllBtn.onclick =()=>{
    localStorage.clear(); //Clearing the local storage
    addBtn.classList.remove("active");//unactive the add button
    showTasks(); //After clearing, again updating..
}
