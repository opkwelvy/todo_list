function uid(){
    return Date.now().toString(16) + Math.random().toString(16).substring(2);
}
let tasks = [

]
const entradaTask = document.getElementById("entrada_task");
const buttonInput = document.getElementsByTagName("button")[0];
const listaTask = document.querySelector('ul');



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
    
    return task;
}


// Criação de tarefas
function adicionarTask(event){
    event.preventDefault();
    console.log('Adicionar tarefa')
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
}


// Task completa
function finalizarTask(event){
    console.log('Finalizar tarefa')
}


// Task incompleta
function abrirTask(event){
    console.log('Retomar tarefa')
}


// Task deletada
function excluirTask(event){
    console.log('Excluir tarefa')
}


// Sincronia do html com a lista de task
tasks.forEach((task)=>{
    const taskItem = criarNovaTask(task.name, task.id);
    listaTask.appendChild(taskItem);
})

// Contador de tasks