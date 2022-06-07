
    //Me traigo mi db firestore
    import { getTasks, insertTask, deleteTask, updateTask} from "./utils.js";
    //console.log(db);
    //Extraigo todos los documentos de tasks y creo tarjetas con ellos
    getTasks();


    //Obtenemos el form y capturamos el submit
    const form = document.getElementById("task-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const task = {
            title: form["task-title"].value,
            description: form["task-description"].value
        }

        insertTask(task);
    })


    const buttonsCardD = document.getElementsByName("delete");
    //console.log(buttonsCardD)
    buttonsCardD.forEach(element => {
        element.addEventListener("click",  () => {
            var divDelete = element.parentNode.parentNode;
            document.body.removeChild(divDelete);
            //console.log("Estoy borrando la tarea: "+element.id);
            deleteTask(element.id);
        })
    });

 


    const buttonsCardA = document.getElementsByName("update");
    //console.log(buttonsCardA)
    buttonsCardA.forEach(element => {
        element.addEventListener("click",  () => {
            
            //title = document
            //descripcion =
            const task = {
                title: form["task-title"].value,
                description: form["task-description"].value
            } 
            //console.log(task);
            //updateTask(task, id);
            updateTask(element.id, task);
        })
    });




    //Crear botton actualizar
    //Insertar funcion de actualizar las tareas
    //parecido al insert y delete
    //https://firebase.google.com/docs/firestore/manage-data/add-data

    //agregar botton de actualizacion al lado de borrar, llevarse los datos introducidos y actualizar la tarrea