document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();

    url = new URL(document.URL);
    const urlparams = url.searchParams;
    const messageId = urlparams.get('id');
    const postContainer = document.getElementById('post')
    const postForm = document.getElementById("postForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const token = localStorage.getItem('token');


    const callback = (responseStatus, responseData) => {
        console.log("responseStatus: ", responseStatus);
        console.log("responseData: ", responseData);

        if(responseStatus == 401){
            window.alert("Token expired, please login again")
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.click();
            }
            localStorage.removeItem('token'); 
        }

        const message = responseData
        const loggedInUser = localStorage.getItem('username'); // Retrieve the logged-in user's username
        if (message.username === loggedInUser) {
            postForm.style.display = "block"; // Show the form
        } else if(loggedInUser == "admin"){
            // Enable all functionalities for admin
            postForm.style.display = "block"; 
            document.querySelector('.btn-warning').disabled = false;
            document.querySelector('.btn-danger').disabled = false;
        }else {
            document.querySelector('.btn-warning').disabled = true;
            document.querySelector('.btn-danger').disabled = true;
            warningCard.classList.remove("d-none"); // Show a warning message
            warningText.innerText = "You are not authorized to edit this post.";
        }
        const displayItem = document.createElement('div')
        displayItem.className = "col-6 mt-4"
        displayItem.innerHTML = `
        <div class="post-card clickable-card"> <!-- No need for data attribute -->
            <div class="post-card-header">
                ${message.title}
            </div>
            <div class="post-card-body text-center font-monospace">
                <p>${message.messageText}</p>
            </div>
            <div class="post-card-footer">
                <p class="mt-2 ms-4 post-card-footer-text">Post was Created By: <strong>${message.username}</strong></p>
            </div>
        </div>
        `

        postContainer.appendChild(displayItem)

        // Calculate loading time and hide the loading screen
        let loadingEndTime = Date.now();
        let timeElapsed = loadingEndTime - loadingStartTime;
        const MIN_LOADING_TIME = 150; // Adjust the minimum loading time as needed

        if (timeElapsed < MIN_LOADING_TIME) {
        setTimeout(hideLoadingScreen, MIN_LOADING_TIME - timeElapsed);
        } else {
        hideLoadingScreen();
        }

    }

    fetchMethod(currentUrl + `/api/message/${messageId}`, callback, "GET", null, token)

    function hideLoadingScreen() {
        loadingScreen.classList.add("d-none");
    }


    postForm.addEventListener("submit", function(event){
        event.preventDefault();

        const username = localStorage.getItem('username');
        const title = document.getElementById("title").value;
        const message = document.getElementById("message").value;

        const data = {
            messageId:messageId,
            title: title,
            message_text: message,
            username: username
        }

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus: ", responseStatus);
            console.log("responseData: ", responseData);

            if(responseStatus == 401){
                window.alert("Token expired, please login again")
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.click();
                }
                localStorage.removeItem('token'); 
            }
            
            if (responseStatus == 200) {
                window.location.href = "posts.html";
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        }

        fetchMethod(currentUrl + `/api/message/${messageId}`, callback, "PUT", data, token);
    })


    document.getElementById('delete-button').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(messageId);
        }
    });

    function deletePost(id) {
        // Send a DELETE request to the backend using fetchMethod
        fetchMethod(`/api/message/${id}`, callback, 'DELETE', null, token);
        window.location.href = "posts.html";
    }
})