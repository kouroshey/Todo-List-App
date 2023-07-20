const $ = document;
const inputElem = $.querySelector('.input-todo input');
let todosArray = []
let todoListElem = $.querySelector('.todo-list');
const clearBtn = $.querySelector('.clear-btn');
let editId;
let isEditedTask = false;
let filters = $.querySelectorAll('.filter');


filters.forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelector('.filters .active').classList.remove('active');
    btn.classList.add('active')
    todoGenerator(btn.id)
  })
})


localChecker = () => {

  if (JSON.parse(localStorage.getItem('todoList'))) {
    todosArray = todosArray = JSON.parse(localStorage.getItem('todoList'))
  } else {
    todosArray = []
  }
  todoGenerator("all")
  
}

todoGenerator = (filter) => {
  todoListElem.innerHTML = ''
  let li = '';
  if (todosArray) {
    todosArray.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == 'all') {
        li += `<li class="todo bottom-line">
              <label for="${id}">
                <input onclick = "checkHandler(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class = "${isCompleted}">${todo.name}</p>
              </label>
              <div class="settings">
                <i onclick = "showOptions(this)" class="bx bx-dots-horizontal-rounded"></i>
                <ul>
                  <li onclick= "editTodoHandler(${id} , '${todo.name}')">
                    <i class='bx bxs-pencil'></i>
                    <p>Edit</p>
                  </li>
                  <li onclick= "deleteTodoHandler(${id})">
                    <i  class='bx bxs-trash-alt'></i>
                    <p>Delete</p>
                  </li>
                </ul>
              </div>
            </li>`;
      }
    })
  };
  todoListElem.innerHTML += li || `<p style= "color: gray">You don't have any task here!</p>`

}

function editTodoHandler(optionId, optionName) {
  isEditedTask = true;
  editId = optionId;
  inputElem.value = optionName;
}

function deleteTodoHandler(deleteId) {
  todosArray.splice(deleteId, 1);
  localStorage.setItem('todoList', JSON.stringify(todosArray))
  todoGenerator("all")
}

addToLocal = event => {

  let newTask = inputElem.value.trim();

  if (newTask && event.keyCode === 13) {
    localStorage.setItem('todoList', '');
    if (!isEditedTask) {
      let newTaskData = {
        name: newTask,
        status: "pending"
      }
      todosArray.push(newTaskData);
      

    } else {
      todosArray[editId].name = newTask
      isEditedTask = false
    }
    localStorage.setItem('todoList', JSON.stringify(todosArray));
    inputElem.value = ''
    todoGenerator("all");

  } 



}

function showOptions(selectedOption) {
  let optionMenu = selectedOption.parentElement.lastElementChild;
  optionMenu.classList.add('show');
  document.addEventListener('click', e => {
    if (e.target != selectedOption) {
      optionMenu.classList.remove('show');
    }
  })

}

checkHandler = (selectedTodo) => {
  console.log(todosArray);
  let selectedTodoParagragh = selectedTodo.parentElement.lastElementChild;
  if (selectedTodo.checked) {
    selectedTodoParagragh.classList.add('checked');
    todosArray[selectedTodo.id].status = 'completed';
  } else {
    selectedTodoParagragh.classList.remove('checked');
    todosArray[selectedTodo.id].status = 'pending'

  }
  localStorage.setItem('todoList', JSON.stringify(todosArray))
}

clearList = () => {
  todosArray.splice(0 , todosArray.length);
  localStorage.setItem('todoList', JSON.stringify(todosArray))
  todoGenerator("all")
}

checkTodo = () => {
  $.querySelector('.todo label p').classList.add('checkTodo')
}

function showAllTodos() {
  todoGenerator("all")
  allTodosBtn.style.color = '#0088ff'
}

window.addEventListener('load', localChecker);
window.addEventListener('loadeddata', () => {
  window.location.reload(true); 
})
inputElem.addEventListener('keyup', addToLocal);
clearBtn.addEventListener('click', clearList);


