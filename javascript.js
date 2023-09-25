const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;

    if (taskText.trim() !== '' && dueDate !== '' && dueTime !== '') {
        addTask(taskText, priority, dueDate, dueTime);
        taskInput.value = '';
        prioritySelect.value = 'High';
        dueDateInput.value = '';
        dueTimeInput.value = '';
    }
});

function addTask(text, priority, dueDate, dueTime) {
    const taskItem = document.createElement('li');
    taskItem.classList.add(priority.toLowerCase());
    taskItem.innerHTML = `
        <div class="task-details">
            <span class="task-text">${text}</span>
            <div class="task-actions">
                <span class="task-priority">Priority: ${priority}</span>
                <span class="task-due">Due: ${dueDate} at ${dueTime}</span>
                <button class="delete-button">Delete</button>
            </div>
        </div>
    `;

    taskItem.querySelector('.delete-button').addEventListener('click', function () {
        taskList.removeChild(taskItem);
        updateLocalStorage();
    });

    taskList.appendChild(taskItem);
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const text = taskItem.querySelector('.task-text').textContent;
        const priority = taskItem.querySelector('.task-priority').textContent.replace('Priority: ', '');
        const dueDetails = taskItem.querySelector('.task-due').textContent.replace('Due: ', '');
        const [dueDate, dueTime] = dueDetails.split(' at ');
        tasks.push({ text, priority, dueDate, dueTime });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.priority, task.dueDate, task.dueTime);
    });
}

loadTasksFromLocalStorage();
