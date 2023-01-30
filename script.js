function validateForm() {
  let price = document.getElementById('price').value;
  let dish = document.getElementById('dish').value;
  let table = document.getElementById('table').value.toUpperCase();
  
  
  if (price == "") {
    alert('Price is required');
    return false;
  }
  if (dish == "") {
    alert('Dish is required');
    return false;
  }
  if (table == "") {
    alert('Table is required');
    return false;
  }
  return true;
}


// Function to show data

function showData(response) {
  let html = "";

  for (let i = 0; i < response.data.length; i++) {
    html = html + "<tr>";
    html = html + "<td>" + response.data[i].table.toUpperCase() + "</td>";
    html = html + "<td>" + response.data[i].price + "</td>";
    html = html + "<td>" + response.data[i].dish + "</td>";
    html = html + '<td><button class="btn btn-danger deleteBtn" value=' +response.data[i]._id+ '>Delete</button></td>';
    html = html + "</tr>";
  }
  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Get Api

axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/restaurantDetails')
.then((response)=>{
  showData(response);
}).catch((err) => {
  console.log(err);
})

// Function to Add/Post Data

async function addOrder() {
  console.log('entered in addData');
  if (validateForm() == true) {
    let price = document.getElementById('price').value;
    let dish = document.getElementById('dish').value;
    let table = document.getElementById('table').value.toUpperCase();
    
    await axios.post('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/restaurantDetails', { "table": table, "price":price, "dish": dish })
    .then((response)=>{
      showData(response);
    }).catch((err) => {
      console.log(err);
    })
    console.log('entered After Axios..')

    document.getElementById('price').value = "";
    document.getElementById('dish').value = "";
    document.getElementById('table').value = "";

    // Get Api

    await axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/restaurantDetails')
    .then((response)=>{
      showData(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

// Function to Delete Data

$("body").on("click", ".deleteBtn", async function () {
  let id = $(this).val();
  await axios.delete('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/restaurantDetails' + '/' + id).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  })

  // Get Api

  await axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/restaurantDetails')
  .then((response)=>{
    showData(response);
  }).catch((err) => {
    console.log(err);
  })
  
});