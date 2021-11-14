
let countID = 0;
const ANY = 42;

const statusSet = {
    todo : 'To DO',
    indo : 'In Progress',
    done : 'Done'
}

const prioritySet = {
    low : 'low',
    hi : 'high'
}

const list = [ 
    { 
        id: ++countID,
        name: 'create a post', 
        status: statusSet.todo,
        priority: prioritySet.low  
    }, 
    { 
        id: ++countID,
        name: 'test', 
        status: statusSet.done, 
        priority: prioritySet.hi  
    } 
    ] 

    
function checkValidTask(taskName, status, priority) {
    let isValidTask = false;
    if (taskName === ANY) {
        isValidTask = true;
    } else {
        for (key in list) {
            if (taskName === list[key].name) {
                isValidTask = true;
                break;
            }
        }
    }

    let isValidStatus = false;
    if (status === ANY) {
        isValidStatus = true;
    } else {
        for (key in statusSet) {
            if (status === statusSet[key]) {
                isValidStatus = true;
                break;
            }
        }
    }

    let isValidPriority = false;
    if (priority === ANY) {
        isValidPriority = true;
    } else {
        for (key in prioritySet) {
            if (priority === prioritySet[key]) {
                isValidPriority = true;
                break;
            }
        }
    }

    let result = isValidTask && isValidStatus && isValidPriority;
    return result;
}

function addTask(taskName, priority) {
    let isValid = checkValidTask(ANY , ANY, priority);
    let isValidName = (typeof taskName === 'string');
    let isEmptyName = (taskName === '');

    if (!isValid || !isValidName || isEmptyName) {
        console.log('Invalid parameters of adding task');
        return;
    }

    let newTask = { 
        id: ++countID,
        name: taskName, 
        status: statusSet.todo,
        priority: priority  
    } 

    list.push(newTask);
    return;
}
    
function deleteTask(taskName) {
    let isValid = checkValidTask(taskName, ANY, ANY);
    if (!isValid) {
        console.log('Invalid parameters of task naming');
        return;
    }
    
    let sucsessDelete = false;
    for (key in list) {
        if (taskName === list[key].name) {
            list.splice(key, 1);
            sucsessDelete = true;
            break;
        }
    }

    if (!sucsessDelete) {
        console.log('No tasks with such name, do nothing');
    }
    return;
}

function changeStatus(taskName, status, priority) {
    let isValid = checkValidTask(taskName, status, priority);
  
    if (!isValid) {
        console.log('Invalid parameters of changing task');
        return;
    }
           
    let sucsessChange = false;
    for (key in list) {
        if (taskName === list[key].name) {
            list[key].name = taskName;
            list[key].status = status;
            list[key].priority = priority;
            sucsessChange = true;
            break;
        }
    }

    if (!sucsessChange) {
        console.log('No tasks with such name, do nothing');
    }
    return;
}

function showAllTasks() {
    console.log('The set of all tasks: \n');

    for (let key in list) {
        console.log(list[key]);
    }
 
    return;
}

function showList() {
        let isEmpty = true;
        console.log(`${statusSet.todo}: \n`);
        for (let key in list) {
            if (list[key].status === statusSet.todo) {
                console.log(`  "${list[key].name}" (${list[key].priority})`);
                isEmpty = false;
            }
        }
        if (isEmpty) {
            console.log('  -');
        }

        isEmpty = true;
        console.log(`${statusSet.indo}: \n`);
        for (let key in list) {
            if (list[key].status === statusSet.indo) {
                console.log(`  "${list[key].name}" (${list[key].priority})`);
                isEmpty = false;
            }
        }
        if (isEmpty) {
            console.log('  -');
        }

        isEmpty = true;
        console.log(`${statusSet.done}: \n`);
        for (let key in list) {
            if (list[key].status === statusSet.done) {
                console.log(`  "${list[key].name}" (${list[key].priority})`);
                isEmpty = false;
            }
        }
        if (isEmpty) {
            console.log('  -');
        }    
}


//   --------------    Tests    ---------------

showAllTasks();
addTask('to go streem', 'hi');
addTask('to go streem', 'high');
showAllTasks();
deleteTask('tes');
deleteTask(23);
deleteTask('test');
showAllTasks();
changeStatus('ururh', 'To DO', 'high');
changeStatus('ururh', 'To DO', 'hih');
addTask('', 'high');
changeStatus('create a post', 'Done', 'low');
showAllTasks();
showList();


