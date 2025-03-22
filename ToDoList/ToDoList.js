const todoList = [
    {
        name : 'make dinner', 
        dueDate : '03-08-2025'
    },
    {
        name: 'dish wash',
        dueDate : '03-08-2025'
    }
];

rendorToDoList();

function rendorToDoList(){
    let todoListHTML = '';

    todoList.forEach(function(todoObject, index){
        const {name, dueDate} = todoObject;
        const html = `<div>${name}</div>
                    <div>${dueDate}</div> 
                    <button class="delete-button js-delete-button" >Delete</button>`;
        todoListHTML += html;
    });
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index,1); 
            rendorToDoList();
        });
    });
}

document.querySelector('.js-add-button').addEventListener('click', () => {
    addToDo();
});

function addToDo(){
    const inputElement = document.querySelector('.js-todo-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-dueDate-input')
    const dueDate = dateInputElement.value;

    todoList.push({name, dueDate});
    inputElement.value = '';
    rendorToDoList();
}