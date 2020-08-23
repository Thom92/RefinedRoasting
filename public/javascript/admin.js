const User = require("../models/User.js")


/*let users =[{User_Id: "1", Username: "1", Email:  "2"}];
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  
  let table = document.querySelector("table");
  let data = Object.keys(users[0]);
  generateTableHead(table, data);
  generateTable(table, users);
*/

  //jQuery ajax request for users table
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