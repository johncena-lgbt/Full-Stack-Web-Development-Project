document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('signupForm')
    const warningCard = document.getElementById('warningCard')
    const warningText = document.getElementById('warningText')

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value
        
        if(password === confirmPassword) {
            console.log("Signup Successful");
            warningCard.classList.add("d-none")

            const formData = new FormData(signUpForm)
            localStorage.setItem("username", formData.get("username"));

            const callback = (responseStatus, responseData) => {
                console.log("Response Status: ", responseStatus);
                console.log("Response Data: ", responseData);
                if(responseStatus == 200){
                    //Check if signup was successful
                    if(responseData.token){
                        //Store the token in the local storage
                        localStorage.setItem('token', responseData.token)
                        //Redirect to the homepage after registering
                        window.location.href = "home.html";
                    }
                }else {
                    warningCard.classList.remove("d-none")
                    warningText.innerText = responseData.message
                }
            }

            //Perform fetch method
            fetchMethod(currentUrl + "/api/user/register", callback, "POST", formData)

            //Reset from fields
            signUpForm.reset()
        }else {
            //password do not match
            warningCard.classList.remove("d-none")
            warningText.innerText = "Passwords do not match"
        }
    })
})