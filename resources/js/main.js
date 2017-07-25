//THE LOCAL STORAGE OF THE PRODUCTLIST
var products = (localStorage.getItem('productList')) ? JSON.parse(localStorage.getItem('productList')) : {
    productList: []
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


});

//function to add a new product to the list
function addProduct(name, quantity, packagingSize, expirationDate) {
    var product = new Product(name, quantity, packagingSize, expirationDate);
    products.productList.push(product);
    updateProducts();
    renderProduct(product);
}


//function to update JSON
function updateProducts() {
    localStorage.setItem('productList', JSON.stringify(products));
}

//function to render all the products from JSON
function renderProducts() {
    for (var i = 0; i < products.productList.length; i++) {
        var value = products.productList[i];
        renderProduct(value);
    }
}

//function to render one product to the end of the list
function renderProduct(product) {

    var item = document.createElement('h3');
    item.innerHTML = product.name;
    document.getElementById('productsHTML').appendChild(item);

    /* <div class="col s12 m6 l4">
                 <div class="card">
                     <div class="card-image">
                         <img src="https://www.w3schools.com/w3images/fjords.jpg">
                         <span class="card-title">Card Title</span>
                         <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                     </div>
                     <div class="card-content">
                         <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                     </div>
                 </div>
             </div>*/
}
