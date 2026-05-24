const nameInput = document.getElementById('js-name-input');
const addBtn = document.getElementById('js-add-btn');
const listContainer = document.getElementById('js-todo-list');

const toDoArray = [];
// function to add a task
function addToDo() {
	const name = nameInput.value;
	if (name === '') return; //avoids adding empty tasks
	toDoArray.push(name);
	renderToDoList();
	nameInput.value = '';
}
// function to display the items from an array
function renderToDoList() {
	let toDoList = '';
	for (let i = 0; i < toDoArray.length; i++) {
		// const arrayItem = toDoArray[i];
		const htmlList = `<li>${toDoArray[i]}</li>`;
		toDoList += htmlList;
	}
	listContainer.innerHTML = toDoList;
}
// adding event listeners
addBtn.addEventListener('click', addToDo);
nameInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addToDo();
	}
});
