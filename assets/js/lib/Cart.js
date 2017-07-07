import CartView from './CartView';
export default class Cart{
    constructor(){
        console.log("Importing from Cart!");
        this.cartModal();
        this.allProducts = [];
        this.cartView = new CartView();
    }

    loadCart(){
        this.cartView.allProducts = this.allProducts;
        this.cartView.buildCartView();
        this.cartEventListener();
        this.removeListen();
        this.clearListen();
    }

    cartEventListener(){
        let cartBtn = document.getElementsByClassName('cart-btn');
        for (var i=0; i < cartBtn.length; i++){
            cartBtn[i].addEventListener('click', this.addSessionStorage.bind(this), false);
        }
    }   

    addSessionStorage(e){
        let dataSku = e.target.getAttribute('data-sku');
        for (var i = 0; i < this.allProducts.length; i++){
            if (dataSku == this.allProducts[i].sku) {
                if (sessionStorage.length > 0) {
                    for (var x in sessionStorage){
                        if (this.allProducts[i].sku != [x]) {
                            console.log("first product of it's kind");
                            sessionStorage.setItem(this.allProducts[i].sku, 1);
                            this.cartView.buildCartView();                 
                        } else {
                            console.log("same of existing product");
                            let newQuantity = parseInt(sessionStorage[x]) + 1;
                            sessionStorage.setItem(this.allProducts[i].sku,newQuantity);
                            this.cartView.buildCartView();
                        }
                    }
                } else {
                    sessionStorage.setItem(this.allProducts[i].sku, 1);
                    this.cartView.buildCartView();
                    console.log("first ever product");
                }
            } 
        }
        this.removeListen();
        this.clearListen();
    }

    removeListen() {
        if (sessionStorage.length > 0) {
            let removeBtn = document.getElementsByClassName('remove-btn');
            for (var i=0; i < removeBtn.length; i++){
                removeBtn[i].addEventListener('click', this.removeStorage.bind(this), false);
            }
        }
    }
    removeStorage(e){
        let dataSku = e.target.getAttribute('data-sku');
        for (var i = 0; i < this.allProducts.length; i++){
            if (dataSku == this.allProducts[i].sku) {
                sessionStorage.removeItem(this.allProducts[i].sku);
            } 
        }
        this.cartView.buildCartView();
        this.removeListen();
        this.clearListen();
    }
    clearListen() {
        if (sessionStorage.length > 0) {
            let clearBtn = document.getElementById('clear-btn');
            clearBtn.addEventListener('click', this.clearStorage, false);
        }
    }
    clearStorage(){
        sessionStorage.clear();
        let outerDiv = document.getElementById('cart-rows');
        let cartMessage = document.getElementById('cart-message');
        outerDiv.innerHTML = "";
        cartMessage.innerHTML = "Your Cart is Empty";
    }

    cartModal() {
        $('#cart-icon').click(function() {
            $('body').addClass('overflow-hidden');
            $('.cart-modal').fadeIn();
        });
        $('.close-modal').click(function() {
            $('body').removeClass('overflow-hidden');
            $('.cart-modal').fadeOut();
        });
    }
}

