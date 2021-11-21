
#23 Практика  - Обьекты


Сегодня напишем самый простой TODO лист без графического интерфейса.

Хранилищем будет объект, а имена задач - ключами. 

const list = {
 "create a task": "In Progress",
 "make a bed": "Done",
 "write a post": "To Do",
}

Функция changeStatus - будет менять статус задачи 

changeStatus("write a post", "Done")

Функция addTask - добавляет новую задачу

addTask('have a walk')

Функция deleteTask - удаляет задачу

deleteTask('have a walk')

Функция showList будет выводить весь список дел в виде 

Todo: 
 "create a task",
 "make a bed",
In Progress: 
 "write a post"
Done:
 -

Создайте список дел, добавьте в него пару задач, поменяйте их статусы
несколько раз и выведете результат в консоль

#29.2 TODO. Теперь уже по-настоящему

Согласитесь, после чтения статьи, вам стало очевидно что для задачи
с TODO вам нужен именно массив, а никак не объект?

При чем, еще интереснее будет иметь массив объектов, например такой:

const list = [ 
{ 
    id: 1,
    name: 'create a post', 
    status: 'TODO’, 
    priority: 'low'  
}, 
{ 
    id: 2,
    name: 'test', 
    status: 'Done', 
    priority: 'high'  
} 
] 

Вы знаете что делать :)


#29.3 TODO. Бонус

Только для самых крутых, которые еще 2 часа назад закончили TODO на массивах

Сделайте возможность выбирать группировку для вывода. Например 
showBy(‘priority’) - чтобы выводил по приоритетам 

high:
   test
   somethin else
low: 
    -

чтобы можно было вызывать showBy(‘priority’) или showBy(‘status’)
