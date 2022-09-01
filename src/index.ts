const btn = document.getElementById('submit')! as HTMLButtonElement;
const input = document.getElementById('listInput')! as HTMLInputElement;
const form = document.getElementById('listForm')!;
const list = document.getElementById('listView')!;


interface toDo {
    text: string,
    completed: boolean
}

const toDos: toDo[] = readTodos();
toDos.forEach(createNewTodo);


function saveTodos(): void{
    localStorage.setItem('toDos', JSON.stringify(toDos));
}


function readTodos(): toDo[] {
    const todosJSON = localStorage.getItem('toDos');
    if(todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}


function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const toDo: toDo = {
        text: input.value,
        completed: false,
    };
    createNewTodo(toDo);
    toDos.push(toDo);


    saveTodos();

    input.value =''; 
}


function createNewTodo(newToDo: toDo){
    const newListItem = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = newToDo.completed; 
    checkBox.addEventListener("change", function() {
        newToDo.completed = checkBox.checked; 
        saveTodos();
    })
    newListItem.append(newToDo.text);
    newListItem.append(checkBox);
    list.append(newListItem);
}


form.addEventListener("submit", handleSubmit); 

