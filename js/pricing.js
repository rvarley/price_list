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
    displayInventory();
}

// Delete selected rows from inventory

function getSelectedRowBoxes() {
    // helper function to get all checked boxes in the html inventory
    var selected = document.querySelectorAll("td:first-child > input:checked");
    console.log('value of selected in getSelectedRowBoxes is: ', selected);
    return selected;
}

function deleteStock() {
    // determine selected rows
    selector = getSelectedRowBoxes();
    console.log('In deleteStock, selector', selector);
    // delete the products that correspond to the selected rows from the products array
    for (var i = 0; i < selector.length; i++) {
        console.log('selector[i] in deleteStock is ', selector[i]);

        // delete products[i];
        }
    // re-render inventory list using display inventory
    displayInventory();
}
 
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