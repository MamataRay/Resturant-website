//add too cart
const btnCart = document.querySelector('.btn-cart');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});
btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', () => {
    loadFood();
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        itemList = JSON.parse(storedCart);
        itemList.forEach(item => {
            const newProductElement = createCartProduct(item.title, item.price, item.imgSrc);
            const element = document.createElement('div');
            element.innerHTML = newProductElement;
            const cartBasket = document.querySelector('.cart-content');
            cartBasket.append(element);
        });
        loadContent();
    }
});

function loadFood(){
    loadContent();
}
function loadContent(){
    let btnRemove = document.querySelectorAll('.cart-remove');
    console.log(btnRemove);
    btnRemove.forEach((btn) => {
        btn.addEventListener('click',removeItem);      
    });
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    
    });
    updateTotal();
}
function removeItem(){
    if(confirm('Are you sure to remove')){
        let title =this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=> el.title !=title);
       this.parentElement.remove();
       saveCartToLocalStorage();
       loadContent();
    }
}
function changeQty(){
    if(isNaN(this.value)|| this.value<1){
        this.value=1;
    }
    loadContent();
}
let itemList=[];
function addCart(){
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = this.parentElement.querySelector('.food-img').src;

    let newProduct ={title,price,imgSrc}

    if(itemList.find((el)=> el.title== newProduct.title)){
        alert("Product already added in the cart");
        return;
    }
    else{
        itemList.push(newProduct);
    }
    let newProductElement =createCartProduct(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket= document.querySelector('.cart-content');
    cartBasket.append(element);
    saveCartToLocalStorage();
    loadContent();
}
function createCartProduct(title,price,imgSrc){
    return`
    <div class="cart-box">
                    <img src="${imgSrc}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-food-title">${title}</div>
                        <div class="price-box">
                            <div class="cart-price">${price}</div>
                            <div class="cart-amt">${price}</div>
                        </div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class="fa fa-trash cart-remove" ></i>
                </div>
    `;
}
function updateTotal(){
    const cartItems =document.querySelectorAll('.cart-box');
    const totalvalue = document.querySelector('.total-price');

    let total =0;
    cartItems.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let   price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+= (price *qty);
        product.querySelector('.cart-amt').innerText = "Rs. "+(price * qty);

    });
    totalvalue.innerHTML = 'Rs. ' + total ;
}

const cartCount = document.querySelector('.cart-count');
let count = itemList .length;
cartCount.innerHTML = count;
if (count==0){
    cartCount.style.display = 'none';
}
else{
    cartCount.style.display = 'block';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(itemList));
}

function placeOrder() {
    if (itemList.length === 0) {
        alert("Your cart is empty. Please add items to place an order.");
        return;
    }
    alert("Order placed successfully!");
    itemList = []; // Clear the cart
    saveCartToLocalStorage(); // Update local storage

    // Reload the page to reset the cart and total
    location.reload();
}

// Add event listener to the place order button
document.querySelector('.btn-buy').addEventListener('click', placeOrder);