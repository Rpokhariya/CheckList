const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filters = document.querySelectorAll(".filter");
const deleteAll = document.querySelector(".delete-all");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML === null) {
        listContainer.innerHTML = '';
    }
}


deleteAll.addEventListener("click", function() {
    listContainer.innerHTML = '';
    saveData();
});
function filterTasks(filter) {
    const tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
        switch (filter) {
            case "completed":
                task.style.display = task.classList.contains("checked") ? "" : "none";
                break;
            case "pending":
                task.style.display = task.classList.contains("checked") ? "none" : "";
                break;
            default:
                task.style.display = "";
                break;
        }
    }
}

filters.forEach(filter => {
    filter.addEventListener("click", function() {
        const currentFilter = this.getAttribute("data-filter");
        const isActive = this.classList.contains("active");

        // Remove the active class from all filters
        filters.forEach(f => f.classList.remove("active"));

        if (!isActive) {
            // If the clicked filter was not active, activate it and filter tasks
            this.classList.add("active");
            filterTasks(currentFilter);
        } else {
            // If the clicked filter was active, show all tasks
            filterTasks("all");
        }
    });
});

showTask();