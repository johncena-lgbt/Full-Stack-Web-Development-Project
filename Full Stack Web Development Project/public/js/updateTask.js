document.addEventListener('DOMContentLoaded', function(){
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();

    url = new URL(document.URL);
    const urlparams = url.searchParams;
    const task_id = urlparams.get('task_id');
    const taskContainer = document.getElementById('task')
    const taskForm = document.getElementById("taskForm");
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

        const task = responseData
        const displayItem = document.createElement('div')
        displayItem.className = "col-6 mt-4"
        displayItem.innerHTML = `
        <div class="card taskcard">
          <div class="card-body font-monospace">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">
              Task ID: ${task.task_id} <br>
              Title: ${task.title} <br>
              Description: ${task.description} <br>
              Points: ${task.points}
            </p>
          </div>    
        </div>
        `

        taskContainer.appendChild(displayItem)

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

    fetchMethod(currentUrl + `/api/task/${task_id}`, callback, "GET", null, token)

    function hideLoadingScreen() {
        loadingScreen.classList.add("d-none");
    }

    function showLoadingScreen() {
        loadingScreen.classList.remove("d-none");
    }

    taskForm.addEventListener("submit", function(event){
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const points = document.getElementById("points").value;

        const data = {
            title: title,
            description: description,
            points: points
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
                window.location.href = "task.html";
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        }

        fetchMethod(currentUrl + `/api/task/${task_id}`, callback, "PUT", data, token);
    })
    
})