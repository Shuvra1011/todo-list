const taskInput = document.querySelector('#task-input');
const taskSubmitButton = document.querySelector('.task-submit-button');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector('taskStatus');


window.addEventListener('load', getTasksFromStorage );

taskSubmitButton.addEventListener('click', addTask);

taskInput.addEventListener('focus', function () {
    taskInput.setAttribute("placeholder", "");

});


taskInput.addEventListener('focusout', function () {
    taskInput.setAttribute("placeholder", "Enter Task");
});

taskStatus.addEventListener('change', filterTaskList)

taskList.addEventListener('click', (e) => {
    if (e.target.classList[0] === "task-delete-button") {
        const listItem = e.target.parentElement;
        listItem.classList.add("fall");
        listItem.addEventListener('transitionend', () => {
            listItem.remove();
            let removeTask = listItem.querySelector('.todo-task-info').innerText;
            removeTasksFromStorage(removeTask);
            // console.log();
            
        })
        // only 'i' clicks. Button tag gets deleted if one one parentElemnet property is used.
    } else if (e.target.classList[0] === "task-complete-button") {
        e.target.parentElement.classList.toggle('completed')
    }
})

function filterTaskList(e) {
    console.log(e.target.value, taskList.childNodes.length);
    if (e.target.value !== "default" && taskList.childNodes.length > 0) {
        const existingTaskList = taskList.childNodes;
        existingTaskList.forEach(function (task) {
            switch (e.target.value) {
                case "completed":
                    // console.log(task.classList);
                    // break;
                    if (task.classList.contains('completed')) {
                        task.style.display = 'flex';
                        break;
                    }
                    else {
                        task.style.display = "none";
                        break;
                    }

                case "uncompleted":
                    if (!task.classList.contains('completed')) {


                        task.style.display = 'flex';
                        break;
                    }
                    else {
                        task.style.display = "none";
                        break;
                    }

                default:
                    task.style.display = "flex"
            }
            //     })
        })

    }
}

function addTask(e) {
    e.preventDefault();
    saveTasksToLocalStorage(taskInput.value);
    console.log("Hello")
    const todoTask = document.createElement('div'); // individual task container
    todoTask.classList.add("todo-task");

    const todoTaskInfo = document.createElement('li');
    todoTaskInfo.innerText = taskInput.value;
    taskInput.value = "";
    todoTaskInfo.classList.add("todo-task-info")
    todoTask.appendChild(todoTaskInfo);


    const taskCompleteButton = document.createElement("button");
    taskCompleteButton.innerHTML = "<i class='far fa-check-circle'></i>"
    taskCompleteButton.classList.add("task-complete-button");
    todoTask.appendChild(taskCompleteButton);

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.innerHTML = "<i class='far fa-trash-alt'></i>"
    taskDeleteButton.classList.add("task-delete-button");
    todoTask.appendChild(taskDeleteButton);

    taskList.appendChild(todoTask);

    // <div class="todo-task">
    //      <li class="todo-task-info"></li>
    //      <button class="task-complete-button"><i class="far fa-trash-alt"></i></button>
    //      <button class="task-delete-button"><i class="fal fa-check-circle"></i></button>
    // </div>
}

function saveTasksToLocalStorage(task) {
    // console.log("From Save Local Storage: ", task)
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
        // console.log("Inside first If")
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    // console.log("Before stringify",tasks);
    // console.log("After stringify", JSON.stringify(tasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // tasks.forEach(task=>{
    //     if (task.contai)
    // })
}

function getTasksFromStorage() {

    let tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);

    // let storage = Object.values(tasks);
    // storage = JSON.parse(storage);
    console.log("Tasks",Object.keys(tasks));

    (tasks !== null) ?

        Object.values(tasks).forEach(task => {
            const todoTask = document.createElement('div'); // individual task container
            todoTask.classList.add("todo-task");

            const todoTaskInfo = document.createElement('li');
            todoTaskInfo.innerText = task;
            taskInput.value = "";
            todoTaskInfo.classList.add("todo-task-info")
            todoTask.appendChild(todoTaskInfo);


            const taskCompleteButton = document.createElement("button");
            taskCompleteButton.innerHTML = "<i class='far fa-check-circle'></i>"
            taskCompleteButton.classList.add("task-complete-button");
            todoTask.appendChild(taskCompleteButton);

            const taskDeleteButton = document.createElement("button");
            taskDeleteButton.innerHTML = "<i class='far fa-trash-alt'></i>"
            taskDeleteButton.classList.add("task-delete-button");
            todoTask.appendChild(taskDeleteButton);

            taskList.appendChild(todoTask);
        }): null
}

function removeTasksFromStorage(removeTask){
    console.log("Remove task start");
    let tasks = localStorage.getItem("tasks");
    if ( tasks !== null){
        console.log("Inside remove task check")
        tasks = JSON.parse(tasks);
        tasks.forEach((task, index)=>{
            if(task === removeTask){
                console.log("Deleting task")
                tasks.splice(index, 1)
                localStorage.setItem("tasks", JSON.stringify(tasks));
                return;
            }
        })
    }
}

