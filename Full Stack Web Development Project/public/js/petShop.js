document.addEventListener('DOMContentLoaded', function () {
    const pets = document.getElementById('pets');
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

        if (Array.isArray(responseData)) {
            responseData.forEach(petshop =>{
                const displayItem = document.createElement('div');
                displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
                displayItem.innerHTML = `
                <div class="card taskcard">
                    <div class="card-body font-monospace">
                        <img src="${petshop.pet_image}" alt="Image" class="img-fluid img-fluid1 about-img">
                        <h5 class="card-title text-center mt-3 text-success"><strong>${petshop.pet_name}</strong></h5>
                        <p class="taskcard-text">
                            Description: ${petshop.pet_description}
                        </p>
                        <p class="taskcard-text text-center text-info">
                            <strong>Price: ${petshop.pet_price} points</strong>
                        </p>
                        ${isAdmin() ? `
                        <div class="d-flex flex-row">
                        <a href="updatePet.html?pet_id=${petshop.pet_id}" class="btn text-bg-warning btn-small navbar-btn me-2 col-6">Update Pet</a>
                        <button class="btn text-bg-danger btn-small navbar-btn col-6 delete-button" data-pet-id="${petshop.pet_id}"><strong>Delete</strong></button>
                        ` : `<a href="buyPet.html?pet_id=${petshop.pet_id}" class="btn text-bg-success btn-small navbar-btn me-2 col-12 "><strong>Buy now!</strong></a>`}
                        </div>
                    </div>    
                </div>
                `
                pets.appendChild(displayItem);
            })
        }

        let loadingEndTime = Date.now();
        let timeElapsed = loadingEndTime - loadingStartTime;
        const MIN_LOADING_TIME = 1000; // Adjust the minimum loading time as needed

        if (timeElapsed < MIN_LOADING_TIME) {
            setTimeout(hideLoadingScreen, MIN_LOADING_TIME - timeElapsed);
        } else {
            hideLoadingScreen();
        }

    }

    if(isAdmin()){
        createTaskButton.classList.remove("d-none");
    }else{
        createTaskButton.classList.add("d-none");
    }

    function isAdmin() {
        const username = localStorage.getItem('username');
        if(username === 'admin') {
          return true;
        }
    }

    fetchMethod(currentUrl + "/api/petShop", callback, 'GET', null, token);
  
    function hideLoadingScreen() {
      loadingScreen.classList.add("d-none");
    }

    // Attach event listener to the task list container
    pets.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
        const taskId = event.target.getAttribute('data-pet-id');
        deleteTask(taskId);
        }
    });

    function deleteTask(pet_id) {
        // Send a DELETE request to the backend using fetchMethod
        fetchMethod(`/api/petShop/${pet_id}`, callback, 'DELETE', null, token);
        window.alert("Pet deleted successfully");
        window.location.href = "petShop.html";
    }

})