//element inputs
const userIdInput = document.getElementById('user-id');

load();

//fetch data from todo api
async function fetchTodo(Id) {
  try {
    let response = [];
    if (Id === 0) {
      response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    } else {
      response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${Id}`
      );
    }
    return await response.json();
  } catch (error) {
    alert(`User ID not found! ${error}`);
    return [];
  }
}

//initializer to startup the page
async function load() {
  //get all todo items from api
  const allTodo = await fetchTodo(0);

  //remove duplicate ids
  let ids = [];
  for (const todo of allTodo) {
    if (!ids.includes(todo.userId)) {
      ids.push(todo.userId);
    }
  }

  //display user ids in drop down list
  for (const number of ids) {
    const newUserId = document.createElement('option');
    newUserId.setAttribute('data-value', number);
    newUserId.setAttribute('class', "bg-white text-dark");
    newUserId.innerHTML = `${number}`;
    userIdInput.appendChild(newUserId);
  }

  //display all todo items on the table
  displayTodo(allTodo);
}

//filter todo items based on selected user id
async function filterTodo() {
  userId = userIdInput.value;
  const data = await fetchTodo(userId);
  displayTodo(data);
}

//format todo in table
function displayTodo(list) {
  const todoList = document.getElementById('to-do-list');
  const rows = todoList.rows.length;

  if (rows != 0) {
    todoList.innerHTML = '';
  }

  for (const todo of list) {
    //create element tag
    newTodo = document.createElement('tr');
    newTodo.innerHTML = `<td>${todo.userId}: ${todo.title}</td>`;
    todoList.appendChild(newTodo);
  }
}
