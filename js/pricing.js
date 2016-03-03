/* Establish event listeners for additem
 * Add click event handler to add-item button
 */

var addItemButton = document.getElementById("add-item");
// addItemButton.onclick = addItem;
addItemButton.onclick = addItem;

var addStockButton = document.getElementById("add-stock");
addStockButton.onclick = addStock;

var removeStockButton = document.getElementById("remove-stock");
removeStockButton.onclick = removeStock;

var deleteStockButton = document.getElementById("delete-stock");
deleteStockButton.onclick = deleteStock;

var products = [];

window.onload = loadData;

function addStock() {
    // Get all the checkboxes
    // var selected = document.querySelectorAll('tbody > tr > td > input:checkbox'); // not valid
    var selected = getSelectedRowBoxes();
    console.log('value of selected in selected is: ', selected);
    for (var i = 0; i < selected.length; i++) {
        var status = selected[i].parentNode.parentNode.lastChild;
        status.textContent = "YES";
        status.className = "true";
        // Update the product in the products array that
        // corresponds to the checked checkbox we're updateing.
        var prodId = selected[i].parentNode.parentNode.id;
        products[prodId].inStock = true;
        }
    saveData();
    displayInventory();
}

function addItem() {
    // console.log("inside addItem function");
    var materialName = document.getElementById("name").value;
    var materialPrice = document.getElementById("price").value;
    var inStock = document.getElementById("in-stock").checked;
    var stock = 'NULL';
    // console.log("inStock is: ", inStock);
    var newProd = new Product(materialName, materialPrice, inStock);
    products.push(newProd);
    console.log(newProd);
    console.log(products);
    saveData();
    displayInventory();
}

// Delete selected rows from inventory

function getSelectedRowBoxes() {
    // helper function to get all checked boxes in the html inventory
    var selected = document.querySelectorAll("td:first-child > input:checked");
    console.log('value of selected in getSelectedRowBoxes is: ', selected);
    return selected;
}

// Deletes the stock from the products objects array
function deleteStock() {
    rows = getSelectedRowBoxes();

    for (var i=rows.length - 1; i >= 0; i--) {
        var prodId = rows[i].parentNode.parentNode.id;
        delete products[prodId];
        products.splice(prodId, 1);
    }
    saveData();
    displayInventory();
}
 
// Remove the stock from inventory.  This doesn't remove it from the page.
function removeStock() {
    console.log("in removeStock");
    // Get all the checkboxes
    // var selected = document.querySelectorAll('tbody > tr > td > input:checkbox'); // not valid
    var selected = getSelectedRowBoxes();
    console.log('value of selected in selected is: ', selected);
    for (var i = 0; i < selected.length; i++) {
        var status = selected[i].parentNode.parentNode.lastChild;
        status.textContent = "NO";
        status.className = "false";
        // Update the product in the products array that
        // corresponds to the checked checkbox we're updateing.
        var prodId = selected[i].parentNode.parentNode.id;
        products[prodId].inStock = false;
        }
    saveData();
    displayInventory();
}

function displayInventory(){
    // Loop through the products array adding each product
    // to the html table 
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '';

    console.log('in displayInventory');
    for (i = 0; i < products.length; i++) {
        // make new row for product
        var newRow = document.createElement("TR");
        newRow.id = i;

        // Make a TD for the checkbox
        var checkbox = document.createElement("TD");
        // Make the checkbox
        var innerCheckbox = document.createElement("INPUT");
        // Set the input type to checkbox
        innerCheckbox.type = "checkbox";
        // Make innerCheckbox a child of checkbox (into the td)
        checkbox.appendChild(innerCheckbox);

        // Make TD for the material name
        var materialName  = document.createElement("TD");
        materialName.textContent = products[i].prodName;

        // Make TD for the price
        var price  = document.createElement("TD");
        price.textContent = products[i].price;

        // Make TD for stock toggle
        var inStock = document.createElement("TD");
        inStock.textContent = (function(inStock) {
            if (inStock) {
                return "YES";
            }
            else {
                return "NO";
            }
        }(products[i].inStock));
        // instock.className = products[i].inStock;
        inStock.setAttribute('class', products[i].inStock);

        // add all td's to the tr
        newRow.appendChild(checkbox);
        newRow.appendChild(materialName);
        newRow.appendChild(price);
        newRow.appendChild(inStock);

        //add new row to the TBody HTML
        document.getElementById("inventory").appendChild(newRow);
    };

}

// Constructor for product object

function Product(name, price, inStock) {
    this.prodName = name;
    this.price = price;
    this.inStock = inStock;

    this.setStock = function(stock) {
        this.inStock = stock;
    };
}

/**
 * Saves current state of the products array
*/
function saveData() {
    // transform products array into json string
    var productJSON = JSON.stringify(products);
    console.log('the json string in saveData is ', productJSON);
    
    // save json string into local storage
    // saves into price_list the string value in variable products
    localStorage.setItem("price_list", productJSON);
}

/**
 * Loads the current state of the product array
*/
function loadData() {
    // var productJSON = localStorage.getItem("price_list");
    // console.log("productJSON in loadData is ", productJSON);
    products = JSON.parse(productJSON);
    console.log("loadData json products object", products);
    if (!products) {
        products = [];
    }
    // Update the page
    displayInventory();
}
