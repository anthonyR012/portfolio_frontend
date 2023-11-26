import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";



const form = document.getElementById("contact-form");
var app = null
var database =null;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveFormData();
});

const firebaseConfig = {
  apiKey: "AIzaSyDuFuRXrTGpPubskNZCSIYiXJ02n49_q94",
  authDomain: "solid-clone-334117.firebaseapp.com",
  projectId: "solid-clone-334117",
  storageBucket: "solid-clone-334117.appspot.com",
  messagingSenderId: "815687967940",
  appId: "1:815687967940:web:6f886da8a9ea1cc06e9591"
};
app = initializeApp(firebaseConfig);
database = getFirestore(app);
// fetch('../firebaseConfig.json')
//   .then(response => response.json())
//   .then(data => {
    
//     var firebaseConfig = data;
//     app = initializeApp(firebaseConfig);
//     database = getFirestore(app);
//   })
//   .catch(error => {
//     console.error('Error al cargar el archivo:', error);
//   });

async function saveFormData() {
  let timerInterval
Swal.fire({
  title: 'Enviando mensaje',
  html: 'Por favor espere un momento :)',
  timer: 2000,
  timerProgressBar: true,
  didOpen:async () => {
    Swal.showLoading()

    const name = document.getElementById("form_name").value;
    const email = document.getElementById("form_email").value;
    const subject = document.getElementById("form_subject").value;
    const message = document.getElementById("form_message").value;
    if(name == "" || email == "" || subject == "" || message == "" || subject == "" ){
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        text: 'Complete todos los campos'
      })
      return;
    }
    // Create a data object
    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    await setDoc(doc(database, "messages", data.email), data);
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Mensaje enviando',
      showConfirmButton: false,
      timer: 1500
    });

    document.getElementById('form_name').value = '';
    document.getElementById('form_email').value = '';
    document.getElementById('form_subject').value = '';
    document.getElementById('form_message').value = '';
})
}
