document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('messageList');
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();
    const token = localStorage.getItem('token');

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus: ", responseStatus);
        console.log("responseData: ", responseData);

        if (responseStatus === 401) {
            window.alert("Token expired, please login again");
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.click();
            }
            localStorage.removeItem('token');
        }

        responseData.forEach(message => {
            const displayItem = document.createElement('div');
            displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
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
            `;

            messageList.appendChild(displayItem);

            // Add click event listener to the created card
            displayItem.addEventListener("click", function () {
                // Retrieve the message ID from the message object
                const messageId = message.id;
                window.location.href = `managePost.html?id=${messageId}`
            });
        });

        let loadingEndTime = Date.now();
        let timeElapsed = loadingEndTime - loadingStartTime;
        const MIN_LOADING_TIME = 1000; // Adjust the minimum loading time as needed

        if (timeElapsed < MIN_LOADING_TIME) {
            setTimeout(hideLoadingScreen, MIN_LOADING_TIME - timeElapsed);
        } else {
            hideLoadingScreen();
        }
    }

    console.log("Show all messages");
    fetchMethod(currentUrl + "/api/message", callback, 'GET', null, token);
  
    function hideLoadingScreen() {
      loadingScreen.classList.add("d-none");
    }
});
