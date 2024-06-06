document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    // Set initial theme from local storage or default to dark
    const initialTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(initialTheme);
    themeSelect.value = initialTheme;

    // Theme change handler
    themeSelect.addEventListener('change', () => {
        body.className = ''; // Reset classes
        const selectedTheme = themeSelect.value;
        body.classList.add(selectedTheme);
        localStorage.setItem('theme', selectedTheme); // Save theme to local storage
    });

    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const addTodoButton = document.getElementById('add-todo');
    const deleteAllButton = document.getElementById('delete-all');
    const todoTableBody = document.querySelector('#todo-table tbody');

    // Add event listeners for the buttons
    addTodoButton.addEventListener('click', addTodo);
    deleteAllButton.addEventListener('click', deleteAllTodos);

    // Function to add a new to-do item
    function addTodo() {
        const task = todoInput.value;
        const date = todoDate.value;
        if (task === '' || date === '') {
            alert('Please enter a task and a due date.');
            return;
        }

        const row = document.createElement('tr');

        const taskCell = document.createElement('td');
        taskCell.textContent = task;
        row.appendChild(taskCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        row.appendChild(dateCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = 'Pending';
        row.appendChild(statusCell);

        const actionsCell = document.createElement('td');
        actionsCell.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.classList.add('btn', 'btn-edit');
        editButton.addEventListener('click', () => editTask(row));
        actionsCell.appendChild(editButton);

        const completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.classList.add('btn', 'btn-complete');
        completeButton.addEventListener('click', () => completeTask(row));
        actionsCell.appendChild(completeButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = '✗';
        removeButton.classList.add('btn', 'btn-remove');
        removeButton.addEventListener('click', () => removeTask(row));
        actionsCell.appendChild(removeButton);

        row.appendChild(actionsCell);

        todoTableBody.appendChild(row);

        todoInput.value = '';
        todoDate.value = '';
    }

    // Function to edit an existing to-do item
    function editTask(row) {
        const taskCell = row.cells[0];
        const dateCell = row.cells[1];

        const newTask = prompt('Edit task:', taskCell.textContent);
        const newDate = prompt('Edit due date:', dateCell.textContent);

        if (newTask !== null && newTask !== '') {
            taskCell.textContent = newTask;
        }

        if (newDate !== null && newDate !== '') {
            dateCell.textContent = newDate;
        }
    }

    // Function to mark a to-do item as completed
    function completeTask(row) {
        const statusCell = row.cells[2];
        statusCell.textContent = 'Completed';
        statusCell.classList.add('completed');
    }

    // Function to remove a to-do item
    function removeTask(row) {
        row.remove();
    }

    // Function to delete all to-do items
    function deleteAllTodos() {
        todoTableBody.innerHTML = '';
    }
});
