const input = document.querySelector('.input');
const listElement = document.querySelector('.todoList');
const templateTask = document.querySelector('.template');
const menu = document.querySelector('.menu');

let todoList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

const updateItemsLeft = () => {
  let tasks = document.querySelectorAll('.todoList>li');
  tasks = Array.prototype.slice.call(tasks);
  const tasksLeft = document.querySelector('.tasksLeft');
  const tasksLeftCount = tasks.reduce((counter, task) =>{
    const checkbox = task.querySelector('.selected');
    if(!checkbox.checked && !task.classList.contains('template')){
      return counter+1;
    }
    return counter;
  },0);
  
  tasksLeft.textContent = tasksLeftCount + " items left";
}

const createTask = (task) => {
  const clone = templateTask.cloneNode(true);
  const text = clone.querySelector('.text');
  const button = clone.querySelector('.button');
  const selectedTask = clone.querySelector('.selected');
  
  clone.classList.remove('template');
  listElement.appendChild(clone);
  
  text.textContent = task.title;
  localStorage.setItem('tasks', JSON.stringify(todoList));
  
  if(task.completed === true){
    text.classList.toggle('lineThrough');
    selectedTask.checked = true;
  }

  updateItemsLeft();
  menu.classList.remove('hidden');

  button.onclick = (e) => {
    todoList = todoList.filter((item) => item.title !== text.textContent);
    localStorage.setItem('tasks', JSON.stringify(todoList));
    listElement.removeChild(clone);
    updateItemsLeft();
  } 
  
  selectedTask.onclick = (e) => {
    text.classList.toggle('lineThrough');
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(todoList));
    updateItemsLeft();
  }
};

window.onhashchange = () => {
  
  const lists = document.querySelectorAll('.todoList>li');
  
  switch(location.hash) {
    case '#completed':
      lists.forEach((li) => {
        const p = li.querySelector('p');
        if (!p.classList.contains('lineThrough')) {
          li.classList.add('hidden');
        } else {
          li.classList.remove('hidden');
        }
      })
      break;
    case '#active':
      lists.forEach((li) => {
        const p = li.querySelector('p');
        if (p.classList.contains('lineThrough')) {
          li.classList.add('hidden');
        } else {
          li.classList.remove('hidden');
        }
      })
      break;
    default:
      lists.forEach((li) => {
        li.classList.remove('hidden');
    })
  } 
};
      
todoList.forEach(createTask);

input.onchange = (e) => {
  let task = {
    title: input.value,
    completed: false
  }
  todoList.push(task);
  createTask(task);
  input.value = '';
};

updateItemsLeft();

const clearButton = document.querySelector('div>.clearall');
const section = document.querySelector('.sc');
clearButton.onclick = () => {
  todoList = [];
  localStorage.setItem('tasks', JSON.stringify(todoList));
  const lists = document.querySelectorAll('.todoList>li');
  lists.forEach((li) => {
    li.querySelector('.button').click();
  })
};



