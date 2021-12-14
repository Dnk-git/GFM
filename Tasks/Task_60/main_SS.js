let countID = 0;

const taskItem = {
    ID: null,
    name: '',
    priority: '',
    status: '',
}
let taskSet = [];

const prioritySet = {
    HI: 'high',
    MD: 'middle',
    LO: 'low',
}

const statusSet = {
    TODO: 'To-Do',
    INDO: 'Processing',
    DONE: 'Done',
}

function addTaskToSet(name, priority, status){
    let task = JSON.parse(JSON.stringify(taskItem));
    countID++
    task.ID = countID;
    task.name = name;
    task.priority = priority;
    task.status = status;
    taskSet.push(task);
}

function clearSessionStore(){
    sessionStorage.clear();
}

function initTaskSet(){
    addTaskToSet('Сделать задание с LocalStorage', prioritySet.HI, statusSet.TODO);
    addTaskToSet('Повторить Try-Catch-Finally', prioritySet.MD, statusSet.TODO);
    addTaskToSet('Порефаторить Vertical String - Task N...?', prioritySet.LO, statusSet.TODO);
}

function saveTasksToSessionStore(){
    clearSessionStore();

    let key = 0;
    let item = '';
    taskSet.forEach(element => {
        key++;
        item = JSON.stringify(element);
        sessionStorage.setItem(key.toString(), item);
    });
}

function restoreTasksFromSessionStore(){
    taskSet.length = 0;
    
    let key = undefined;
    const lengthStore = sessionStorage.length;
    for (let i=0; i<lengthStore; i++){
        key = sessionStorage.key(i);
        let item = JSON.parse(sessionStorage.getItem(key));
        console.log('Item of array: ' + item);
        taskSet.push(item);
    }    
}

function sortTaskSetByID(){
    console.log('Before Sorting...');
    console.dir(taskSet);

    taskSet = taskSet.sort( (a, b) => (+a.ID - +b.ID) );
    console.log('After Sorting...');
    console.dir(taskSet);
} 


initTaskSet();
console.dir(taskSet);
saveTasksToSessionStore();
console.dir(taskSet);
restoreTasksFromSessionStore();
console.dir(taskSet);
sortTaskSetByID();
console.dir(taskSet);



