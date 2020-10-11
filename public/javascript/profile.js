const session = require("express-session")

$(document).ready(async()=>{

    let uid = null
    await fetch("/session")
    .then(async res => await res.json())
    .then(session =>
        {
            uid = session.user.id
        })

        await fetch(`/user${uid}`)
        .then(async res => await res.json)
        .then(user => {
         
            $("#username").text(user.username)
            //Set input values
           
            $("#email").val(user.email)
            $("#firstname").val(user.firstname)
            $("#lastname").val(user.lastname)

        })

        $("#user-form").on("submit", (event)=>
        {
            //Prevent page from reloading
            event.preventDefault()
            //Getting user input values
            let username = $("#username-input").val()
            let email = $("#email-input").val()
            let firstname = $("#firstname-input").val()
            let lastname = $("#lastname-input").val()

            //Fetch put request
            fetch(`/user/${uid}/update`, 
            {
                method: "PUT",
                headers: {
                    "Content-type": "application.json; charset=UTF-8"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                })
            })
            .then(response => response.json)
            .then(data => console.log(data))
        })
})
