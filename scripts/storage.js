class Task {
    constructor(title, deadline, taskID) {
        this.title = title;
        this.deadline = deadline;
        this.taskID = taskID;
    }
}

class UI {
    static showTask() {
        form.style.display = 'flex';
    }
    static displayTask() {

        const data = Storage.getTasks();
        const cards = document.getElementById('cards');

        data.forEach((d, index) => {
            const tasksCards = document.createElement('div');
            const number = document.createElement('h1');

            const cardTitle = document.createElement('div');
            const cardDate = document.createElement('div');
            const cardEdit = document.createElement('div');
            const check = document.createElement('i');
            const remove = document.createElement('i');


            const p = document.createElement('p');
            const h2 = document.createElement('h2');

            const p_Date = document.createElement('p');
            const h2_Date = document.createElement('h2');

            cards.insertAdjacentElement("beforeend", tasksCards);
            tasksCards.insertAdjacentElement("beforeend", cardEdit);

            cardEdit.insertAdjacentElement('beforeend', remove);
            cardEdit.insertAdjacentElement('afterbegin', check);

            tasksCards.insertAdjacentElement("afterbegin", cardDate);
            tasksCards.insertAdjacentElement("afterbegin", cardTitle);

            cardDate.insertAdjacentElement("afterbegin", p_Date);
            cardDate.insertAdjacentElement("beforeend", h2_Date);

            cardTitle.insertAdjacentElement("beforeend", h2);
            cardTitle.insertAdjacentElement("afterbegin", p);

            tasksCards.insertAdjacentElement("afterbegin", number);

            check.id = 'edit';
            remove.id = 'remove';
            h2_Date.id = 'deadline'

            check.classList = 'fa fa-check';
            remove.classList = 'fa fa-times';

            p.textContent = 'Title:';
            p_Date.textContent = 'Deadline:';
            h2.id = 'title';


            tasksCards.classList.add('tasks-cards');
            number.classList.add('tasks-cards-number');
            cardEdit.classList.add('tasks-cards-edit')
            cardDate.classList.add('tasks-cards-date')
            cardTitle.classList.add('tasks-cards-title');



            number.textContent = d.taskID;
            h2.textContent = d.title;
            h2_Date.textContent = d.deadline;

        });
    }
    static submitTask() {
        if (task.value !== null && task.value !== '' && task.value.trim().length !== 0) {
            const deadline = document.querySelector('#deadline-input').value,
                task = document.querySelector('#task').value;

            const data = Storage.getTasks();


            //adding task
            const myTask = new Task(task, deadline, data.length + 1);
            Storage.addTask(myTask);
            UI.addTask(myTask);
            console.log(myTask)
            //clearing
            document.getElementById('task').value = null;
            document.getElementById('deadline-input').value = 'Monday';
            form.style.display = 'none';


        } else {
            alert('Provide task title.');
        }
    }
    static addTask(task) {
        const cards = document.getElementById('cards');
        const tasksCards = document.createElement('div');
        const number = document.createElement('h1');

        const cardTitle = document.createElement('div');
        const cardDate = document.createElement('div');
        const cardEdit = document.createElement('div');
        const check = document.createElement('i');
        const remove = document.createElement('i');


        const p = document.createElement('p');
        const h2 = document.createElement('h2');

        const p_Date = document.createElement('p');
        const h2_Date = document.createElement('h2');

        cards.insertAdjacentElement("beforeend", tasksCards);
        tasksCards.insertAdjacentElement("beforeend", cardEdit);

        cardEdit.insertAdjacentElement('beforeend', remove);
        cardEdit.insertAdjacentElement('afterbegin', check);

        tasksCards.insertAdjacentElement("afterbegin", cardDate);
        tasksCards.insertAdjacentElement("afterbegin", cardTitle);

        cardDate.insertAdjacentElement("afterbegin", p_Date);
        cardDate.insertAdjacentElement("beforeend", h2_Date);

        cardTitle.insertAdjacentElement("beforeend", h2);
        cardTitle.insertAdjacentElement("afterbegin", p);

        tasksCards.insertAdjacentElement("afterbegin", number);

        check.id = 'edit';
        remove.id = 'remove';
        h2_Date.id = 'deadline'

        check.classList = 'fa fa-check';
        remove.classList = 'fa fa-times';

        p.textContent = 'Title:';
        p_Date.textContent = 'Deadline:';
        h2.id = 'title';


        tasksCards.classList.add('tasks-cards');
        number.classList.add('tasks-cards-number');
        cardEdit.classList.add('tasks-cards-edit')
        cardDate.classList.add('tasks-cards-date')
        cardTitle.classList.add('tasks-cards-title');


        const data = Storage.getTasks();
        number.textContent = task.taskID; //bug
        h2.textContent = task.title;
        h2_Date.textContent = task.deadline;
    }
    static toggle() {
        const cards = document.getElementById("cards");
        cards.classList.toggle("reverse-column");
    }

    static getCurrentDay(day) {
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let newDay = weekday[day];

        return newDay;
    }
    static getCurrentMonth(month) {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        let newMonth = months[month];

        return newMonth;
    }

    static getCurrentDate() {
        const currentDay = new Date;
        const year = currentDay.getFullYear();
        const date = currentDay.getDate();
        const day = currentDay.getDay();
        const currentMonth = currentDay.getMonth();
        currentDate.textContent = `${UI.getCurrentDay(day)}, ${UI.getCurrentMonth(currentMonth)} - ${date} - ${year}`;
    }
}

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