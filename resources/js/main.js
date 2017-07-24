//THE LOCAL STORAGE OF THE PRODUCTLIST
var products = (localStorage.getItem('productList')) ? JSON.parse(localStorage.getItem('productList')):{
    productList: []
}

//PRODUCT OBJECT
function product(name,quantity,packagingSize,expirationDate){
    this.name = name;
    this.quantity = quantity;
    this.packagingSize = packagingSize;
    this.expirationDate = expirationDate;
}

$(document).ready(function () {
    //INITIALIZATION MATERIALIZE COMPONENTS

    //MODAL
    $('.modal').modal();
    //DATEPICKER
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    
    
    //ADD PRODUCT
    $("#addProduct").click(function(){
        var name = $("#productName").val();
        var quantity = $("#quantity").val();
        var packagingSize = $("#packagingSize").val();
        var expirationDate = $("#expirationDate").val();
        if(name && quantity && packagingSize && expirationDate){
            addProduct(name,quantity,packagingSize,expirationDate);
        }
    });



});


function addProduct(name, quantity, packagingSize, expirationDate){
   // var product = new product(name,quantity,packagingSize,expirationDate);
    var product = new Object();
    product.name = name;
    product.quantity = quantity;
    product.packagingSize = packagingSize;
    product.expirationDate = expirationDate;
    products.productList.push(product);
    updateProducts();
}


//function to update JSON
function updateProducts(){
    localStorage.setItem('productList',JSON.stringify(products));
}