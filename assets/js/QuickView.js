export default class QuickView {
	constructor() {
		console.log("Importing from QuickView!");
		this.allProducts = [];
		this.quickViewModal();	
	}

	 qvEventListener(){
        let viewBtn = document.getElementsByClassName('view-btn');
        for (var i=0; i < viewBtn.length; i++){
            viewBtn[i].addEventListener('click', this.buildQuickView.bind(this), false);
        }
    }   

	 buildQuickView(e){
		let dataSku = e.target.getAttribute('data-sku');
		let leftCol = document.getElementById('left-col');
		let rightCol = document.getElementById('right-col');
		let description = document.getElementById('description');

		for (var i = 0; i < this.allProducts.length; i++){
			if (dataSku == this.allProducts[i].sku) {
			  document.getElementById('left-col').innerHTML = "";
			  document.getElementById('right-col').innerHTML = "";
			  document.getElementById('description').innerHTML = "";
			  let image = document.createElement('img');
              image.setAttribute("src", this.allProducts[i].image); 
              let name = document.createElement('p');
              name.innerHTML = this.allProducts[i].name;
              name.setAttribute("class", "p-height"); 
              let brand = document.createElement('h5');
              brand.innerHTML = this.allProducts[i].brand;
              brand.setAttribute("class", "font-light-grey font-uppercase"); 
              let price = document.createElement('h3');
              price.innerHTML = "$" + this.allProducts[i].regularPrice;
              let atcButton = document.createElement('button');
              atcButton.setAttribute("type", "submit"); 
              atcButton.setAttribute("data-sku", this.allProducts[i].sku); 
              atcButton.setAttribute("class", "cart-btn font-white"); 
              atcButton.innerHTML = "Add to <i class='fa fa-shopping-cart' aria-hidden='true'></i>";
              let hr = document.createElement('hr');
              let longDescription = document.createElement('p');
              longDescription.innerHTML = this.allProducts[i].longDescription;
              leftCol.appendChild(image);
              rightCol.appendChild(name);
              rightCol.appendChild(brand);
              rightCol.appendChild(price);
              rightCol.appendChild(atcButton);
              description.appendChild(longDescription);
			}
	    }
	    this.atcCounter();
    }

    atcCounter() {
            let counter = 1;
            $('.cart-btn').click(function() {
               $(".counter").addClass('counter-top');
               $('.counter-top').show();
               $('.counter-scroll').show();
               $('.counter').html(counter)
               counter++;
            });
        }

	quickViewModal() {
	    $('.view-btn').click(function() {
			$('body').addClass('overflow-hidden');
			$('.quick-view-modal').fadeIn();
		});
		$('.close-modal').click(function() {
			$('body').removeClass('overflow-hidden');
			$('.quick-view-modal').fadeOut();
		});
	}

}