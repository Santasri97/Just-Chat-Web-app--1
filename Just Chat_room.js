const firebaseConfig = {
      apiKey: "AIzaSyCWkC2ZiaVTNZTYpX8fSIgvE_WKb9K9QsE",
      authDomain: "just-chat-website.firebaseapp.com",
      databaseURL: "https://just-chat-website-default-rtdb.firebaseio.com",
      projectId: "just-chat-website",
      storageBucket: "just-chat-website.appspot.com",
      messagingSenderId: "298460120357",
      appId: "1:298460120357:web:0e62b48f1edcb92e3f06cc",
      measurementId: "G-66ST7X5F7X"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("Username");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + " ! 👍";

function Room() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child("room_name").update({
            purpose: "adding room name "
      });

      localStorage.setItem("room_name", room_name);
      window.location = "Just_Chat_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room name" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick = 'redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "Just_Chat_page.html";
}

function Logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}