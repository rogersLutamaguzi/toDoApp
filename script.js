const nameInput = document.getElementById('js-name-input');
const addBtn = document.getElementById('js-add-btn');
const listContainer = document.getElementById('js-todo-list');

const toDoArray = JSON.parse(localStorage.getItem('todolist')) || [];

// Keeps track of which index row is being edited
// Starts at null because no one is editing when the page loads
let editingIndex = null;

// function to add a task
function addToDo() {
	const name = nameInput.value;
	if (name === '') return; //avoids adding empty tasks
	toDoArray.push(name);
	localStorage.setItem('todolist', JSON.stringify(toDoArray));
	renderToDoList();
	nameInput.value = '';
}

// function to display the items from an array
function renderToDoList() {
	let toDoList = '';
	for (let i = 0; i < toDoArray.length; i++) {
		// CONDITION: Is the current row the one the user clicked to edit?
		if (editingIndex === i) {
			//  Show the input box so they can type changes

			const htmlList = `<li class = "todo-item" >
      <input type= "text" id = "edit-box-${i}" class = "edit-input" value = "${toDoArray[i]}"></input>
      <div class = "todo-actions">
      <button class = "save-btn" onclick = "saveToDo(${i})">Save</button>
      </div>
      </li>`;
			toDoList += htmlList;
		} else {
			// VIEW MODE

			const htmlList = `<li class = "todo-item" >
      <span class="task-text" onclick="enterEditMode(${i})">${toDoArray[i]}</span>
      <div class = "todo-actions">
      <button class = "delete-btn" onclick = "deleteToDo(${i})">Delete</button>
      </div>
      </li>`;
			toDoList += htmlList;
		}
	}
	listContainer.innerHTML = toDoList;

	// If we just enter edit mode, put the cursor inside the input box immediately
	if (editingIndex !== null) {
		const activeInput = document.getElementById(`edit-box-${editingIndex}`);
		if (activeInput) {
			activeInput.focus();

			// Setup Enter key listener directly on the active input box
			activeInput.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					saveToDo(editingIndex);
				}
			});

			//Wait 100 milliseconds before auto-saving on blur.
			// This gives your mouse click event enough time to finish hitting the "Save" button!
			activeInput.addEventListener('blur', () => {
				setTimeout(() => {
					// Only save if the user didn't click the save button (which sets index back to null)
					if (editingIndex !== null) {
						saveToDo(editingIndex);
					}
				}, 100);
			});
		}
	}
}

// Function to switch a specific row into edit mode
function enterEditMode(index) {
	editingIndex = index; // Update our sticky note with the row number
	renderToDoList(); // Redraw screen to show the input box for this row
}

// Function to save the changes made in the input box
function saveToDo(index) {
	const inputControl = document.getElementById(`edit-box-${index}`);

	// Safety check to ensure the input exists before reading its value
	if (inputControl) {
		const updatedValue = inputControl.value.trim();

		// Only save if the user didn't erase the whole text
		if (updatedValue !== '') {
			toDoArray[index] = updatedValue;
			localStorage.setItem('todolist', JSON.stringify(toDoArray));
		}
	}

	editingIndex = null; // Clear now because editing is finished
	renderToDoList(); // Redraw screen to switch back to standard view mode
}

// function to delete item
function deleteToDo(index) {
	toDoArray.splice(index, 1);
	localStorage.setItem('todolist', JSON.stringify(toDoArray));
	renderToDoList();
}

// adding event listeners
addBtn.addEventListener('click', addToDo);
nameInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addToDo();
	}
});
renderToDoList();
