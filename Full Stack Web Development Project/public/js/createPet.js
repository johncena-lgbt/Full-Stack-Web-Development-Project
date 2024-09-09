document.addEventListener('DOMContentLoaded', function () {
    const createPetForm = document.getElementById('CreatePetForm');
    const warningCard = document.getElementById('warningCard');
    const warningText = document.getElementById('warningText');
    const token = localStorage.getItem('token');

    createPetForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Create a FormData object directly from the form
        const formData = new FormData(createPetForm);

        console.log(formData.get('pet_image'));

        const callback = (responseStatus, responseData) => {
            console.log("Response Status: ", responseStatus);
            console.log("Response Data: ", responseData);

            if (responseStatus === 401) {
                window.alert("Token expired, please login again");
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
                window.alert("Pet created successfully");
                // Redirect to another page (petShop.html) after successful creation
                window.location.href = "petShop.html";
            }

        }

        // Send the FormData to the server
        fetchMethod(currentUrl + "/api/petShop", callback, "POST", formData, token);

    });
});
