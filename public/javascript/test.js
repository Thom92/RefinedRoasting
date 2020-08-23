$(document).ready(() =>
{
    $.ajax({
        url: "/user",
        method: "GET",
        contentType: "application/json"
    }).done((data) =>
    {
        $("#userlist")
        .DataTable({
            aaData: data,
            columns: [
              
              { title: "Username", data: "username" },
              { title: "Email", data: "email" },
              { title: "Firstname", data: "first_name" },
              { title: "Lastname", data: "last_name" }
            ]
          })
    })

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
                { title: "Product ID", data:"product_id"},
                { title: "Name", data: "name"},
                { title: "Price", data: "price"},
                { title: "Description", data: "description"}
            ]
        })
    })
})