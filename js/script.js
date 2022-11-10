{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();

        return "";
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
                render();
    };

    const toogleDoneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toogleDoneButtons = document.querySelectorAll(".js-done");

        toogleDoneButtons.forEach((toogleDoneButton, index) => {
            toogleDoneButton.addEventListener("click", () => {
                toogleDoneTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="list__button list__button--done js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span  ${task.done ? "class=\"list__text--throughLine\"" : ""}>
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputField = document.querySelector(".js-newTask");
        const newTaskContent = inputField.value.trim();

        inputField.focus();
        
        if (newTaskContent === "") {
            return;
        }

        inputField.value = addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");        

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}