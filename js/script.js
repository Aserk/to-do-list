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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="list__button list__button--done"></button>
                    ${task.content}
                    <button class="list__button list__button--remove"></button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}