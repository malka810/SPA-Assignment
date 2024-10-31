import CustomerModel from "../model/CustomerModel.js";
import {customer_array} from "../db/database.js";

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

let selected_customer_index = null;

$(document).ready(function (){
    $("#customer_id").val(generateCustomerId());
})

let generateCustomerId = function generateCustomerId(){

    let id = customer_array.length + 1;
    return "C0" + id;
}

let setCustomerId = () => {
    $("#customer_id").val(generateCustomerId());
}

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item,index) =>{
        console.log(item);

        let data = `<tr><td>${item.customer_id}</td><td>${item.name}</td><td>${item.address}</td><td>${item.email}</td><td>${item.contact}</td></tr>`
        $('#customerTableBody').append(data);
    })
}

const cleanCustomerForm  = () => {
    $('#customer_id').val("");
    $('#customer_name').val("");
    $('#address').val("");
    $('#email').val("");
    $('#contact').val("");
}


$('#customer_add_btn').on('click',function (){

    let customer_id = generateCustomerId();
    let name = $('#customer_name').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if (name.length == 0){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Customer Name",
        });
    }else if(address.length == 0){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Address",
        });
    }else if(!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    }else if(!validateMobile(contact)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Contact Number",
        });
    }
    else{
        let customer = new CustomerModel(
            customer_id,
            name,
            address,
            email,
            contact
        );

        customer_array.push(customer);

        // clean customer form
        cleanCustomerForm();

        loadCustomerTable();


    }

});
$('#customerTableBody').on('click','tr',function (){

    let index = $(this).index();

    selected_customer_index = index;

    let customerObj = customer_array[index];

    let customerId = customerObj.customer_id;
    let customerName = customerObj.name;
    let address = customerObj.address;
    let email = customerObj.email;
    let contact = customerObj.contact;

    $('#customer_id').val(customerId);
    $('#customer_name').val(customerName);
    $('#address').val(address);
    $('#email').val(email);
    $('#contact').val(contact);

});

$('#customer_update_btn').on('click',function (){

    let index = selected_customer_index;

    let customer_id = $('#customer_id').val();
    let name = $('#customer_name').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    let customer = new CustomerModel(
        customer_array[index].customer_id,
        name,
        address,
        email,
        contact
    );


    customer_array[selected_customer_index] = customer

    loadCustomerTable();
    cleanCustomerForm();
    setCustomerId();

});

$("#customer_delete_btn").on('click', function () {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            customer_array.splice(selected_customer_index, 1);

            // clean customer form
            cleanCustomerForm();

            // reload the table
            loadCustomerTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your customer has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});