
//Me traigo mi db firestore
import { getTasks, insertTask, deleteTask, updateTask, actualizarForm } from "./utils.js";
//console.log(db);
//Extraigo todos los documentos de tasks y creo tarjetas con ellos
getTasks();

let buttonInsert = document.getElementById("task-button");


//Obtenemos el form y capturamos el submit
//Al pulsar el boton del formulario, se comprueba el valor de dicho boton
const form = document.getElementById("task-form");
form.addEventListener("submit", e => {
    e.preventDefault();

    //se realiza la funcion de actualizar
    if (buttonInsert.value == "Actualizar tarea") {
        //console.log("Se tiene que actualizar")
                const task = {
                    title: form["task-title"].value,
                    description: form["task-description"].value
                }
                updateTask(buttonInsert.name, task);
    }


    //se realiza la funcion de crear tarea
    if (buttonInsert.value == "Enviar Tarea") {
        //console.log("Se tiene que crear")
        const task = {
            title: form["task-title"].value,
            description: form["task-description"].value
        }
        insertTask(task);
    }
})


const buttonsCardD = document.getElementsByName("delete");
//console.log(buttonsCardD)
buttonsCardD.forEach(element => {
    element.addEventListener("click", () => {
        var divDelete = element.parentNode.parentNode;
        var padre = document.getElementById("tareas")
        padre.removeChild(divDelete);

        deleteTask(element.id);
    })
});


//cuando queremos actualizar una tarea, se cargan los tados antiguos en el formulario
const buttonsCardA = document.getElementsByName("update");
buttonsCardA.forEach(element => {
    element.addEventListener("click", () => {
        actualizarForm(element.id);
    })
});
