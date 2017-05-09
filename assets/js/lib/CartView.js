export default class CartView {
    constructor(){
        console.log("Importing from Cart View!");
        this.allProducts = [];
    }

    buildCartView(){
		var keyArr = [];
		for(var x in sessionStorage){
  			keyArr.push([x]);
		}
		var valueArr = [];
		for(var x in sessionStorage){
  			valueArr.push(sessionStorage[x]);
		}
		document.getElementById('cart-rows').innerHTML = "";
		for(var x = 0; x < keyArr.length; x++){
			for (var i = 0; i < this.allProducts.length; i++) {
				if (keyArr[x][0] == this.allProducts[i].sku) {
					let outerDiv = document.getElementById('cart-rows');
					let itemRow = document.createElement('div');
					itemRow.setAttribute("class", "item-row flex flex-align-items-center flex-justify-between"); 
					let image = document.createElement('img');
		            image.setAttribute("src", this.allProducts[i].image); 
		            let brand = document.createElement('h5');
		            brand.innerHTML = this.allProducts[i].brand;
		            brand.setAttribute("class", "font-light-grey font-uppercase"); 
		            let price = document.createElement('h4');
		            price.innerHTML = "$" + this.allProducts[i].regularPrice;
		            let currentQuantity = document.createElement('p');
		           	currentQuantity.innerHTML = valueArr[x][0];
		           	let quantitySelector = document.createElement('input');
		           	quantitySelector.setAttribute("type", "number"); 
		           	quantitySelector.setAttribute("name", "quantity"); 
		            let buttonColumn = document.createElement('div');
		            buttonColumn.setAttribute("class", "flex flex-col"); 
		            let updateButton = document.createElement('button');
		            updateButton.setAttribute("type", "submit"); 
		            updateButton.setAttribute("data-sku", this.allProducts[i].sku); 
		            updateButton.setAttribute("class", "cart-btn font-white"); 
		            updateButton.innerHTML = "Update";
		            let removeButton = document.createElement('button');
		            removeButton.setAttribute("type", "submit"); 
		            removeButton.setAttribute("data-sku", this.allProducts[i].sku); 
		            removeButton.setAttribute("class", "view-btn font-white"); 
		            removeButton.innerHTML = "Remove";
		            outerDiv.appendChild(itemRow);
		            itemRow.appendChild(image);
		            itemRow.appendChild(brand);
		            itemRow.appendChild(price);
		            itemRow.appendChild(currentQuantity);
		            itemRow.appendChild(quantitySelector);
		            itemRow.appendChild(buttonColumn);
		            buttonColumn.appendChild(updateButton);
		            buttonColumn.appendChild(removeButton);
		   
		        }
		    }

			
	    }
    }
}
