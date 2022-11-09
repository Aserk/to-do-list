{
    const tasks = [
        {
            content: "zjeść obiad",
            done: false,
        },
        {
            content: "pobiegać",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="list__button list__button--done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span  ${task.done ? "class=\"list__text--throughLine\"" : ""}>
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}