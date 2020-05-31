
class Storage {

    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTask(task) {
        const tasks = Storage.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    static clearFields() {
        let taskList = document.querySelector('.taskList');
        let taskCard = document.querySelectorAll('.tasks-cards');
        if (confirm(`ARE YOU SURE?`)) {
            localStorage.clear();

            //taskList.parentElement.style.display = 'none';
            taskList.style.display = 'block';

            //removing all cards
            taskCard.forEach(card => {
                card.style.display = 'none';
            });

            console.log(taskList)
            console.log(taskList.parentElement.classList)
            setTimeout(() => {
                taskList.style.display = 'none';
            }, 2000)

        }
    }

}