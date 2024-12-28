// Get references to the elements
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}

// Function to create a task element
function createTaskElement(taskText, isCompleted = false) {
    const taskItem = document.createElement('li');

    // Create the checkbox for marking completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-checkbox');
    checkBox.checked = isCompleted;
    checkBox.addEventListener('change', toggleTaskCompletion);

    // Create the task text
    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = taskText;

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.addEventListener('click', () => removeTask(taskItem));

    // Append elements to the task item
    taskItem.appendChild(checkBox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);

    // Add completed class if necessary
    if (isCompleted) {
        taskItem.classList.add('completed');
    }

    return taskItem;
}

// Function to add a new task
function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // Create the new task element
    const taskItem = createTaskElement(taskValue);

    // Append the task item to the list
    taskList.appendChild(taskItem);

    // Save task to localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = "";
}

// Function to toggle task completion
function toggleTaskCompletion(event) {
    const taskItem = event.target.closest('li');
    taskItem.classList.toggle('completed');

    // Save the updated tasks to localStorage
    saveTasks();
}

// Function to remove a task
function removeTask(taskItem) {
    taskList.removeChild(taskItem);

    // Save the updated tasks to localStorage
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
