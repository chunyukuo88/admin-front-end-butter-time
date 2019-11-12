module.exports = {

    // render(child, parent) {
    //     parent.append(child);
    // },

    createButtons() {

        const wrapper = document.querySelector(".wrapper");
        var buttons = ['Artists', 'Albums', 'Songs'];

        buttons.forEach(function (button) {
            console.log(button);
            const buttonElement = document.createElement("button");
            buttonElement.innerHTML = button;
            buttonElement.classList.add("nav-button");
            buttonElement.classList.add(button.toLowerCase + "-button");
            wrapper.append(buttonElement);
        })       

    }

}