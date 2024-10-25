const loadingHome = document.querySelector('#Home');
const loadingCustomer = document.querySelector('#Customer');
const loadingItem = document.querySelector('#Item');
const loadingOrder = document.querySelector('#Order');
const loadingOrderDetails = document.querySelector('#orderDetails');
const myFunction=function (i){
    let id=['#home_page','#customer_page','#item_page','#order_page','#order_details_page'];
    let loadingScreens=[loadingHome,loadingCustomer,loadingItem,loadingOrder,loadingOrderDetails];
    for (let j = 0; j < id.length; j++) {
        if (i===j){
            loadingScreens[j].style.display = 'block';
            $(id[j]).removeClass("gradient-text");
            $(id[j]).addClass("active");
        }else{
            loadingScreens[j].style.display = 'none';
            $(id[j]).removeClass("active");
            $(id[j]).addClass("gradient-text");
        }
    }
}

window.addEventListener('load', ()=>{
    $("#preloader").css("display","none");
    myFunction(0);
});

$(document).ready(function () {
    $('#home_page').on('click',  () => {
        myFunction(0);
    });

    $('#customer_page').on('click', function () {
        myFunction(1);
    });

    $('#item_page').on('click', function () {
        myFunction(2);
    });

    $('#order_page').on('click', function () {
        myFunction(3);
    });

    $('#order_details_page').on('click', function () {
        myFunction(4);
    });
});



let customer_array = [];


const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.customer_id}</td><td>${item.name}</td><td>${item.address}</td><td>${item.contact}</td><td>${item.email}</td></tr>`
        $("#customerTableBody").append(data);
    })
}

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
