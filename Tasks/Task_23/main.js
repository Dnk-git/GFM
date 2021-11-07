
const list = {
    'create a task' : 'In Progress',
    'make a bed' : 'Done',
    'write a post' : 'To Do',

    changeStatus(task, status) {
        if (task in this) {
            this[task] = status;
        }
    },

    addTask(task) {
        this[task] = 'To Do';
    },
    
    deleteTask(task) {
        if (task in this) {
            delete this[task];
        }
    },

    showList() {
        let isEmpty = true;

        console.log('To Do:' + '\n');
        for (let key in this) {
            if (this[key] === 'To Do') {
                isEmpty = false;
                console.log(`  "${key}", `);
            }
        }
        if (isEmpty) {
            console.log('  -');
        }

        isEmpty = true;
        console.log('In Progress:' + '\n');
        for (let key in this) {
            if (this[key] === 'In Progress') {
                isEmpty = false;
                console.log(`  "${key}", `);
            }
        }
        if (isEmpty) {
            console.log('  -');
        }

        isEmpty = true;
        console.log('Done:' + '\n');
        for (let key in this) {
            if (this[key] === 'Done') {
                isEmpty = false;
                console.log(`  "${key}", `);
            }
        }
        if (isEmpty) {
            console.log('  -');
        }
    }
}


//   --------------    Tests    ---------------

list.changeStatus('write a post', 'Done');
list.addTask('have a walk');
list.showList();
console.log('\n');

list.deleteTask('have a walk');
list.addTask('go to shopping');
list.deleteTask('create a task');
list.showList();
console.log('\n');

list.changeStatus('write a post', 'Done');
list.changeStatus('go to shopping', 'Done');
list.deleteTask('make a bad');          //  invalid name of task
list.showList();
console.log('\n');

list.deleteTask('make a bed');
list.showList();
