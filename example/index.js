"use strict";
import __api__ from "./Requester.js";

function _dom_(tag) {
    return document.querySelector(tag);
}

const add = _dom_("#btn");
const error = _dom_("#error");
const success = _dom_("#success");

add.onclick = () => {
    _dom_("#email").value = "";
    _dom_("#password").value = "";
    error.textContent = "";
    action.textContent = "Create New User";
    container.style.opacity = "0.3";
    _dom_(".form").style.animation = "top_bootom .3s";
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

add.onclick = e => {
    e.preventDefault();
    var email = _dom_("#email").value.trim();
    var password = _dom_("#password").value.trim();
    if (email && password) {
        __api__.postData(
            "http://localhost:8080/login/",
            { email, password },
            res => {
                if (res.status === "success") {
                    success.textContent = res.message;
                } else {
                    error.textContent = res.message;
                }
            }
        );
    } else {
        error.textContent = "Please Filled Out The Form !";
    }
    /*
    setTimeout(() => {
        error.textContent = "";
    }, 10000);
    */
};

