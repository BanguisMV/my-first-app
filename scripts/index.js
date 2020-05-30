const add = document.querySelector('#add-button');
const form = document.querySelector('.form');
const cancel = document.querySelector('#cancel-button');
const save = document.querySelector('#save-button');
const clear = document.querySelector('#clear');
const remove = document.querySelector('#remove');
const reverse = document.querySelector('#reverse-button');
const currentDate = document.querySelector('#currentDate');

//UI.updateTask(3);
//Page will display if there is an existing Task.
window.addEventListener('DOMContentLoaded', UI.displayTask);
window.addEventListener('DOMContentLoaded',UI.getCurrentDate());


// Event Listeners
add.addEventListener('click', UI.showTask);
cancel.addEventListener('click', () => form.style.display = 'none');
save.addEventListener('click', UI.submitTask);
clear.addEventListener('click', Storage.clearFields);
reverse.addEventListener('click', UI.toggle)

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-times')) {
        const delIndex = parseInt(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        const task = Storage.getTasks();
        if (task.length === 0) {
            console.log('no task')
        } else {
            task.forEach(function (tasks, index) {
                if (tasks.taskID === delIndex) {
                    task.splice(index, 1);
                    e.target.parentElement.parentElement.remove();
                }
            });
            localStorage.setItem('tasks', JSON.stringify(task));
        }

    }
});

window.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-pencil')) {
        const delIndex = parseInt(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        const task = Storage.getTasks();
        if (task.length === 0) {
            console.log('no task');
        } else {
            task.forEach(function (tasks, index) {
                if (tasks.taskID === delIndex) {
                    task.splice(index, 1);
                    e.target.parentElement.parentElement.remove();
                }
            });
            localStorage.setItem('tasks', JSON.stringify(task));
        }

    }
});

