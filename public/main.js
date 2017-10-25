'use strict';

$("#addToCart").click(function(){
    let prodToAdd = $('#singleProd').val();
    let prodObj = {
       prodToAdd,
       order_id
    };
      $.ajax({
          type: "PUT",
          url: `http://localhost:4000/order/${order_id}`,
          data: prodObj
        })
        .then( (data) => {
        });
  });

$("#addToCart").click(function(){
    $("#addToCart").addClass("hidden");
    alert("Product Added to Cart.")
  });