//THE LOCAL STORAGE OF THE PRODUCTLIST
var products = (localStorage.getItem('productList')) ? JSON.parse(localStorage.getItem('productList')) : {
    productList: [],
    idList: []
}

//PRODUCT OBJECT
function Product(name, quantity, packagingSize, expirationDate) {
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
    $("#addProduct").click(function () {
        var name = $("#productName").val();
        var quantity = $("#quantity").val();
        var packagingSize = $("#packagingSize").val();
        var expirationDate = $("#expirationDate").val();
        if (name && quantity && packagingSize && expirationDate) {
            addProduct(name, quantity, packagingSize, expirationDate);
        }
    });

    //RENDER PRODUCTS
    renderProducts();

    //SUBTRACT QUANTITY
    $(document).delegate('.btn-subtract', 'click', function () {
        var id = this.parentNode.parentNode.id;
        subtractFromItem(id);
    });


});

//function to add a new product to the list
function addProduct(name, quantity, packagingSize, expirationDate) {
    var product = new Product(name, quantity, packagingSize, expirationDate);
    products.productList.push(product);
    products.idList.push(name);
    updateProducts();
    renderProduct(product);
}


//function to update JSON
function updateProducts() {
    localStorage.setItem('productList', JSON.stringify(products));
}

//function to render all the products from JSON
function renderProducts() {
    $("#productsHTML").empty();
    for (var i = 0; i < products.productList.length; i++) {
        var value = products.productList[i];
        renderProduct(value);
    }
}

//function to render one product to the end of the list
function renderProduct(product) {

    $subtractBtn = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light bg-yellow btn-subtract").append($("<i>").addClass("material-icons").text("trending_down"));



    $productTitle = $("<div>").addClass("card-image").append($("<img>").attr("src", "https://www.w3schools.com/w3images/fjords.jpg")).append($("<span>").addClass("card-title").text(product.name)).append($subtractBtn);

    $productContent = $("<div>").addClass("card-content").append($("<p>").text("quantity : " + product.quantity)).append($("<p>").text("packaging size : " + product.packagingSize)).append($("<p>").text("expiration date : " + product.expirationDate));

    $product = $("<div>").addClass("col s12 m6 m4").append($("<div>").addClass("card").attr("id", product.name).append($productTitle).append($productContent));





    $("#productsHTML").append($product);

}

/*Function to subtract the quantity*/
function subtractFromItem(id) {
    var listId = products.idList.indexOf(id);
    if (products.productList[listId].quantity === 1) {
        deleteItem(id, listId);
    } else {
        products.productList[listId].quantity -= 1;
        updateProducts();
        renderProducts();
    }

}

/*Function to delete an item*/
function deleteItem(id, listId) {
    products.productList.splice(products.productList[listId], 1);
    products.idList.splice(products.productList[listId], 1);
    updateProducts();
    renderProducts();

}
