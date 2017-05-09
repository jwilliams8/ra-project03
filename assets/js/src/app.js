import Main from '../lib/Main';
import SmoothScroll from '../lib/SmoothScroll';
import Cart from '../lib/Cart';
import CartView from '../lib/CartView';
import Carousel from '../lib/Carousel';
import QuickView from '../lib/QuickView';
import BBService from '../lib/BBService';

export default class App{
    constructor(){
    	this.main = new Main();
    	this.smoothScroll = new SmoothScroll();
    	this.cart = new Cart();
    	this.cartView = new CartView();
    	this.carousel = new Carousel();
    	this.quickView = new QuickView();
        this.allProducts = [];
        this.bbService = new BBService(this);
    }

    init(allProducts){
        this.allProducts = allProducts;
        this.carousel.allProducts = this.allProducts;
        this.carousel.loadCarousel();
        this.quickView.allProducts = this.allProducts;
        this.quickView.qvEventListener();
        this.cart.allProducts = this.allProducts;
        this.cart.loadCart();
    }
}

