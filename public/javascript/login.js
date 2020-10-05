$(document).ready(() =>
{
    $("#login-form").on("submit", (event) => {

    event.preventDefault()


    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username)
    //Get json file
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then((jsonRes) => {
        
        //If login credentials was authenticated
        if (jsonRes.status == "OK") 
        {
            
            //Redirect authenticated user to index page
            window.location.replace('/')

        }
    })

})
})


