class UI {
    static showTask() {
        form.style.display = 'flex';
        form.addEventListener('blur', () => {
            form.style.display = 'none';
        });
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
            //clearing
            document.getElementById('task').value = null;
            document.getElementById('deadline-input').value = 'Monday';
            form.style.display = 'none';

            location.reload();
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
        currentTime.textContent = ` ${currentDay.toLocaleTimeString()}`;

    }
    static changeColor() {

        const cards = document.querySelectorAll('.tasks-cards');
        //setting colors
        document.body.classList.toggle("lightmode");
        container.classList.toggle("lightmode");
        date.classList.toggle("lightmode-colors");
        clear.classList.toggle("lightmode-cards");
        header.classList.toggle("lightmode-colors");

        //condition for buttons svg's
        if (container.classList.contains('lightmode')) {
            add.src = `/icons/add.svg`
            reverse.src = `/icons/reverse.svg`;
        } else {
            add.src = `/icons/add2.svg`
            reverse.src = `/icons/reverse2.svg`;
        }

        buttons.forEach(button => {
            button.classList.toggle("lightmode-cards");
        });
        cards.forEach(card => {
            card.classList.toggle("lightmode-cards");
        });

    }
    static taskDone(e) {

        const done = e.target.parentElement.parentElement;
        if (e.target.classList.contains('fa-times')) {
            done.textContent = `Removed!`
            done.style.fontSize = '4rem'
            done.style.color = '#e2a3a3'
            done.style.backgroundColor = '#01091d';

        } else if (e.target.classList.contains('fa-check')) {
            done.textContent = `Done!`
            done.style.fontSize = '4rem'
            done.style.color = '#3c535c'
            done.style.backgroundColor = '#a4d5e9';

        }

        setTimeout(() => {
            done.remove();
        }, 800);
    }
}