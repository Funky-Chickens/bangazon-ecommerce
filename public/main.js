'use strict';

$("#addToCart").click(function(){
    let prodToAdd = $('#singleProd').val();
    console.log("prodToAdd? in mainjs", prodToAdd);
    let prodObj = {
       prodToAdd,
       order_id //where to get this value?
    };
    console.log("prodObj in main js", prodObj)
      $.ajax({
          type: "PUT",
          url: `http://localhost:4000/order/${prodObj.order_id}`,
          data: prodObj
        })
        .then( (data) => {
        });
  });

$("#addToCart").click(function(){
    $("#addToCart").addClass("hidden");
    alert("Product Added to Cart.")
  });