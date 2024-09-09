document.addEventListener('DOMContentLoaded', function () {
    const createPostForm = document.getElementById('CreatePostForm');
    const warningCard = document.getElementById('warningCard');
    const warningText = document.getElementById('warningText');
    const token = localStorage.getItem('token');

    createPostForm.addEventListener('submit', function(event){
        event.preventDefault();

        // Log the username to check if it's retrieved correctly
        const username = localStorage.getItem('username');
        console.log('Username:', username);

        const title = document.getElementById('title').value;
        const message_text = document.getElementById('message_text').value;

        const data = {
            title: title,
            message_text: message_text,
            username: username
        }

        const callback = (responseStatus, responseData) => {
            console.log("Response Status: ", responseStatus);
            console.log("Response Data: ", responseData);

            if(responseStatus == 401){
                window.alert("Token expired, please login again")
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.click();
                }
                localStorage.removeItem('token'); 
            }

            if (responseStatus !== 201) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            } else {
                window.alert("Task created successfully");
                // Redirect to another page (task.html) after successful creation
                window.location.href = "posts.html";
            }
        }

        fetchMethod(currentUrl + "/api/message", callback, "POST", data, token);
    })
})
