let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

renderTaskList();

document.querySelector('.js-add-button').addEventListener('click',()=>{
    const taskInputElement = document.querySelector('.js-task-input');
    const dueDateInputElement = document.querySelector('.js-due-date-input');

    const taskName = taskInputElement.value.trim(); // removes extra spaces from the input
    const dueDate = dueDateInputElement.value;

    if(!taskName || !dueDate){
        alert("Please fill in both fields.")
        return;
    }

    taskList.push({taskName,dueDate , completed: false});
    localStorage.setItem('taskList', JSON.stringify(taskList)); // update storage

    // Resets the input fields to empty
    taskInputElement.value= ''; 
    dueDateInputElement.value= '';

    renderTaskList(); // refresh UI

})

function renderTaskList(){
    const taskListHTML = taskList.map((task, index) => {
        const rowclass = task.completed ? 'table-success text-decoration-line-through' : '';
        const completeBtnIcon = task.completed ? 'bi-arrow-counterclockwise' : 'bi-check-lg';

        return `
        <tr class="${rowclass}">
            <td class="fw-semibold">${task.taskName}</td>
            <td>${task.dueDate}</td>
            <td>
                <button class="btn btn-success btn-sm me-1 js-complete-button" data-index="${index}">
                    <i class="bi ${completeBtnIcon}"></i>
                </button>
                <button class="btn btn-warning btn-sm me-1 js-edit-button" data-index="${index}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger btn-sm js-delete-button" data-index="${index}">
                    <i class="bi bi-trash3"></i>
                </button>
            </td>
        </tr>`;
    }).join('');

    document.querySelector('.js-task-list').innerHTML = taskListHTML;

    document.querySelectorAll('.js-delete-button').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            taskList.splice(index,1); // removes the task at the given index
            localStorage.setItem('taskList', JSON.stringify(taskList)); // update storage
            renderTaskList(); // refresh UI
        })
    })

    document.querySelectorAll('.js-complete-button').forEach(button => {
        const index = button.dataset.index;
        button.addEventListener('click', () => {
          taskList[index].completed = !taskList[index].completed; // toggle complete status
          localStorage.setItem('taskList', JSON.stringify(taskList)); // update storage
          renderTaskList(); // refresh UI
        });
    });

    document.querySelectorAll('.js-edit-button').forEach(button => {
        const index = button.dataset.index;
        button.addEventListener('click', ()=> {
            const currentTask = taskList[index];

            const newTaskName = prompt('Edit Task Name',currentTask.taskName);
            const newDueDate = prompt('Edit Due Date', currentTask.dueDate);

            if(newTaskName || newDueDate){
                taskList[index].taskName = newTaskName.trim();
                taskList[index].dueDate = newDueDate;
                localStorage.setItem('taskList', JSON.stringify(taskList));
                renderTaskList();
            }
        })
    });
}