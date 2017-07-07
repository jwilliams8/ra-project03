export default class CarouselView{
    constructor(){
        console.log("Importing from Carousel View!");
        this.allProducts = [];
   }

      buildCarouselView(){
            let flkty = new Flickity( '.carousel', {initialIndex: 2});
            for (let i = 0; i < this.allProducts.length; i++){
                this.cellElems = function(){                    
                    let cell = document.createElement('div');
                    cell.setAttribute("class", "carousel-cell");               
                    let image = document.createElement('img');
                    image.setAttribute("src", this.allProducts[i].image); 
                    let hr = document.createElement('hr');
                    let brand = document.createElement('h6');
                    brand.innerHTML = this.allProducts[i].brand;
                    brand.setAttribute("class", "font-light-grey font-uppercase"); 
                    let name = document.createElement('p');
                    name.innerHTML = this.allProducts[i].name;
                    name.setAttribute("class", "p-height"); 
                    let price = document.createElement('h3');
                    price.innerHTML = "$" + this.allProducts[i].regularPrice;
                    let qvButton = document.createElement('button');
                    qvButton.setAttribute("type", "submit"); 
                    qvButton.setAttribute("data-sku", this.allProducts[i].sku); 
                    qvButton.setAttribute("class", "view-btn font-white md-margin-vert"); 
                    qvButton.innerHTML = "Quick View";
                    let atcButton = document.createElement('button');
                    atcButton.setAttribute("type", "submit"); 
                    atcButton.setAttribute("data-sku", this.allProducts[i].sku); 
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
                flkty.append(this.cellElems());
            };
            this.qvModal();
            this.atcCounter();
        } 

        qvModal() {
            $('.view-btn').click(function() {
            $('body').addClass('overflow-hidden');
            $('.quick-view-modal').fadeIn();
            });
            $('.close-modal').click(function() {
            $('body').removeClass('overflow-hidden');
            $('.quick-view-modal').fadeOut();
            });
        }

        atcCounter() {
            // let quantityArray = [];
            // for(var x in sessionStorage){
            //     quantityArray.push(sessionStorage[x]);
            // }
            // console.log(quantityArray);
            // let newQuantityArray = ["1","2"].reduce((a, b) => a + b, 0);
            // console.log(newQuantityArray);

            //console.log(newQuantityArray); // 6

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