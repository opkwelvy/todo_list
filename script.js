function uid(){
    return Date.now().toString(16) + Math.random().toString(16).substring(2);
}
let tasks = [];
inicializarLocalStorage();
const entradaTask = document.getElementById("entrada_task");
const buttonInput = document.getElementsByTagName("button")[0];
const listaTask = document.querySelector('ul');
const tasksAbertasTexto = document.querySelector('.todo_count');
const tasksConcluidasTexto = document.querySelector(".done_count");
const taskVazia = document.querySelector('.task_vazias');
// Sincronia do html com a lista de task
if (tasks.length > 0) {
    listItems();
}

//verificador
function verifyListIsEmpty(){
    if(tasks.length == 0){
        taskVazia.classList.remove("hidden");
    } else {
        taskVazia.classList.add("hidden");
    }
}
// Contador de tasks
function contador(){
    let toDoCount = 0;
    let doneCount = 0;
    toDoCount = tasks.length;
    tasksAbertasTexto.innerText = `${toDoCount}`
    for(const task of tasks){
        if(task.aberta == false){
            doneCount++;
        }
    }
    tasksConcluidasTexto.innerText = `${doneCount}`

}

//Criação de novo elemento taks
function criarNovaTask(taskName, taskId){
   
    // Cria div da task li
    let task = document.createElement("li");
    task.classList.add("task","aberta");
    task.setAttribute("id", taskId)


    //Criar .left_content div
    let leftContent = document.createElement("div");
    leftContent.classList.add("left_content");

    //todo icon
    let todoIcon = document.createElement("i")
    todoIcon.classList.add("ph-duotone", "ph-circle-dashed", "check_btn")
    todoIcon.addEventListener("click", finalizarTask)

    //done icon
    let doneIcon = document.createElement("i")
    doneIcon.classList.add("ph-duotone", "ph-check-circle", "check_btn" ,"hidden")
    doneIcon.addEventListener("click", abrirTask)

    //task name/p
    let name = document.createElement("p");
    name.innerText=taskName;

    //delete icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("ph-duotone", "ph-trash", "delete_btn")
    deleteIcon.addEventListener("click",excluirTask);

    leftContent.appendChild(todoIcon);
    leftContent.appendChild(doneIcon);
    leftContent.append(name);
    task.appendChild(leftContent);
    task.appendChild(deleteIcon);
    contador();
    verifyListIsEmpty();
    saveInfos();
    return task;
}


// Criação de tarefas
function adicionarTask(event){
    event.preventDefault();
    const taskName = entradaTask.value;
    const newTask ={
        id: uid(),
        name: taskName,
        aberta: true,
    }
    tasks.push(newTask)
    const taskElement = criarNovaTask(newTask.name, newTask.id);
    listaTask.appendChild(taskElement);
    const tagOcultada = document.querySelector('section.task_vazias');
    tagOcultada.classList.add("hidden");
    contador();
    verifyListIsEmpty();
    saveInfos();
}

// Task completa
function finalizarTask(event){

    
    const todoIcon = event.target;
    todoIcon.classList.add("hidden");

    const taskToCompletId = todoIcon.parentNode.parentNode.id;
    const taskToComplete = document.getElementById(taskToCompletId);

    taskToComplete.classList.add("fechada");
    taskToComplete.classList.remove("aberta");

    const doneIcon = todoIcon.parentNode.childNodes[1];
    doneIcon.classList.remove("hidden");
    tasks.find((item)=>{
        if(item.id==taskToCompletId){
            item.aberta = false;
        }
    })
    contador();
    verifyListIsEmpty();
    saveInfos();
}

// Task incompleta
function abrirTask(event){

    const doneIcon = event.target;
    doneIcon.classList.add("hidden");

    const taskToCompletId = doneIcon.parentNode.parentNode.id;
    const taskToComplete = document.getElementById(taskToCompletId);

    taskToComplete.classList.add("aberta");
    taskToComplete.classList.remove("fechada");
    
    const todoIcon = doneIcon.parentNode.childNodes[0];
    todoIcon.classList.remove("hidden");

    tasks.find((item)=>{
        if(item.id == taskToCompletId){
            item.aberta = true;
        }
    })
    contador();
    verifyListIsEmpty();
    saveInfos()
}


function listItems() {
    tasks.forEach((task)=>{
        const taskItem = criarNovaTask(task.name, task.id);
        listaTask.appendChild(taskItem);
        if(task.aberta==false){
            const id = task.id;
            const taskClosed = document.getElementById(id);
            const iconDone = taskClosed.querySelector(".ph-check-circle");
            const iconToDo = taskClosed.querySelector(".ph-circle-dashed");
            taskClosed.classList.add("fechada");
            taskClosed.classList.remove("aberta");
            iconDone.classList.remove("hidden");
            iconToDo.classList.add("hidden");
        }
        
    })
}

// Task deletada
function excluirTask(event){
    const taskToDeleteId = event.target.parentNode.id;
    const taskToDelete = document.getElementById(taskToDeleteId);
    const taskWithoutDeleteOne = tasks.filter((item)=>{
        return item.id !== taskToDeleteId
    })
   tasks = taskWithoutDeleteOne;
   listaTask.removeChild(taskToDelete);
   contador();
   verifyListIsEmpty();
   saveInfos()
}
// Salvar informações
function inicializarLocalStorage(){

    if(!localStorage.getItem("minhasTasks")){
        localStorage.setItem("minhasTasks", "")
    } else {
        getInfos();        
    }
}

function getInfos(){
    let tasksJason = localStorage.getItem("minhasTasks");
    tasks = JSON.parse(tasksJason);
    console.log(tasks);
}
function saveInfos(){
    let tasksJason = JSON.stringify(tasks);
    localStorage.setItem("minhasTasks", tasksJason);
}
