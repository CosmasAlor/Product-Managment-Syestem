

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");

var rawData = document.getElementById("Data");
var searchInput = document.getElementById("search");

var addbut = document.getElementById("add");
var updatebut = document.getElementById("update");

var itemIndex;
var productList;

if (localStorage.getItem('productList')) {

    productList = JSON.parse(localStorage.getItem('productList'));
    displayProducts(productList);
    } else {
    productList = [];
}

function addProduct() {



    var products = {
        productName : productNameInput.value,
        productPrice : productPriceInput.value,
        productCategory : productCategoryInput.value,
        productDesc : productDescInput.value,
        productImage : `images/${productImageInput.files[0]?.name}`
    };
    productList.push(products);


    // console.log(products.productImage);


localStorage.setItem('productList' , JSON.stringify(productList));

    displayProducts(productList);
    // clear();
}


function displayProducts(list) {

    var container = ``;

    for (var i = 0; i < list.length; i++) {
        container += `
        
        <div class="col-lg-3 col-md-6 ">
        <div class="card m-2" id="card">
            <img src="${list[i].productImage}" alt="">
            <div class="card-body">
                <h5 class="card-title">${list[i].productName}</h5>
                <p class="card-text">${list[i].productDesc}</p>
                <h6>${list[i].productPrice}</h6>
                <h6>${list[i].productCategory}</h6>
            <div class="button d-flex justify-content-between">
                <button class="btn btn-danger text-left" onclick="delate(${i})"> Delete</button>
                <button class="btn btn-warning text-right" onclick="updateForm(${i})"> Update</button>
            </div>
            </div>
        </div>

    </div>`

    }
    rawData.innerHTML = container;

}

function clear() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

    
}

function delate(index) {
    productList.splice(index ,1);

    localStorage.setItem('productList', JSON.stringify(productList));

    displayProducts(productList);
}

function search() {

var searchResults = [];

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].productName.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {

        searchResults.push(productList[i])

        }
    }
    displayProducts(searchResults);

}

function updateForm(formIndex) {

    itemIndex = formIndex;

    addbut.classList.add('d-none')
    updatebut.classList.remove('d-none')


    productNameInput.value = productList[formIndex].productName;
    productPriceInput.value = productList[formIndex].productPrice;
    productCategoryInput.value = productList[formIndex].productCategory;
    productDescInput.value = productList[formIndex].productDesc;
    productImage = `images/${productImageInput.files[0]?.name}`;


    // productImage.files = productList[formIndex].productImage;
   

    // productImage.value = productList[formIndex].productDesc


    
   
    // productImageInput.files[0] = productList[formIndex].productImage;
    // `images/${productImageInput.files[0]?.name}` = productList[formIndex].productImage;

}


function update() {
    
    var products = {
        productName : productNameInput.value,
        productPrice : productPriceInput.value,
        productCategory : productCategoryInput.value,
        productDesc : productDescInput.value,

    };

        productList.splice(itemIndex,1,products);
        displayProducts(productList);
        localStorage.setItem('productList' , JSON.stringify(productList));



        console.log(productList[itemIndex]);
        clear();
        
}

