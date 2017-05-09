import CarouselView from './CarouselView';

export default class Carousel{
    constructor(){
    	this.allProducts = [];
    	this.carouselView = new CarouselView();
    }

    loadCarousel(){
    	this.carouselView.allProducts = this.allProducts;
    	this.carouselView.buildCarouselView();
    }
}