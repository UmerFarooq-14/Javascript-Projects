import { collection, addDoc, query, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { db } from "./firebase.js";

const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const task = document.getElementById("task");
const status = document.getElementById("status");
const isCheck = document.getElementById("isCheck");
const dateEl = document.getElementById("date");

const date = new Date()
dateEl.innerHTML = date.toLocaleDateString()

const deleteTodo = async (id) => {
    try {
        await deleteDoc(doc(db, "todos", id));
    } catch (error) {
        console.log(error.message)
    }
}

const myCheck = async (id, currenstatus) => {
    try {
        const collectionRef = doc(db, "todos", id);
        await updateDoc(collectionRef, {
            status: currenstatus === "completed" ? "pending" : "completed"
        });
    } catch (error) {
        console.log(error)
    }
}

let editId = null;

const editTodo = async (id, oldValue) => {
    input.value = oldValue;
    addBtn.innerText = "Update Todo";
    editId = id;
}

const renderTodo = () => {
    const q = query(collection(db, "todos"));
    onSnapshot(q, (querySnapshot) => {
        task.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            const id = doc.id;
            // const statusColor = data.status === "completed" ? "#22c55e" : "#f97316";
            const ischecked = data.status === "compeleted" ? "checked" : "";

            task.innerHTML += `
                    <div class="list">
                        <div class="leftItem">
                            <input type="checkbox" ${ischecked} onclick="myCheck('${id}','${data.status}')" id="isCheck">
                            <h3 id="task">${data.todo}</h3>
                        </div>
                        <div class="rightItem">
                            <div class="status" >
                                ${data.status}
                            </div>
                            <div class="icons">
                                <button onclick="editTodo('${id}','${data.todo}')"> <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                                    </svg></button>
                                <button id="delete-btn" onclick="deleteTodo('${id}')">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10zm3-6h2l1 2h-4l1-2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
            `;
        });
    });

}

renderTodo()

const addtodo = async () => {
    try {
        if (editId) {
            const collectionRef = doc(db, "todos", editId);
            await updateDoc(collectionRef, {
                todo: input.value,
            });
            editId = null;
            addBtn.innerText = "Add Todo"
        } else if (input.value === "") {
            alert("Add value first")
        }
        else {
            const docRef = await addDoc(collection(db, "todos"), {
                todo: input.value,
                status: "pending"
            });
        }
    } catch (error) {
        console.log(error.message)
    }
    input.value = ""
}

addBtn.addEventListener("click", addtodo);
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.myCheck = myCheck;

window.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Enter") {
        addtodo()
    }
})