//element select cheskundam dewdsssssss
const form =document.getElementById('todoform');
const todoInput =document.getElementById('newtodo');
const todosListElements = document.getElementById('todos-list');
const notificationElement = document.querySelector('.notification');

//vars here
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;    

//fst render
rendertodos();

//form submission boltheyy dewdsss
form.addEventListener('submit', function(event){
    event.preventDefault();

    saveTodo();
    rendertodos();
    localStorage.setItem('todos',JSON.stringify(todos))
});

//saving Todo functions
function saveTodo() {
    const todovalue = todoInput.value;

//what if its empty
const isEmpty = todovalue ==='';

//duplicate wahase hatoo
const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todovalue.toUpperCase()); 

if(isEmpty){
    shownotification("your input is empty");   // alert place lo shownotifiction attribute use
} else if(isDuplicate){
    shownotification('you entered the same values dewdss');
} else{
    if(EditTodoId >= 0 ){
       todos = todos.map((todo , index) => ({
                ...todo,
                value : index === EditTodoId ? todovalue : todo.value, 
            }));
            EditTodoId = -1;
    } else {
         todos.push({
            value : todovalue,
            checked : false,
            color:'#' + Math.floor(Math.random()*16777215).toString(16),
        });
    }
    
    todoInput.value = '';
    
} }

//render todosssssss
function rendertodos(){ 
    if(todos.length === 0){
        todosListElements.innerHTML = '<center style="font-style: italic; font-family: cursive;"><br> Your TODO tasks goes here..... </center>'
        return
    }
    //clearing rerender elemnts
    todosListElements.innerHTML = '';

    //rendering todo 
    todos.forEach((todo,index) => {
        todosListElements.innerHTML += `
        <div class="todo" id=${index}>  
            <i
              class="fa-regular  ${todo.checked? 'fa-circle-check' : 'fa-circle' }"
              style = "color : ${todo.color}"
              data-action="check"
             ></i>
             <p class="${todo.checked? 'checked' : '' }" "data-action="check">${todo.value}</p>
             <i class="fa-solid fa-pen-to-square" data-action="edit"></i>
             <i class="fa-solid fa-trash" data-action="delete"></i>
        </div> 
        `;
    } ) ; 
}

//all in one todo listernerssssss
todosListElements.addEventListener('click',(event)=>{
    const target = event.target;
    const parentElement = target.parentNode;
    
    if(parentElement.className !== 'todo') return;

    //t o d o id 
    const todo = parentElement;
    const todoId = Number(todo.id);
    
    //target action
    const action =  target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
});
//checking todo
function checkTodo(todoId){
    todos = todos.map((todo,index) => 
    ({
            ...todo,
            checked : index === todoId ? !todo.checked : todo.checked,
        }));


    rendertodos();
    localStorage.setItem('todos',JSON.stringify(todos))
    }

//edit  the todo 
function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//deleting todo 
function deleteTodo(todoId){
    todos = todos.filter((todo,index) => index !== todoId);
    EditTodoId = -1;

//then it shd rerender
   rendertodos();
   localStorage.setItem('todos',JSON.stringify(todos))
}

//enable notifications
function shownotification(msg){
    //change the message
    notificationElement.innerHTML = msg;
    
    //presence of notification
    notificationElement.classList.add('notif-enter');

    //end of notification
    setTimeout(()=>{
        notificationElement.classList.remove('notif-enter')
    },2000)
 }

