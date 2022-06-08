
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = { //configuracion de nuestra app
        apiKey: "AIzaSyBNGcxVsf9FhfVHYFwaxfaazauf4t2_rFM",
        authDomain: "primer-proyecto-ad0df.firebaseapp.com",
        projectId: "primer-proyecto-ad0df",
        storageBucket: "primer-proyecto-ad0df.appspot.com",
        messagingSenderId: "414363574657",
        appId: "1:414363574657:web:590d3fee33ab7e1deec880"
      };

    // Initialize Firebase
    export const app = initializeApp(firebaseConfig); //se inicializa la app con los datos de la constante firebaseConfig
    export const db = getFirestore(app);
    export const querySnapshot = await getDocs(collection(db, "tasks"));

    
    
    function createCard(id, task) {
        
        //<div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
        const principalDiv = document.createElement('div');
        principalDiv.setAttribute("class", "card bg-info text-white mb-3 ");
        principalDiv.style = "max-width: 20rem;";
        principalDiv.setAttribute("name",id);

        //<div class="card-header">Formulario Tareas</div>
        const headerDiv = document.createElement('div');
        const contentDiv = document.createTextNode("Id: " + id);
        headerDiv.setAttribute("class", "card-header bg-secondary ");
        
        headerDiv.appendChild(contentDiv);
        principalDiv.appendChild(headerDiv);
        // <div class="card-body">
        const bodyDiv = document.createElement('div');
        const pTitle = document.createElement("p");
        const pTitleText = document.createTextNode("Title: " + task.title);
        const hr = document.createElement('hr');
        const pDesc = document.createElement("p");
        const pDescText = document.createTextNode("Description: " + task.description);

       
        
        pTitle.appendChild(pTitleText);
        bodyDiv.appendChild(pTitle);
        bodyDiv.appendChild(hr);
        pDesc.appendChild(pDescText);
        bodyDiv.appendChild(pDesc);
        bodyDiv.appendChild(hr);
        
        
        var input = document.createElement("input");
        input.type = "button";
        input.value = "Borrar Tarea";
        input.setAttribute("class","bg-danger rounded");
        input.setAttribute("name", "delete");
        input.setAttribute("id",id);
        bodyDiv.appendChild(input);

        //Para modificar los div creados en html, el div general contiene 2 divs, divTexto el que almacenan los P y div tareas el que almacena la tareas
        const divGeneral = document.getElementById("textytarea");
        divGeneral.style = "display: flex;"
        const divTexto = document.getElementById("text");
        divTexto.style = "display: flex;width: 50% "
        const divTareas = document.getElementById("tareas");
        divTareas.style = "display: flex;width: 50%; margin-left: 2rem"


        principalDiv.appendChild(bodyDiv);
        divTareas.appendChild(principalDiv);
        //document.body.appendChild(divTareas);
        const br = document.createElement("br");
        document.body.appendChild(br);



        //para crear botton update
        var input2 = document.createElement("input");
        input2.type = "button";
        input2.value = "Cargar Tarea";
        input2.setAttribute("class","bg-warning rounded");
        input2.setAttribute("name", "update");
        input2.setAttribute("id",id);
        bodyDiv.appendChild(input2);
        input2.style = "margin-left: 8.2rem";
        
    }
    
    

    export function getTasks() {
        querySnapshot.forEach((doc) => {
            createCard(doc.id, doc.data());
        });
    }
    function generateRandomIdTask(num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    export async function insertTask(task) {
        await setDoc(doc(db, "tasks", generateRandomIdTask(20)), task);
        alert("Insertada la tarea: "+task.title);
    }

    export async function deleteTask(id){
        await deleteDoc(doc(db, "tasks", id));   
        alert("Borrada la tarea: "+id);
    }

    let buttonInsert = document.getElementById("task-button");
    const form = document.getElementById("task-form");


    


    //recoremos las tareas para saber en cual hemos pinchado
    let buttonInsertar = document.getElementById("")

    export async function actualizarForm(idc) {
        querySnapshot.forEach((doc) => {
            //una vez localizada la tarea, vamoa s llamar la funcion actualizar
            if (doc.id == idc) {
            actualizar(doc.data());
            buttonInsert.name = idc;

            }
        });
        
    }

    //Se encarga de modificar el value de los inputs, para cargar los datos antiguos
    function actualizar(task) {
        form["task-title"].value = task.title;
        form["task-description"].value =  task.description;
        buttonInsert.value = "Actualizar tarea"
        buttonInsert.setAttribute("class","btn btn-lg btn-primary bg-warning");

    }



    //se encarga de actualizar la tarea
    export async function updateTask(idi, taski){
        await updateDoc(doc(db, "tasks", idi), taski); 
        alert("Actualizada la tarea: "+idi);
        location.reload();
    }


    

