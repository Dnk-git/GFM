
let countID = 0;
const ANY = 42;

const   TODO = 'To DO',
        INDO = 'In Progress',
        DONE = 'Done';

const   statusSet = [TODO, INDO, DONE];

const   LOW = 'low',
        HI = 'high';
        
const   prioritySet = [LOW, HI];

const list = [ 
    { 
        id: ++countID,
        name: 'create a post', 
        status: TODO,
        priority: LOW  
    }, 
    { 
        id: ++countID,
        name: 'test', 
        status: DONE, 
        priority: HI  
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
        isValidStatus = statusSet.includes(status);
    }

    let isValidPriority = false;
    if (priority === ANY) {
        isValidPriority = true;
    } else {
        isValidPriority = prioritySet.includes(priority);
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
        status: TODO,
        priority: priority  
    } 

    list.push(newTask);
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
}

                    // Just testing function
function showAllTasks() {
    console.log('The set of all tasks: ');

    for (let key in list) {
        console.log(list[key]);
    }
}
                    // ---

function showList() {
    for (let key in statusSet) {
        let status = statusSet[key];
        console.log(`${status}:`);
       
        let isEmpty = true;
        list.filter( (item) => item.status === status )
            .forEach( (item) => {
                isEmpty = false;
                console.log(`  ${item.name}`);
            }); 

        if (isEmpty) {
            console.log('  -');
        }
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


