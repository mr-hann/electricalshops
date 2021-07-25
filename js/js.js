
//jqury scroll to top button animation
$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top 
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});

window.addEventListener("load",fetchdata);
 //the button to call api   
/*var search=document.querySelector(".search");
search.addEventListener("click",fetchdata);*/

 //loading animation
     //sellecting dom
    var load= document.querySelector('.loading');
    var check= document.querySelector('.check');
    var con= document.querySelector('.con');

function fetchdata(){;
     
    document.getElementById("cntnts").textContent = "";
                         
    var query = "Electrical Shops";
    var state = document.dataform.state.value;
    var country = document.dataform.country.value;


//checkin if content is present
 if(check.children.length<=0){
   
        load.classList.add("d-block");
    
 }
 //first check end
                    



try {
   
    //getting data from api
      axios({
         method: "post",
         url:"https://api.dataforseo.com/v3/serp/google/maps/live/advanced",
         auth: {
           username: "iwarastevejohanna@gmail.com",
           password: "bc17285e1ebc1a92"
         },
         data: [{
           "keyword": encodeURI(`${query} in ${state}, ${country}`),
           "language_code": "en",
           "location_code":  2566
         }],
         headers: {
           'content-type': 'application/json'
         }
         //returning promise
         }).then(function (response) {

         var result = response['data']['tasks'][0];
         result = result.result[0].items;

      //looping throung the api to populate the html with the data

            result.forEach((business) => {
             
              var rating = business.rating ? business.rating.value : 0;
              var contact = business.phone ? business.phone : "";
               
    //div for four card display     
    var cntnr = document.createElement("div");
    //adding class
    cntnr.classList.add("col","mb-4");
    //card creaded
    var card = document.createElement("div");
    card.className = "card";
    //card image created
    var img = document.createElement("img");
    img.onerror = function(){
       img.innerHTML = '<i class="bi bi-tools lg-i"></i>';
    }

    card.appendChild(img);
    //div class body
    var crdbdy = document.createElement("div");
    //card body class added to the div
    crdbdy.className="card-body";
    //creating the text that will hold the name of the shope
    var ttle = document.createElement("h5");
    //the shop data collected should be display in the h6
    ttle.textContent = business.title;
    ttle.className="card-title";
    //putting the text created in the card 
    crdbdy.appendChild(ttle);
   // creating div when the data is been resived
    var rtngbr = document.createElement("div");

    //star rating 
    if(rating > 4.5){
        rtngbr.innerHTML = '<span class="rating">5.0</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/>';
    }else if(rating>4){
        rtngbr.innerHTML = '<span class="rating">4.5</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-half star"/>';
    }
    else if(rating > 3.5){
        rtngbr.innerHTML = '<span class="rating">4.0</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/>';
    }else if(rating > 3){
        rtngbr.innerHTML = '<span class="rating">3.5</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-half star"/>';
    }
    else if(rating > 2.5){
        rtngbr.innerHTML = '<span class="rating">3.0</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/>';
    } else if(rating > 2){
        rtngbr.innerHTML = '<span class="rating">2.5</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/> <i class="bi bi-star-half star"/>';
    }
    else if(rating > 1.5){
        rtngbr.innerHTML = '<span class="rating">2.0</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-fill star"/>';
    } else if(rating > 1){
        rtngbr.innerHTML = '<span class="rating">1.5</span> <i class="bi bi-star-fill star"/> <i class="bi bi-star-half star"/>';
    }
    else if(rating <= 1 && rating<=4.4){
        rtngbr.innerHTML = '<span class="rating">1.0</span> <i class="bi bi-star-fill star"/>';
    }
    else{
        rtngbr.innerHTML = '<span class="rating">star rating Unavailable</span>';
    }



    crdbdy.appendChild(rtngbr);
    //creating a paragrph that hold the adress of the shope
    var txt = document.createElement("p");
    //adding the recommended classes in bootrap
    txt.classList.add("card-text","my-2");
    //api text to be populated in the para
    txt.textContent = business.address;
    //putting the para into the card
    crdbdy.appendChild(txt);
    // populating the image created with the api img 
    img.src = business.main_image;
    //if the image does not load the text in the peretencese should be shown
    img.alt = "failed to load";
    //adding both classes in the image for boostrap styles to work
    img.classList.add("img-fluid","card-img-top");  
    //ading the image into the card        
    card.appendChild(crdbdy);
    //addin the content in the div in the card
    cntnr.appendChild(card);
    document.getElementById("cntnts").appendChild(cntnr); 

//contect details
    var txtcnt = document.createElement("p");
    var small = document.createElement("small");
    small.textContent=business.phone;
    small.className="text-muted";
    txtcnt.className="card-text";
    txtcnt.appendChild(small);
    crdbdy.appendChild(txtcnt);

    //button for modal
    var btn = document.createElement("button");
    var smallb = document.createElement("small");
    btn.textContent="map view";
    smallb.classList.add("text-muted","text-primary");
    btn.classList.add("btn");
    btn.setAttribute("data-target","#staticBackdrop");


    //map api

    btn.addEventListener("click", ()=>{
        document.getElementById("staticBackdropLabel").textContent = business.title;

      let map;

        map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: business.latitude, lng: business.longitude },
        zoom: 17,
      });
     new google.maps.Marker({
        position:{ lat: business.latitude, lng: business.longitude },
        map,
        title: business.title,
      });
   


    }, false);

    btn.setAttribute("data-toggle","modal");
    btn.appendChild(smallb);
    crdbdy.appendChild(btn);



//animation
//second check if there is content
     if(check.children.length>0){
        load.classList.remove("d-block");
    }
//end check



       
            })


//map




         }).catch(function (error) {

            //checkin if content is present
             console.log(error);

         }); 
    

}catch(err){

     load.classList.remove("d-block");
     con.innerHTML="<div class='text-center'><i class='bi bi-wifi-off lg-i ash'></i><br><small class='ash text-center'>you are offline<small> <br></div>";

}

 
    $('html, body').animate({scrollTop : $('#con').position().top},800);
    

}

