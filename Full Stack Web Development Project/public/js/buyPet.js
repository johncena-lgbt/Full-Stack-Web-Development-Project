document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    let loadingStartTime = Date.now();

    url = new URL(document.URL);
    const urlparams = url.searchParams;
    const pet_id = urlparams.get('pet_id');
    const pet = document.getElementById('pet')
    const buyPetForm = document.getElementById("buyPetForm");
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

        const petshop = responseData[0]
        const displayItem = document.createElement('div')
        displayItem.className = "col-12 mt-4"
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
        </div>
        `

        let loadingEndTime = Date.now();
        let timeElapsed = loadingEndTime - loadingStartTime;
        const MIN_LOADING_TIME = 1000; // Adjust the minimum loading time as needed

        if (timeElapsed < MIN_LOADING_TIME) {
            setTimeout(hideLoadingScreen, MIN_LOADING_TIME - timeElapsed);
        } else {
            hideLoadingScreen();
        }

        pet.appendChild(displayItem)
    }

    fetchMethod(currentUrl + `/api/petShop/${pet_id}`, callback, "GET", null, token)

    function hideLoadingScreen() {
        loadingScreen.classList.add("d-none");
    }

    buyPetForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const user_id = localStorage.getItem('userId');
        const pet_id = urlparams.get('pet_id');
        const purchase_date = document.getElementById('purchase_date').value;
        const data = {
            user_id: user_id,
            pet_id: pet_id,
            purchase_date: purchase_date
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

            if (responseStatus == 201) {
                window.alert("Pet purchased successfully!")
                window.location.href = "petShop.html";
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerHTML = responseData.message;
            }
        }

        fetchMethod(currentUrl + "/api/petShopProgress", callback, "POST", data, token)
    })
})