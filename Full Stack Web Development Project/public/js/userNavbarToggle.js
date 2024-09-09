document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const noToken = document.querySelectorAll(".no-token")
    const registerBtn = document.querySelectorAll(".registerBtn")
    const usernamePlaceholder = document.getElementById("usernamePlaceholder");

    //Check if the user is logged in
    const token = localStorage.getItem('token');
    if(token){
        //User is logged in
        loginButton.classList.add("d-none");
        registerButton.classList.add("d-none");
        profileButton.classList.remove("d-none");
        logoutButton.classList.remove("d-none");
        noToken.forEach(element => {
            element.classList.remove("d-none")
        });
        registerBtn.forEach(element => {
            element.classList.add("d-none")
        });
        usernamePlaceholder.innerText = localStorage.getItem("username");
    }else{
        //User is not logged in
        loginButton.classList.remove("d-none");
        registerButton.classList.remove("d-none");
        profileButton.classList.add("d-none");
        logoutButton.classList.add("d-none");
        noToken.forEach(element => {
            element.classList.add("d-none")
        });
    
    }

    logoutButton.addEventListener("click", function () {
        // Remove the token from local storage and redirect to index.html
        localStorage.removeItem("token");
        window.location.href = "home.html";
    });
})