const taskInput = document.querySelector('#task-input');
const taskSubmitButton = document.querySelector('.task-submit-button');
const taskList = document.querySelector('.task-list');

taskSubmitButton.addEventListener('click', addTask);

taskInput.addEventListener('focus', function(){
    taskInput.setAttribute("placeholder", "" );

});


taskInput.addEventListener('focusout', function(){
    taskInput.setAttribute("placeholder", "Enter Task" );
});

taskList.addEventListener('click', (e)=>{
    if(e.target.classList[0]==="task-delete-button"  ){
        const listItem = e.target.parentElement;
        listItem.classList.add("fall");
        listItem.addEventListener('transitionend', ()=>{
            listItem.remove();
        })
        // only 'i' clicks. Button tag gets deleted if one one parentElemnet property is used.
    }else if (e.target.classList[0]==="task-complete-button"){
        e.target.parentElement.classList.toggle('completed')
    }
}) 

function deleteTask(e) {

}

function addTask(e) {
    e.preventDefault();
    console.log("Hello")
    const todoTask = document.createElement('div'); // individual task container
    todoTask.classList.add("todo-task");

    const todoTaskInfo = document.createElement('li' );
    todoTaskInfo.innerText=taskInput.value;
    taskInput.value="";
    todoTaskInfo.classList.add("todo-task-info")
    todoTask.appendChild(todoTaskInfo);
    
    const taskCompleteButton = document.createElement("button");
    taskCompleteButton.innerHTML="<i class='far fa-check-circle'></i>"
    taskCompleteButton.classList.add("task-complete-button");
    todoTask.appendChild(taskCompleteButton);

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.innerHTML="<i class='far fa-trash-alt'></i>"
    taskDeleteButton.classList.add("task-delete-button");
    todoTask.appendChild(taskDeleteButton);

    taskList.appendChild(todoTask);
    
    // <div class="todo-task">
    //      <li class="todo-task-info"></li>
    //      <button class="task-complete-button"><i class="far fa-trash-alt"></i></button>
    //      <button class="task-delete-button"><i class="fal fa-check-circle"></i></button>
    // </div>
}

