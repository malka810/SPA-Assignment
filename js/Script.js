  let home_page = document.getElementById("home_page");
  let customer_page = document.getElementById("customer_page");
  let item_page = document.getElementById("item_page");
  let order_page = document.getElementById("order_page");

  let Home = document.getElementById("Home");
  let Customer = document.getElementById("Customer");
  let Item = document.getElementById("Item");
  let Order = document.getElementById("Order");

  Customer.style.display="none";
  Item.style.display="none";
  Order.style.display="none";

  customer_page.addEventListener('click', function () {
    Home.style.display="none"
    Customer.style.display="block";
    Item.style.display="none";
    Order.style.display="none";
  });

  item_page.addEventListener('click', function () {
    Home.style.display = "none";
    Customer.style.display = "none";
    Item.style.display = "block";
    Order.style.display = "none";
  });
  
  order_page.addEventListener('click', function () {
    Home.style.display = "none";
    Customer.style.display = "none";
    Item.style.display = "none";
    Order.style.display = "block";
  });
