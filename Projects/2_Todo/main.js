
export const PRIORITY_HI = "hi";
export const PRIORITY_LO = "lo";
const prioritySet = [PRIORITY_HI, PRIORITY_LO];
export let countID = 0; 

import { UI_ELEMENTS } from "./view.js";

export function addTask(priority, task = ''){

    let isValidParameters = prioritySet.includes(priority);
    if (!task) isValidParameters = false;
    if (!isValidParameters) return;

    let newElement = document.createElement('div');
    newElement.className = "hi_task task_items";

    if (priority == PRIORITY_HI){
        UI_ELEMENTS.HI_ZONE_TASK.append(newElement);
    } else {
        UI_ELEMENTS.LO_ZONE_TASK.append(newElement);
    }

    countID++;
    let item = undefined;

    item = document.createElement('input');
    item.type = "checkbox";
    item.className = "check_box";
    item.id = countID.toString();
    newElement.append(item);

    item = document.createElement('label');
    item.innerHTML = task;
    item.htmlFor = countID.toString();
    newElement.append(item);

    item = document.createElement('input');
    item.className = "close_task_icon";
    item.type = "image";
    item.src = "./img/close.svg";
    item.addEventListener("click", deleteTask);
    newElement.append(item);    
}

function deleteTask(event){
    let removeElement = event.target.parentElement;
    removeElement.remove();
}

function createNewTask(priority){
    const isValidPriority = prioritySet.includes(priority);
    if (!isValidPriority) return;

    let elem;
    let taskZone;
    if (priority == PRIORITY_HI) {
        elem = UI_ELEMENTS.HI_INPUT;
        taskZone = PRIORITY_HI;
    } else {
        elem = UI_ELEMENTS.LO_INPUT;
        taskZone = PRIORITY_LO;
    }

    let task = elem.value.trim();
    if (!task) return;

    addTask(taskZone, task);
}


let elem = UI_ELEMENTS.HI_INPUT;
elem.onfocus = () => { elem.value = "" }
elem.addEventListener("change", () => {
    createNewTask(PRIORITY_HI);
    elem.value = "";
});

elem = UI_ELEMENTS.LO_INPUT;
elem.onfocus = () => { elem.value = "" }
elem.addEventListener("change", () => {
    createNewTask(PRIORITY_LO);
    elem.value = "";
});

UI_ELEMENTS.HI_INPUT_ADD_ICON.addEventListener("click", () => createNewTask(PRIORITY_HI));
UI_ELEMENTS.LO_INPUT_ADD_ICON.addEventListener("click", () => createNewTask(PRIORITY_LO));
