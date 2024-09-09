document.addEventListener('DOMContentLoaded', function () {
    const createTaskForm = document.getElementById('CreateTaskForm');
    const warningCard = document.getElementById('warningCard');
    const warningText = document.getElementById('warningText');
    const token = localStorage.getItem('token');


    createTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const points = document.getElementById('points').value;

        const data = {
            title: title,
            description: description,
            points: points
        };

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
                window.location.href = "task.html";
            }
        };

        fetchMethod(currentUrl + "/api/task", callback, "POST", data, token);
    });
});
