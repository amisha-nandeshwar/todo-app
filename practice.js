const inputDiv =document.getElementById("myInput");
const buttonDiv = document.getElementById("myBtn");
const listDiv = document.getElementById("myList");

//for stored a task
let myTodoList = JSON.parse(localStorage.getItem("myTodoList")) || [];
// local storage me phle data save karenge
const saveToLocalStorage=() => {
    //listDiv.innerhtmlka meaning hai humare pure html list(list aur btn)
    localStorage.setItem("myTodoList",JSON.stringify(todoList));
};

//on screen look task beautiful
const renderTask = () => {
    listDiv.innerHTML ="";//firstly old list we have make empty
    todoList.forEach((task,index) =>{
        //yha par check karenge ki task complete hai ya nhi uske hisab se tick lagayenge
        const isChecked = task.complete ? "checked ":"" ;
const strikeStyle = task.completed ? "style='text-decoration:line-through; opacity:0.5;'": "";
listDiv.insertAdjacentHTML("beforeend",`
<li>
    <div class ="task-left">
        <input type = "checkbox" class ="task-check" ${task.completed ?'checked' :''} onclick="toggleTask(${index})">
        <span class ="task-text" ${strikeStyle}>${task.text}</span>
 </div>
 <div class ="task-buttons">
    <button class ="edit-btn" onclick ="editTask(${index})">edit✏️</button>
<button class ="delete-btn" onclick ="deleteTask(${index})">❌</button>
 </div>
</li>
`);
    });
};

const loadFromLocalStorage = () => {
    const savedData =localStorage.getItem("myTodoList");
    if(savedData) {
        todoList = JSON.parse(savedData);
        renderTask();
    }
};
//on checkbox line through logic
function toggleTask(index) {
    todoList[index].completed = !todoList[index].completed;
    saveToLocalStorage();
    renderTask();
}
//edit task logic
function editTask(index) {
    let newText =prompt("Edit your task:",todoList[index].text);
    if(newText !==null && newText.trim() !=="") {
        todoList[index].text = newText;
        saveToLocalStorage();
        renderTask();
    }
}
//delete task logic
function deleteTask(index) {
    todoList.splice(index,1);
    saveToLocalStorage();
    renderTask();
}
buttonDiv.addEventListener("click",()=>{
 let userText=inputDiv.value.trim();
 //yha humne check kia ki kya input box khali hai
 if(userText===""){
    alert("please type something");//box empty hone par alert aayega
 }else{
    //in arraywe want to push object
    todoList.push({
        text:userText,
        completed:false
    });
    inputDiv.value="";
    //task judte hi local storage me save kro
    saveToLocalStorage();
    renderTask();
}
});

const themeBtn =document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click",() =>{
        document.body.classList.toggle("dark-theme");
    });
}
//clear all btn logic
const clearAllBtn = document.getElementById("clearAllBtn");
if(clearAllBtn) {
    clearAllBtn.addEventListener("click",() =>{
        const confirmDelete = confirm("are you sure you want to delete all task?");
        if (confirmDelete) {
            todoList = [];
            saveToLocalStorage();
            renderTask();
        }
    });
}

