import Product from "./product";

export default class BBService {
    constructor() {

        // Creating HTTP Request
        (function ready(e){
            let serviceChannel = new XMLHttpRequest();
            // old (XHR 1) method
            serviceChannel.addEventListener("readystatechange", onResults, false);
            let url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json";
            serviceChannel.open("GET", url,true);
            serviceChannel.send();
        })();

        // Checking ready state
        function onResults(e) {
            let target = e.target;
            let readyState = target.readyState;
            let httpStatus = target.status;
            //useful to sue switch case
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
                processResults(e);
            }
        }

        // Checking results status
        function processResults(e) {
            console.log(e);
            if (e.target.status==200) {
                successFn(e);
            } else {
                // run errorFn
                errorFn(e);
            }
        }

        // Processing/parsing results
        function successFn(e) {
            let target = e.target;
            let theData = target.responseText;
            let output = "", i = 0, theJSON = "";
            theJSON = JSON.parse(theData);
            buildProducts(theJSON);
        }

        function errorFn(e) {
            console.log("An error occurred. error is ");
            console.log("e.target.status" + "e.target.statusText");
        }


        // Using Data from HTTP Request to build product array
        function buildProducts(theJSON){
            console.log(theJSON);
            let productList = [];
            for (let index = 1; index < 9; index++) {
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
            console.log(productList);
            buildCarousel(productList);
        }

        // Using product array to populate carousel
        function buildCarousel(productList){
            let flkty = new Flickity( '.carousel', {
                initialIndex: 2
            });
            for (let i = 0; i < productList.length; i++){
                let cellElems = function(){                    
                    let cell = document.createElement('div');
                    cell.setAttribute("class", "carousel-cell");               
                    let image = document.createElement('img');
                    image.setAttribute("src", productList[i].image); 
                    let hr = document.createElement('hr');
                    let brand = document.createElement('h6');
                    brand.innerHTML = productList[i].brand;
                    brand.setAttribute("class", "font-light-grey font-uppercase"); 
                    let name = document.createElement('p');
                    name.innerHTML = productList[i].name;
                    name.setAttribute("class", "p-height"); 
                    let price = document.createElement('h3');
                    price.innerHTML = "$" + productList[i].regularPrice;
                    let qvButton = document.createElement('button');
                    qvButton.setAttribute("type", "submit"); 
                    qvButton.setAttribute("data-sku", productList[i].sku); 
                    qvButton.setAttribute("class", "view-btn font-white md-margin-vert"); 
                    qvButton.innerHTML = "Quick View";
                    let atcButton = document.createElement('button');
                    atcButton.setAttribute("type", "submit"); 
                    atcButton.setAttribute("data-sku", productList[i].sku); 
                    atcButton.setAttribute("class", "cart-btn font-white md-margin-vert"); 
                    atcButton.innerHTML = "Add to <i class='fa fa-shopping-cart' aria-hidden='true'></i>";
                    cell.appendChild(image)
                    cell.appendChild(hr);
                    cell.appendChild(brand)
                    cell.appendChild(name)
                    cell.appendChild(price)  
                    cell.appendChild(qvButton)                      
                    cell.appendChild(atcButton)                                          
                    return cell;  
            }
                flkty.append(cellElems());
            };
            qvModal();
            atcCounter();
        } 

        function qvModal() {
            $('.view-btn').click(function() {
            $('body').addClass('overflow-hidden');
            $('.quick-view-modal').fadeIn();
            });
            $('.close-modal').click(function() {
            $('body').removeClass('overflow-hidden');
            $('.quick-view-modal').fadeOut();
            });
        }

        function atcCounter() {
            let counter = 1;
            $('.cart-btn').click(function() {
            $(".counter").addClass('counter-top');
            $('.counter-top').show();
            $('.counter-scroll').show();
            $('.counter').html(counter)
            counter++;
            });
        }
    }
}