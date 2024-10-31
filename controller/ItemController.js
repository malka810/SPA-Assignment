import ItemModel from "../model/ItemModel.js";
import {item_array} from "../db/database.js";

/*------------  ITEM SECTION  -------------*/


let selected_item_index = null;

$(document).ready(function (){
    $("#item_code").val(generateItemCode());
})

//GENERATE ITEM CODE

let generateItemCode = function generateItemCode(){

    let id = item_array.length + 1;
    return "I0" + id;
}

let setItemCode = () => {
    $("#item_code").val(generateItemCode());
}

//LOAD ITEM TABLE

const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item,index) => {
        let data = `<tr><td>${item.item_code}</td><td>${item.description}</td><td>${item.unit_price}</td><td>${item.quantity}</td></tr>`
        console.log(item);
        $("#itemTableBody").append(data);
    })
}

let itemCount = 0;
$('#item-count').text(itemCount);


//SAVE ITEM

$('#item_add_btn').on('click',function (){

    let item_code = generateItemCode();
    let description = $("#description").val();
    let unit_price = $("#price").val();
    let quantity = $("#qty").val();

    if(description.length == 0){

        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid description",
        });

    }else if(unit_price.length == 0){

        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid unit price",
        });

    }else if(quantity.length == 0){

        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid quantity",
        });

    }else{

        let item = new ItemModel(
            item_code,
            description,
            unit_price,
            quantity
        );

        if(item_array.push(item)){

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item has been saved successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            loadItemTable();
            loadItems();
            clearForm();
            setItemCode();

            itemCount += 1;
            $('#item-count').text(itemCount);

        }else{

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Item not been saved!!",

            });

        }
    }




});


//GET ITEM DETAILS USING TABLE ROW

$('#itemTableBody').on('click','tr',function (){

    let index = $(this).index();

    selected_item_index = index;

    let itemObj = item_array[index];

    let item_code = itemObj.item_code;
    let description = itemObj.description;
    let unit_price = itemObj.unit_price;
    let quantity = itemObj.quantity;

    $('#item_code').val(item_code);
    $('#description').val(description);
    $('#price').val(unit_price);
    $('#qty').val(quantity);


});


//UPDATE ITEM

$('#item_update_btn').on('click',function (){

    let index = selected_item_index;

    let item_code = $("#item_code").val();
    let description = $("#description").val();
    let unit_price = $("#price").val();
    let quantity = $("#qty").val();

    let item = new ItemModel(
        item_array[index].item_code,
        description,
        unit_price,
        quantity
    );

    item_array[index] = item;

    loadItemTable();
    clearForm();
    setItemCode();

});


//DELETE ITEM

$('#item_delete_btn').on('click',function (){

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) => {
        if (result.isConfirmed) {

            item_array.splice(selected_item_index);

            loadItemTable();
            clearForm();
            setItemCode();

            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
        }
    });
})


//SEARCH ITEM

// $('#item_SearchBtn').on('click', function () {
//
//     let searchItem = $('#item_search').val().toLowerCase();
//
//     let filteredItems = itemArray.filter(item =>
//         item.description.toLowerCase().includes(searchItem)
//     );
//
//     loadItemTable2(filteredItems.length ? filteredItems : itemArray);
// });


//LOAD ITEMS WHEN SEARCHING
//
// function loadItemTable2(items) {
//
//     $('#itemTableBody').empty();
//
//     items.forEach(item => {
//         $('#itemTableBody').append(`
//             <tr>
//                 <td>${item.item_code}</td>
//                 <td>${item.description}</td>
//                 <td>${item.unit_price}</td>
//                 <td>${item.quantity}</td>
//              </tr>
//         `);
//     });
//
// }


$('#item_reset_btn').on('click',function (){

    clearForm();
});


//CLEAR FORM

function clearForm(){

    $('#item_code').val("");
    $('#description').val("");
    $('#price').val("");
    $('#qty').val("");
}