document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();

    const userProfile = document.getElementById('account-general');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('userId');

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
            return
        }

        const user = responseData
        const displayItem = document.createElement('div')
        displayItem.className="col-12"
        displayItem.innerHTML = `
        <div class="card-body media align-items-center">
            <img src="${user.profile_image}" alt
                class="d-block ui-w-80 profile-image">
            <div class="media-body ml-4 mt-3">
                <form id="changeProfileImage" enctype="multipart/form-data">
                    <div class="form-group mb-4">
                        <label for="username">Profile Picture</label>
                        <input type="file" class="form-control" id="profilePicture" name="profile_image" required>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="btn btn-primary">Update</button>&nbsp;
                        <button type="reset" class="btn btn-default">Cancel</button>
                    </div> 
                </form>
            </div>
        </div>
        <div class="card-body">
            <form id="changeUserDetailsForm">
                <div class="form-group mb-4">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" value="${user.username}">
                </div>
                <div class="form-group mb-4">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" value="${user.email}" required>
                </div>
                <div class="text-right mt-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>&nbsp;
                    <button type="reset" class="btn btn-default">Cancel</button>
                </div> 
                <div id="warningCard" class="card border-danger mb-3 d-none">
                    <div class="card-body text-danger">
                        <p id="warningText" class="card-text"></p>
                    </div>
                </div>
                <div id="successCard" class="card border-success mb-3 d-none">
                    <div class="card-body text-success">
                        <p id="successText" class="card-text"></p>
                    </div>
                </div>
            </form>
            <div class="card-body" style="padding-left:0">
                <strong>Total points</strong>: ${user.total_points}
            </div>
        </div>
        `
        userProfile.appendChild(displayItem)

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

    fetchMethod(currentUrl + `/api/user/${user_id}`, callback, "GET", null, token)

    function hideLoadingScreen() {
        loadingScreen.classList.add("d-none");
    }

    changePasswordForm.addEventListener('submit', function(event){
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        

        const data = {
            old_password: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }

        if (newPassword !== confirmPassword) {
            window.alert("New password and confirm password do not match");
            return;
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
                return
            }

            if (responseStatus !== 200) {
                window.alert(responseData.message);
            } else {
                window.alert("Password changed successfully");
                changePasswordForm.reset();
            }
        }

        fetchMethod(currentUrl + "/api/user/changePassword", callback, "PUT", data, token);
    })

    setTimeout(function(){
        const changeUserDetailsForm = document.getElementById('changeUserDetailsForm');

        changeUserDetailsForm.addEventListener('submit', function(event){
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
    
            const data = {
                username: username,
                email: email
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
                    return
                }
    
                if (responseStatus !== 200) {
                    successCard.classList.add("d-none");
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                } else {
                    window.alert("User details changed successfully");
                }
            }
    
            fetchMethod(currentUrl + `/api/user/${user_id}`, callback, "PUT", data, token);
            
        })
    
    }, 1000)

    setTimeout(function(){
        const changeProfileImage = document.getElementById('changeProfileImage');

        changeProfileImage.addEventListener('submit', function(event){
            event.preventDefault();

            const profilePicture = document.getElementById('profilePicture').files[0];
            const formData = new FormData();
            formData.append('profile_image', profilePicture);

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

                if (responseStatus !== 200) {
                    successCard.classList.add("d-none");
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                } else {
                    window.alert("Profile image updated successfully");
                    window.location.reload();
                }
            }

            fetchMethod(currentUrl + `/api/user/profileImage/${user_id}`, callback, "PUT", formData, token);
        })
    },1000)

    setTimeout(function(){
        const pet = document.getElementById('pet');
        const pet_list = document.getElementById('pet_list');

        const petCallback = (responseStatus, responseData) => {
            console.log("responseStatus: ", responseStatus);
            console.log("responseData: ", responseData);
    
            if(responseStatus == 401){
                window.alert("Token expired, please login again")
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.click();
                }
                localStorage.removeItem('token'); 
                return
            }
    
            responseData.forEach(pet => {
                const displayItem = document.createElement('div');
                displayItem.className = "col-3";
                displayItem.innerHTML = `
                <div class="card taskcard mt-3 mb-3">
                    <div class="card-body font-monospace">
                        <img src="${pet.pet_image}" alt="Image" class="img-fluid img-fluid1 about-img">
                        <h5 class="card-title text-center mt-3 text-success"><strong>${pet.pet_name}</strong></h5>                                   
                    </div>    
                </div>    
                `
                pet_list.appendChild(displayItem);
            })
        }
    
        fetchMethod(currentUrl + `/api/user/${user_id}/pets`, petCallback, "GET", null, token)    
    }, 1000)


    setTimeout(function(){
        const task_list = document.getElementById('task_list');

        const taskCallback = (responseStatus, responseData) => {
            console.log("responseStatus: ", responseStatus);
            console.log("responseData: ", responseData);

            if(responseStatus == 401){
                window.alert("Token expired, please login again")
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.click();
                }
                localStorage.removeItem('token'); 
                return
            }

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
                    </div>    
                  </div>
                `;
                task_list.appendChild(displayItem);
            })
        }

        fetchMethod(currentUrl + `/api/user/${user_id}/tasks`, taskCallback, "GET", null, token)
    },1000)

})