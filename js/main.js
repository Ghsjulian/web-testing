"use strict";

function _dom_(tag) {
   return document.querySelector(tag);
}

var myTable = [];

var popWindow = _dom_(".main");
const add = _dom_("#add-user");
const edit = _dom_("#edit");
const close = _dom_("#close");
const container = _dom_(".container");
const action = _dom_("#action");
const button = _dom_("#btn");
const error = _dom_("#error");
const table = _dom_("#table");
var totalUser = _dom_(".user");
var not_found = _dom_("#not-user");
const search = _dom_("#search");

add.onclick = () => {
    _dom_("#name").value = "";
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    _dom_("#status").value = "";
    error.textContent = "";
    action.textContent = "Create New User";
    container.style.opacity = "0.3";
    _dom_(".form").style.animation = "top_bootom .3s";
    popWindow.style.visibility = "visible";
};
close.onclick = () => {
    error.textContent = "";
    _dom_(".form").style.top = "0"
    popWindow.style.visibility = "hidden";
    container.style.opacity = "1";
};

var data = [
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Sweatan",
        email: "sweta@gmail.com",
        status: "User"
    },
    {
        username: "Rani Mukherjee",
        email: "rani@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    },
    {
        username: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        status: "User"
    }
];

button.onclick = e => {
    e.preventDefault();
    var username = _dom_("#name").value;
    var email = _dom_("#email").value;
    var password = _dom_("#password").value;
    var ustatus = _dom_("#status").value;
    if (username && email && password && ustatus) {
        console.log("ok");
    } else {
        error.textContent = "Please Filled Out The Form !";
    }
    setTimeout(() => {
        error.textContent = "";
    }, 3000);
};

window.onload = () => {
    var thead = `
        <tr id="t-head">
            <th>ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Status</th>
            <th>User Action</th>
        </tr>`;
    table.innerHTML = thead;
    for (let i = 0; i < data.length; i++) {
        let td = `
        <tr id="tr_${i}">
           <td>${i}</td>
           <td>${data[i].username}</td>
           <td>${data[i].email}</td>
           <td>${data[i].status}</td>
           <td>
           <a href="#" id="edit" data="${i}">Edit</a>
           <a href="#" id="del" data="${i}">Remove</a>
           </td>
        </tr>`;
        myTable.push(td.trim());
        table.innerHTML += td;
    }
    totalUser.innerHTML = "Total User : " + myTable.length;
};

setTimeout(() => {
    const currentTR = document.querySelectorAll("tr");
    const edit = document.querySelectorAll("#edit");
    const remove = document.querySelectorAll("#del");
    edit.forEach(btn => {
        btn.onclick = () => {
            let data = btn.getAttribute("data");
            let tr = _dom_("#tr_" + data);
            var val = [];
            for (let i = 0; i < tr.children.length; i++) {
                val.push(tr.children[i].textContent.trim()); //.split(" \n "))
            }
            _dom_("#action").textContent = "Edit User";
            _dom_("#name").value = val[1];
            _dom_("#email").value = val[2];
            _dom_("#password").value = "";
            _dom_("#status").value = val[3];
            error.textContent = "";
            action.textContent = "Edit User";
            container.style.opacity = "0.3";
            popWindow.style.visibility = "visible";
        };
    });
    remove.forEach(btn => {
        btn.onclick = () => {
            let data = btn.getAttribute("data");
            let tr = _dom_("#tr_" + data);
            tr.remove();
            //tr.style.display = "none";
            myTable.pop(data);
            if (myTable.length == 0) {
                _dom_("#t-head").innerHTML = "";
                not_found.innerHTML = "No User Available !";
            }
            totalUser.innerHTML = "Total User : " + myTable.length;
        };
    });
}, 2000);

// Search User ....
search.addEventListener("keyup", event => {
    var target = event.target.value.trim().toLowerCase();
    const currentTR = document.querySelectorAll("tr");
    currentTR.forEach(item => {
        let term = item.children[1].textContent.toLowerCase().trim("");
        if (target.length > 2 && target.indexOf(term)) {
            table.appendChild(item);
        }
    });
});
