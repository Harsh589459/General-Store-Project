
const endpoint = "https://crudcrud.com/api/7c93421f542044b4861336f8505ae6f8/general-store";
var items;
displayItem();
function addItem() {
    let itemName = document.getElementById('item-name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;

    const obj = {
        itemName,
        description,
        price,
        quantity
    }
    axios.post(endpoint, obj).then((res) => {
        displayItem();
    }).catch((err) => {
        console.log(err);
    })

}

function displayItem() {
    axios.get(endpoint).then((res) => {
        items = res.data;

        var itemList = document.getElementById("item-list")
        itemList.innerHTML = "";
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var listItem = document.createElement("li");
            listItem.textContent = item.itemName + "  " + item.description + "  " + item.price + "  " + item.quantity + "  ";

            listItem.classList.add("item-list-item");


            var buy1Button = createEditButton(1, item._id);
            var buy2Button = createEditButton(2, item._id);
            var buy3Button = createEditButton(3, item._id);

            listItem.appendChild(buy1Button)
            listItem.appendChild(buy2Button)
            listItem.appendChild(buy3Button)
            itemList.appendChild(listItem)
        }
    })
}


function createEditButton(buys, id) {
    var buyButton = document.createElement("button");
    buyButton.textContent = `Buy ${buys}`;

    buyButton.addEventListener("click", function () {
        buyItem(buys, id);
    })
    return buyButton;

}

function buyItem(buys, id) {
    var selectedItem;
    for (var i = 0; i < items.length; i++) {
        if (id === items[i]._id) {
            selectedItem = items[i];
            break;
        }
    }
    let quantity = selectedItem.quantity - buys;
    if(quantity<=0){
        alert("Don't have sufficicent amount of items")
        return;
    }
    const obj = {
        itemName: selectedItem.itemName,
        description: selectedItem.description,
        price: selectedItem.price,
        quantity: quantity
    }
    axios.put(`${endpoint}/${id}`, obj).then((res) => {
            displayItem();
    }).catch((err)=>{
        console.log(err);
    })
}