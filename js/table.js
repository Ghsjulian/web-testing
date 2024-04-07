"use strict"
import __api__ from "./Requester.js"

function _dom_(tag) {
    return document.querySelector(tag);
}

var popWindow = _dom_(".main");
const add = _dom_("#add-user");
const edit = _dom_("#edit");
const close = _dom_("#close");
const container = _dom_(".container");
const action = _dom_("#action");
const button = _dom_("#btn");
const error = _dom_("#error");
//const table = _dom_("#table");
var totalUser = _dom_(".user");
var not_found = _dom_("#not-user");
//const search = _dom_("#search");
const table = document.getElementById("table");
const tbody = table.querySelector("tbody");

add.onclick = () => {
    _dom_("#type").value = "create";
    _dom_("#name").value = "";
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    _dom_("#status").value = "";
    error.textContent = "";
    action.textContent = "Create New User";
    container.style.opacity = "0.3";
    //_dom_(".form").style.animation = "top_bootom .3s";
    popWindow.style.visibility = "visible";
};
close.onclick = () => {
    _dom_("#name").value = "";
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    _dom_("#status").value = "";
    error.textContent = "";
    _dom_(".form").style.top = "0";
    popWindow.style.visibility = "hidden";
    container.style.opacity = "1";
};

function resetForm() {
    _dom_("#name").value = "";
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    _dom_("#status").value = "";
    error.textContent = "";
    _dom_(".form").style.top = "0";
    popWindow.style.visibility = "hidden";
    container.style.opacity = "1";
}

const users = [
    { id: 0, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "Q" },
    { id: 1, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" },
    { id: 2, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" },
    { id: 3, name: "Sweatan Sharma", email: "sweta@gmail.com", status: "User" },
    {
        id: 4,
        name: "Mukherjee Mukherjee",
        email: "rani@gmail.com",
        status: "User"
    },
    { id: 5, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" },
    { id: 6, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" },
    { id: 7, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" },
    { id: 8, name: "Ghs Julian", email: "ghsjulian@gmail.com", status: "User" }
];

users.forEach(user => {
    const row = tbody.insertRow();
    const idCell = row.insertCell();
    const nameCell = row.insertCell();
    const emailCell = row.insertCell();
    const statusCell = row.insertCell();
    const actionCell = row.insertCell();

    idCell.textContent = user.id;
    idCell.setAttribute("id", user.id);
    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
    statusCell.textContent = user.status;

    const editButton = document.createElement("a");
    editButton.setAttribute("id", "edit");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editUser(user));
    actionCell.appendChild(editButton);

    const removeButton = document.createElement("a");
    removeButton.setAttribute("id", "del");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeUser(user.id));
    actionCell.appendChild(removeButton);
});

// Add functions to create and edit users
function createUser() {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 0;
    var name = _dom_("#name").value;
    var email = _dom_("#email").value;
    var password = _dom_("#password").value;
    var status = _dom_("#status").value;
    const user = { id, name, email, status };
    let obj = {name,email,password,status}
    let url = "http://localhost:8080/users/add_user.php"
    __api__.postData(url, obj, res => {
        console.log(res);
    });
    users.push(user);
    addUserToTable(user);
    _dom_("#name").value = "";
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    _dom_("#status").value = "";
    error.textContent = "";
    _dom_(".form").style.top = "0";
    popWindow.style.visibility = "hidden";
    container.style.opacity = "1";
}

button.onclick = e => {
    e.preventDefault();
    var type = _dom_("#type").value;
    var username = _dom_("#name").value;
    var email = _dom_("#email").value;
    var password = _dom_("#password").value;
    var ustatus = _dom_("#status").value;
    if (username && email && password && ustatus) {
        if (type === "create") {
            createUser();
        } else {
            saveUser();
        }
    } else {
        error.textContent = "Please Filled Out The Form !";
    }
    setTimeout(() => {
        error.textContent = "";
    }, 3000);
};

function editUser(user) {
    _dom_("#type").value = "edit";
    _dom_("#user_id").value = user.id;
    _dom_("#action").textContent = "Edit User";
    _dom_("#name").value = users[user.id].name;
    _dom_("#email").value = users[user.id].email;
    _dom_("#password").value = "";
    _dom_("#status").value = users[user.id].status;
    error.textContent = "";
    action.textContent = "Edit User";
    container.style.opacity = "0.3";
    popWindow.style.visibility = "visible";
}

function saveUser() {
    var id = _dom_("#user_id").value;
    var name = _dom_("#name").value;
    var email = _dom_("#email").value;
    var password = _dom_("#password").value;
    var status = _dom_("#status").value;
    const user = { id, name, email, status };
    const index = users.findIndex(u => u.id === id);
    users[id] = user;
    updateUserInTable(users, id);
    resetForm();
}

function addUserToTable(user) {
    const row = tbody.insertRow();
    const idCell = row.insertCell();
    const nameCell = row.insertCell();
    const emailCell = row.insertCell();
    const statusCell = row.insertCell();
    const actionCell = row.insertCell();

    idCell.textContent = user.id;
    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
    statusCell.textContent = user.status;

    const editButton = document.createElement("a");
    editButton.textContent = "Edit";
    editButton.setAttribute("id", "edit");
    editButton.addEventListener("click", () => editUser(user));
    actionCell.appendChild(editButton);

    const removeButton = document.createElement("a");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("id", "del");
    removeButton.addEventListener("click", () => removeUser(user.id));
    actionCell.appendChild(removeButton);
}

function updateUserInTable(user, index) {
    const row = tbody.rows[index];
    row.cells[1].textContent = user[index].name;
    row.cells[2].textContent = user[index].email;
    row.cells[3].textContent = user[index].status;
}

function removeUser(id) {
    const index = users.findIndex(u => u.id === id);
    users.splice(index, 1);
    const row = tbody.rows[index];
    tbody.removeChild(row);
    // console.log(id)
}

function search() {
    var input = document.getElementById("search").value;
    input = input.toLowerCase().trim();
    let noResults = true;
    const currentTR = document.querySelectorAll("tr");
    currentTR.forEach(item => {
        let term = item.children[1].textContent.toLowerCase().trim("");
        if ((input.length > 1 && !input.includes(term)) || input === "") {
            item.style.display = "block";
        } else {
            tbody.appendChild(item);
            item.style.display = "block";
            noResults = false;
        }
        item.style.display = noResults ? "none" : "block";
    });
}

const obj = {
    name : "A",
    email: "B",
    password : "C",
    status : "D"
}


