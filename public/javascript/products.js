

/*var removeCarItemButtons = document.getElementsByClassName('btn-danger')
for(var i = 0; i<removeCarItemButtons.length; i++)
{
  var button = removeCarItemButtons[i]
  button.addEventListener('click', function(event)
  {
    //Whatever button we clicked on
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
  })
}*/


$(document).ready(() =>
{
    $.ajax({
        url: "/products",
        method: "GET",
        contentType: "application/json"
    }).done((data) =>
    {
        $("#productlist")
        .DataTable({
            aaData: data,
            columns: 
            [
                { title: "Name", data: "name"},
                { title: "Price", data: "price"},
                { title: "Description", data: "description"}
            ]
        })
    })
})
$(document).ready(() => {

	//Catch the logout submit event
    $("#logout").on("submit", (req, res) => 
    {
        console.log("logged out")
        //Prevent page from refreshing
        req.session.destroy()
        res.redirect("/")
    })
})