const elements = require("./elements");
const wrapper = document.querySelector(".wrapper");

const createdElement = document.createElement("H2");
createdElement.innerHTML = "Butter Records";
createdElement.classList.add("page-header");
wrapper.append(createdElement);

elements.createButtons();

const textSpace = document.createElement("p");
textSpace.innerHTML = "Welcome!";
textSpace.classList.add("page-title");
wrapper.append(textSpace);

const contentContainerWrapper = document.createElement("section");
contentContainerWrapper.classList.add("content-container-wrapper");
wrapper.append(contentContainerWrapper);

const contentContainer = document.createElement("section");
contentContainer.classList.add("content-container");
contentContainerWrapper.append(contentContainer);

const formContainer = document.createElement("section");
formContainer.classList.add("form-container");
contentContainerWrapper.append(formContainer);



