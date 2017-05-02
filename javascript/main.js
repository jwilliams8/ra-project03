   
     // Cart Counter
        let counter = 1;
        $('.cart-btn').click(function() {
             $('.counter-top').show();
             $('.counter-scroll').show();
             $('.counter').html(counter)
             counter++;
        });

   function outputToDiv(text){
            var outputDiv = document.getElementById("output");
            var newTextNode = document.createTextNode(text);
            var newElementNode = document.createElement("br");
            outputDiv.appendChild(newTextNode);
            outputDiv.appendChild(newElementNode);
        }

        function processResults(e) {
            console.log(e);
            if (e.target.status==200) {
                successFn(e);
            } else {
                // run errorFn
                errorFn(e);
            }
        }

        function successFn(e) {
            var target = e.target;
            var theData = target.responseText;

            var theJSON = JSON.parse(theData);
            console.log(theJSON);
         /* var html = "";
          for (var index = 1; index < 9; index++) {
              html += "<div class='carousel-cell'>"
              html += "<a href='" + theJSON.products[index].url + "' target='_blank'>";
              html += "<img src='" + theJSON.products[index].image + "'" + " class='xs-padding-bottom'/>"
              html += "<p class='font-light-grey font-uppercase sm-font sm-font-tablet-desktop'>" + theJSON.products[index].manufacturer + "</p>";
              html += "<p class='font-light-grey md-font md-font-tablet-desktop sm-padding-bottom no-padding-desktop'>" + theJSON.products[index].regularPrice + "</p>";
              html += "</a>";
              html += "</div>"
              $(".carousel").append(html);
        };*/
    
        }

        function errorFn(e) {
            console.log("An error occurred. error is ");
            console.log(e.target.status + e.target.statusText);
        }

        function onResults(e) {
            var target = e.target;
            var readyState = target.readyState;
            var httpStatus = target.status;
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

		function ready(e){
            var serviceChannel = new XMLHttpRequest();
            // old (XHR 1) method
            serviceChannel.addEventListener("readystatechange", onResults, false);
            // var url = "someLinks.txt";
            var url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json";
            serviceChannel.open("GET", url,true);
            serviceChannel.send();
		}

        window.addEventListener("load",ready,false);