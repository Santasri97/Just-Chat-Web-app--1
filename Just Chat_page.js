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
//YOUR FIREBASE LINKS
user_name = localStorage.getItem("Username");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("data").value;
      firebase.database().ref(room_name).push({
            names: user_name,
            message: msg,
            like: 0
      });

      document.getElementById("data").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("Message").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        names = message_data["names"];
                        message = message_data["message"];
                        like = message_data["like"];
                        S1 = "<h4>" + names + "<img class='user_tick' src='tick.png'></h4>";
                        S2 = "<h4 class = 'message_h4'>" + message + "</h4>";
                        S3 = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick= 'updateLike(this.id)'>";
                        S4 = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button><hr>";

                        Orange = S1 + S2 + S3 + S4;
                        document.getElementById("Message").innerHTML += Orange;
                        //End code
                  }
            });
      });
}
getData();

function Logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function updateLike(message_id) {
      T1 = message_id;
      likes = document.getElementById(T1).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update(
            { like: updated_likes });
}