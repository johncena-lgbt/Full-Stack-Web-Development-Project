document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
          const taskId = event.target.getAttribute('data-task-id');
          deleteTask(taskId);
        }
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
          const taskId = event.target.getAttribute('data-task-id');
          deleteTask(taskId);
        }
      });
    
      function deleteTask(taskId) {  
        // Define the callback specifically for the delete operation
        const deleteCallback = (responseStatus, responseData) => {
          if (responseStatus === 200) {
            console.log("Task deleted:", responseData);
            // Optionally, remove the task element from DOM here
            // Or refresh the task list to reflect the deletion
          } else if (responseStatus === 401) {
            window.alert("Token expired, please login again");
            // Handle token expiration (e.g., redirect to login page)
          } else {
            console.error("Failed to delete task:", responseData);
            // Handle other errors
          }
      
          // Hide loading screen in all cases
          hideLoadingScreen();
      
          // Redirect to the task list page or refresh the task list
          window.location.href = "task.html";
        };
      
        // Call your custom fetch method for the DELETE request
        fetchMethod(`/api/task/${taskId}`, deleteCallback, 'DELETE', null, token);
      }
    
    
})