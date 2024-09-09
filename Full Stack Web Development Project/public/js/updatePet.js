document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();

    url = new URL(document.URL);
    const urlparams = url.searchParams;
    const pet_id = urlparams.get('pet_id');
    const pet = document.getElementById('pet')
    const createPetForm = document.getElementById("createPetForm");
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

        console.log(pet_id);

        const petshop = responseData[0]
        const displayItem = document.createElement('div')
        displayItem.className = "col-6 mt-0"
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
            </div>  
        </div>`

        pet.appendChild(displayItem)

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

    fetchMethod(currentUrl + `/api/petShop/${pet_id}`, callback, "GET", null, token)
    
    function hideLoadingScreen() {
        loadingScreen.classList.add("d-none");
    }

    createPetForm.addEventListener("submit", function(event){
        event.preventDefault();

        // Create a FormData object directly from the form
        const formData = new FormData(createPetForm);


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

            if(responseStatus == 200){
                window.alert("Pet updated successfully")
                window.location.href = "petShop.html";
            }else{
                warningCard.classList.remove("d-none");
                warningText.innerHTML = "Error updating pet, please try again";
            }
        }

        fetchMethod(currentUrl + `/api/petShop/${pet_id}`, callback, "PUT", formData, token)
    })

})