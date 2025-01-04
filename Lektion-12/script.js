const toggleThemeButton = document.querySelector(".theme-toggle");

const savdeTheme = localStorage.getItem("theme");

if (savdeTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleThemeButton.textContent = "Byt till Light Mode";
}else{
    document.body.classList.remove("dark-mode");
    toggleThemeButton.textContent = "Byt till Dark mode";
}

/* const isDarkMode = savdeTheme === "dark"
document.body.classList.toggle("dark-mode", isDarkMode)
toggleThemeButton.textContent =isDarkMode 
    ? "Byt till Light Mode" 
    : "Byt till Dark Mode"; */

toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    toggleThemeButton.textContent =isDarkMode 
    ? "Byt till Light Mode" 
    : "Byt till Dark Mode";

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

const addTodoButton = document.querySelector(".add-todo-btn");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

const savedTodos = JSON.parse(localStorage.getItem("todos"));

for (let i=0; i < savedTodos.length; i++) {
    const todoItem = document.createElement("li");
    todoItem.textContent = savedTodos[i];
    todoList.appendChild(todoItem);
}

addTodoButton.addEventListener("click", () => {
    const todoText =todoInput.value.trim();

    if (todoText === "") {
        return;
    }

    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;

    todoList.appendChild(todoItem);

    const todos = [];
    for (let i=0; i < todoList.children.length; i++) {
        todos.push(todoList.children[i].textContent)
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";


});
