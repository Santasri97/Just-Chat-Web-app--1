function login() {
    user_name = document.getElementById("Username").value;
    localStorage.setItem("Username", user_name);
    window.location = " Just Chat_room.html";
}