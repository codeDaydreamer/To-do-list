const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const allBtn = document.getElementById('allBtn');
const completedBtn = document.getElementById('completedBtn');
const activeBtn = document.getElementById('activeBtn');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="toggleTask(${index})">Toggle</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function clearAllTasks() {
    tasks = [];
    renderTasks();
}

function filterTasks(filter) {
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
    activeBtn.classList.remove('active');

    if (filter === 'all') {
        allBtn.classList.add('active');
        renderTasks();
    } else if (filter === 'completed') {
        completedBtn.classList.add('active');
        const completedTasks = tasks.filter(task => task.completed);
        taskList.innerHTML = '';
        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="completed">${task.text}</span>
                <button onclick="toggleTask(${index})">Toggle</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    } else if (filter === 'active') {
        activeBtn.classList.add('active');
        const activeTasks = tasks.filter(task => !task.completed);
        taskList.innerHTML = '';
        activeTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="toggleTask(${index})">Toggle</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
}

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearAllBtn.addEventListener('click', clearAllTasks);

allBtn.addEventListener('click', function () {
    filterTasks('all');
});

completedBtn.addEventListener('click', function () {
    filterTasks('completed');
});

activeBtn.addEventListener('click', function () {
    filterTasks('active');
});
