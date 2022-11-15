{
    let tasks = [];
    let hiddenDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (removedTaskIndex) => {
        tasks = [
            ...tasks.slice(0, removedTaskIndex),
            ...tasks.slice(removedTaskIndex + 1),
        ];
        render();
    };

    const toogleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleAllDoneTask = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const hideDoneTask = () => {
        hiddenDoneTask = !hiddenDoneTask;
        render();
    };

    const bindEventsRemoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindEventsToogleDoneButtons = () => {
        const toogleDoneButtons = document.querySelectorAll(".js-done");

        toogleDoneButtons.forEach((toogleDoneButton, index) => {
            toogleDoneButton.addEventListener("click", () => {
                toogleDoneTask(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const toogleAllDone = document.querySelector(".js-allDone");

        if (toogleAllDone) {
            toogleAllDone.addEventListener("click", () => {
                toogleAllDoneTask();
            });
        };

        const hiddenTaskButton = document.querySelector(".js-hideDoneTask");

        if (hiddenTaskButton) {
            hiddenTaskButton.addEventListener("click", () => {
                hideDoneTask();
            });
        };
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done && hiddenDoneTask ? "list__item--hidden" : ""
                }">
                    <button class="list__button list__button--toggleDone js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span  ${task.done ? "class=\"list__text--done\"" : ""}>
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let renderedButtons = "";

        if (tasks.length > 0) {
            renderedButtons += `
                <button class="section__button js-hideDoneTask">
                    ${hiddenDoneTask ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button 
                    class="section__button js-allDone"
                    ${tasks.every(({done}) => done) ? "disabled" : ""}
                >
                    Ukończ wszystkie
                </button>
              `;
        }

        document.querySelector(".js-buttons").innerHTML = renderedButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEventsRemoveButtons();
        bindEventsToogleDoneButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputField = document.querySelector(".js-newTask");
        const newTaskContent = inputField.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            inputField.value = "";
        }

        inputField.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}