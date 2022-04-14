// Step One, get the information (controller, accept requests)
function getMessage() {

    let msg = document.getElementById("txtMessage").value;

    displayMessage(msg);
    
    // this clears the input field after it's displayed
    document.getElementById("txtMessage").value = '';
}



// Final Step, display the information (view, displays stuff on screen)
function displayMessage(message) {

    // first get the ol element from the page
    element = document.getElementById("results");

    // next create a new li element
    let item = document.createElement("li");

    // add classes to li element
    item.classList.add("list-group-item");

    // set the message for the li element
    item.innerHTML = message;

    element.appendChild(item);
}