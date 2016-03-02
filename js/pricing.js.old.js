/* Establish event listeners for add-item
 * Add click event handler to add-item button
 */

var addItemButton = document.getElementById("add-item");
addItemButton.onclick = addItem;

var addStockButton = document.getElementById("add-stock");
addStockButton.onclick = addStock;

var removeStockButton = document.getElementById("remove-stock");
removeStockButton.onclick = removeStock;

var products = [];

function addStock() {
    var check = document.getElementsByClassName("check-box");
    // console.log('check.length is: ', check.length);
    for (i = 0; i < check.length; i++){
        if (check[i].checked){
            console.log(check[i]);
            console.log("row number is: ", i);
            console.log("check box value is: ", check[i].checked);
        }
    }
}
 
function removeStock() {
    console.log("in removeStock");


    var checked = document.querySelectorAll("#inventory > tr > td:nth-child(1) > input:checked");
    // var checked1 = document.querySelectorAll("#inventory > tr > td:nth-child(1) > input");
    console.log("checked length is: ", checked.length); // returns nothing if the box isn't
                                                        // checked.  lenght of list = # of boxes checked
    console.log("checked is: ", checked);

    for (var i = 0; i < checked.length; i++){
        // status = checked[i].parentNode.parentNode.children[3];
        var status = checked[i].parentNode.nextSibling.nextSibling.nextSibling;
        console.log('value of checked[i] is: ', checked[i]);
        console.log('status is: ', status);
        status.textContent = 'No';
        status.className = 'false';
        }


    // console.log("checked1 is: ", checked1);
    
    // for (i = 0; i < check.length; i++){
    //      if (check[i].checked){
    //          console.log("checked[i] is ", check[i]); // this doesn't work
    //          console.log("row number is: ", i + 1);
    //          console.log("checked[i].length value is: ", check[i].length);
    //      }
    //      else {
    //         console.log("checked[i] is ", check[i]); // this doesn't work
    //         console.log("row number is ", i + 1);
    //         console.log("checked[i].length value is , ", check[i].length);
    //      }
    //  }
}


function removeStock1() {
    // Tiffany's class example - should get [input, input, input] for each
    // checked box.
}
/* Add the item in the text fields to the inventory 
 * list in the table body (id="inventory")
 */

function addItem() {
    // console.log("inside addItem function");
    var materialName = document.getElementById("name").value;
    var materialPrice = document.getElementById("price").value;
    var inStock = document.getElementById("in-stock").checked;
    var stock = 'NULL';
    // console.log("inStock is: ", inStock);
    if (inStock){
        stock = 'YES';
    }
    else{
        stock = 'NO';
    }

// #inventory > tr > td:nth-child(1) > input
    var tableRow = document.getElementById("inventory");
    var tabRow = "<tr>" +
                        "<td><input type='checkbox'/></td>" +
                         "<td>" + materialName + "</td>" +
                         "<td>" + materialPrice + "</td>" +
                         "<td class=" + inStock + ">" + stock + "</td>" +
                         "</tr>";

    tableRow.innerHTML += tabRow;

    var newProd = new Product(materialName, materialPrice, inStock);
    products.push(newProd);
    console.log(newProd);
    console.log(products);
    // Create a new instance of the product
    // object with the new item's info
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