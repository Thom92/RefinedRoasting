$(document).ready(() =>
{
    $("#login-form").on("submit", (event) => {

    event.preventDefault()


    let username = $("#username").val();
    let password = $("#password").val();
    //Get json file
    fetch("/signin", {
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
        
        //If sign in credentials was authenticated
        if (jsonRes.status == "OK") 
        {
            window.location.replace('/profile')
        }
    })

})
})


