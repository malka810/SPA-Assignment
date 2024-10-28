  let home_page = document.getElementById("home_page");
  let customer_page = document.getElementById("customer_page");
  let item_page = document.getElementById("item_page");
  let order_page = document.getElementById("order_page");
  let order_details_page = document.getElementById("order_details_page");

  let Home = document.getElementById("Home");
  let Customer = document.getElementById("Customer");
  let Item = document.getElementById("Item");
  let Order = document.getElementById("Order");
  let OrderDetails = document.getElementById("OrderDetails");

  Customer.style.display="none";
  Item.style.display="none";
  Order.style.display="none";
  OrderDetails.style.display="none";

  customer_page.addEventListener('click', function () {
    Home.style.display="none"
    Customer.style.display="block";
    Item.style.display="none";
    Order.style.display="none";
    OrderDetails.style.display="none";
  });

  item_page.addEventListener('click', function () {
    Home.style.display = "none";
    Customer.style.display = "none";
    Item.style.display = "block";
    Order.style.display = "none";
    OrderDetails.style.display = "none";
  });
  
  order_page.addEventListener('click', function () {
    Home.style.display = "none";
    Customer.style.display = "none";
    Item.style.display = "none";
    Order.style.display = "block";
    OrderDetails.style.display = "none";
  });
  
  order_details_page.addEventListener('click', function () {
    Home.style.display = "none";
    Customer.style.display = "none";
    Item.style.display = "none";
    Order.style.display = "none";
    OrderDetails.style.display = "block";
  });

$("#customer_add_btn").on("click", function() {
    let customer_id = $('#customer_id').val();
    let name = $('#customer_name').val();
    let address = $('#address').val();
    let contact = $('#contact').val();
    let email = $('#email').val();
    

    console.log("customer_id: ", customer_id);
    console.log("name: ", name);
    console.log("address: ", address);
    console.log("contact: ", contact);
    console.log("email: ", email);

    let customer = {
        id: customer_array.length + 1,
        customer_id: customer_id,
        name: name,
        address: address,
        contact: contact,
        email: email
    };

    customer_array.push(customer);

    loadCustomerTable();

});
