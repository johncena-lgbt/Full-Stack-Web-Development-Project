document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('taskList');
  const loadingScreen = document.getElementById('loadingScreen');
  const createTaskButton = document.getElementById('create-task-button');
  let loadingStartTime = Date.now();
  const token = localStorage.getItem('token');
  
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus: ", responseStatus);
    console.log("responseData: ", responseData);

    if (responseStatus === 401) {
      window.alert("Token expired, please login again")
      const logoutButton = document.getElementById('logoutButton');
      if (logoutButton) {
        logoutButton.click();
      }
      localStorage.removeItem('token');
    }

    // Check if responseData is an array
    if (Array.isArray(responseData)) {
      responseData.forEach(task => {
        const displayItem = document.createElement('div');
        displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card taskcard">
            <div class="card-body font-monospace">
              <h5 class="card-title">${task.title}</h5>
              <p class="card-text">
                Description: ${task.description} <br>
                Points: ${task.points}
              </p>
              <div class="d-flex flex-row">
              ${isAdmin() ? `
                <a href="updateTask.html?task_id=${task.task_id}" class="btn text-bg-warning btn-small navbar-btn me-2 col-6">Update task</a>
                <button class="btn text-bg-danger btn-small navbar-btn col-6 delete-button" data-task-id="${task.task_id}"><strong>Delete</strong></button>
              ` : `<a href="taskProgress.html?task_id=${task.task_id}" class="btn text-bg-warning btn-small navbar-btn me-2 col-6">Complete Task</a>`}
              </div>                    
            </div>    
          </div>
        `;
        taskList.appendChild(displayItem);
      });
    }

    // Calculate loading time and hide the loading screen
    let loadingEndTime = Date.now();
    let timeElapsed = loadingEndTime - loadingStartTime;
    const MIN_LOADING_TIME = 1000; // Adjust the minimum loading time as needed

    if (timeElapsed < MIN_LOADING_TIME) {
      setTimeout(hideLoadingScreen, MIN_LOADING_TIME - timeElapsed);
    } else {
      hideLoadingScreen();
    }
  };

  function isAdmin() {
    const username = localStorage.getItem('username');
    if(username === 'admin') {
      return true;
    }
  }

  if (isAdmin()) {
    createTaskButton.classList.remove('d-none') // Show the button
  } else {
    createTaskButton.classList.add("d-none") // Hide the button
  }


  console.log("Show all tasks");
  fetchMethod(currentUrl + "/api/task", callback, 'GET', null, token);

  function hideLoadingScreen() {
    loadingScreen.classList.add("d-none");
  }

  function showLoadingScreen() {
    loadingScreen.classList.remove("d-none");
  }


  // Attach event listener to the task list container
  taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
      const taskId = event.target.getAttribute('data-task-id');
      deleteTask(taskId);
    }
  });

  function deleteTask(taskId) {
    // Send a DELETE request to the backend using fetchMethod
    fetchMethod(`/api/task/${taskId}`, callback, 'DELETE', null, token);

    window.location.href = "task.html";
  }
});
