import Product from "./product";
import App from "../src/app";


export default class BBService {

    onReady(){           
        let url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json";
        this.serviceChannel.addEventListener("readystatechange", this.onResults.bind(this), false);
        this.serviceChannel.open("GET", url,true);
        this.serviceChannel.send();
    }

    onResults(e){
        let target = e.target;
        let readyState = target.readyState;
        let httpStatus = target.status;
        console.log("readyState: " + readyState);
        switch (readyState){
            case 1:
            console.log("channel is open()'d, httpStatus is " + httpStatus);
            break;
            case 2: 
            console.log("channel is ready to send(), headers and status are available, httpStatus is " + httpStatus);
            break;
            case 3:
            console.log("channel is transferring data, httpStatus is " + httpStatus);
            break;
            case 4:
            console.log("the operation is complete. it might be successful. httpStatus is " + httpStatus);
            break;            
        }
            
        if(e.target.readyState==4){
            console.log("processing results.");
            this.processResults(e);
        }
    }

    processResults(e){
        console.log(e);
        if (e.target.status==200) {
            this.successFn(e);
        } else {
            this.errorFn(e);
        }
    }

    successFn(e){
        let target = e.target;
        let theData = target.responseText;
        let theJSON = JSON.parse(theData);
        this.allProducts = this.buildProducts(theJSON);
        this.app.init(this.allProducts);
    }

    errorFn(e){
        console.log("An error occurred. error is ");
        console.log("e.target.status" + "e.target.statusText");
    }

    
    buildProducts(theJSON){
        let productList = [];
        for (let index = 0; index < theJSON.products.length; index++) {
            let product = new Product();
            product.sku = theJSON.products[index].sku ;
            product.url = theJSON.products[index].url ;
            product.image = theJSON.products[index].image;
            product.regularPrice = theJSON.products[index].regularPrice;
            product.name = theJSON.products[index].name;
            product.brand = theJSON.products[index].manufacturer;
            product.shortDescription = theJSON.products[index].shortDescription;
            product.longDescription = theJSON.products[index].longDescription;
            productList.push(product);
        }
        return productList;
    }

    constructor(app) {
        this.serviceChannel = new XMLHttpRequest();
        this.allProducts = [];
        this.app = app;
        this.onReady();

    }
}