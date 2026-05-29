const toDoArray = JSON.parse(localStorage.getItem('todolist')) || [];

// Keeps track of which index row is being edited
// Starts at null because no one is editing when the page loads
let editingIndex = null;
const nameInput = document.getElementById('js-name-input');
const addBtn = document.getElementById('js-add-btn');
const listContainer = document.getElementById('js-todo-list');

function addToDo() {
	const name = nameInput.value.trim();
	if (name === '') return;
	toDoArray.push(name);
	localStorage.setItem('todolist', JSON.stringify(toDoArray));
	nameInput.value = '';
	renderTodoList();
}
function renderTodoList() {
	let toDoListHtml = '';
	for (let i = 0; i < toDoArray.length; i++) {
		// Edit mode layout
		if (editingIndex === i) {
			toDoListHtml += `<li>
				<input type = "text" id="edit-box-${i}" value="${toDoArray[i]}">
				<button class="save-btn" onClick ="saveToDo(${i})">Save</button>
				<button onClick ="cancelEdit()">Cancel</button>
			</li>`;
		} else
			// Normal view mode layout
			toDoListHtml += `<li>
		<span>${toDoArray[i]}</span>
		<button onClick ="enterEditMode(${i})">Edit</button>
		<button class="delete-btn" onClick ="deleteToDo(${i})">Delete</button>
		</li>`;
	}
	listContainer.innerHTML = toDoListHtml;
}
function deleteToDo(index) {
	toDoArray.splice(index, 1);
	localStorage.setItem('todolist', JSON.stringify(toDoArray));
	renderTodoList();
}
function enterEditMode(index) {
	editingIndex = index;
	renderTodoList();
}
function saveToDo(index) {
	const editInput = document.getElementById(`edit-box-${index}`);
	const updatedText = editInput.value.trim();
	if (updatedText === '') {
		deleteToDo(index);
		return;
	}
	toDoArray[index] = updatedText;
	localStorage.setItem('todolist', JSON.stringify(toDoArray));
	// here the item is finished to edit so let the editingindex get back to default
	editingIndex = null;
	renderTodoList();
}
function cancelEdit() {
	editingIndex = null;
	renderTodoList();
}
// adding an event listener for the click
addBtn.addEventListener('click', addToDo);
// adding an event listener for the enter key
nameInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addToDo();
	}
});
renderTodoList();
