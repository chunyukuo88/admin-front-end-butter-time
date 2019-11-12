const elements = require("./elements");
const wrapper = document.querySelector(".wrapper");

const createdElement = document.createElement("H2");
createdElement.innerHTML = "Butter Records";
createdElement.classList.add("page-header");
wrapper.append(createdElement);

elements.createButtons();

const textSpace = document.createElement("p");
textSpace.innerHTML = "Plz cleck teh boton";
textSpace.classList.add("page-title");
wrapper.append(textSpace);

const contentContainer = document.createElement("section");
contentContainer.classList.add("content-container");
wrapper.append(contentContainer);

