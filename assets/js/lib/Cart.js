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
        this.cartEventListener();
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
                let quantity = 1;
                sessionStorage.setItem(this.allProducts[i].sku,quantity);
            } 
        }
        this.cartView.buildCartView();
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

