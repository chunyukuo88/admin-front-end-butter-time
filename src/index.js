import { create } from "domain";

const render = function(element) {
const createdElement = document.createElement("H1");
createdElement.innerHTML ="Butter Records";
element.append(createdElement);
const button= document.createElement("button");
button.innerHTML ="Albums";
element.append(button);
}

render(document.querySelector('#app'));

