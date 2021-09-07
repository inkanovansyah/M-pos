$(document).ready(function(){
  getCart();
});    

function addToCart()
{
  var quantity = $('#quan').val();
  var qty = $('#qty').val(quantity);
  var whoop = document.getElementById("whoops");
  requiredValidasi = true; 
  var url = base_url+'/api/addtocart';
  var type = 'POST';
  form = document.getElementById('form_cart');
  var formData = new FormData(form);
  formData.append("id_market", $('input[name="id_market"]').val());
  formData.append("id_product", $('input[name="id_product"]').val());
  formData.append("product_name", $('input[name="product_name"]').val());
  formData.append("id_unit", $('input[name="id_unit"]').val());
  formData.append("qty", $('input[name="qty"]').val());
  formData.append("unit_name", $('input[name="unit_name"]').val());
  formData.append("product_price", $('input[name="product_price"]').val());
  formData.append("product_img", $('input[name="img_product"]').val());
  formData.append("discount", 0);
  formData.append("discount_amount", 0);
  $('#form_cart').find('.required').each(function(){
    if (($(this).val())=== "" || ($(this).val())=== "-" || ($(this).val())=== " "){
        requiredValidasi = false;        
      }

  });

  if(requiredValidasi != false){
    $.ajax({
      type: type,            
          contentType: false,
          processData: false,
      url: url,                 
      data: formData, 
      success: function(response){
        getCart();
        $('#chartmodal').modal('show');
      }
    });  
  }else{
    whoop.style.display = "block";
    whoop.innerHTML = '<strong>Whoops!</strong> There were some problems with your input.';
  }
}

function getCart()
{
  var select = $('#cart');
    select.html('');
    $.ajax({
      url: base_url+'/api/getcart',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        var countData = 0;
        countData = response.length;
        $('#countData').html(countData+' (Items)');
        $('#countCart').html(countData);
        var subTotal = 0;
        var subTotalDiscount = 0;
        var total = 0;
        response.map(function(r){
          if (parseInt(r.discount) > 0) {
            var discount = parseInt(r.price) - parseInt(r.discount_amount);
            var price = `<div class="cart-item-price"><span>${convertToRupiah(r.price)}</span>&nbsp;&nbsp;${convertToRupiah(discount)}</div>`;
            var lable = `<div class="offer-badge">${r.discount}% OFF</div>`;
          }else{
            var price = `<div class="cart-item-price">${convertToRupiah(r.price)}</div>`;
            var lable = ``;
          }
          var options = `<div class="cart-item">
          <div class="cart-product-img">
            <img src="${r.product_img}" alt="">
            ${lable}
          </div>
          <div class="cart-text">
            <h4>${r.product_name}</h4>
            <div class="cart-radio">
              <ul class="kggrm-now">
                <li>
                  <input type="radio" id="${r.id_product}${r.id_unit}" name="${r.id_product}${r.unit_name}" checked>
                  <label style="width:70px" for="${r.id_product}${r.id_unit}">${r.unit_name}</label>
                </li>
              </ul>
            </div>
              ${price}
            <div class="qty-group">
              <div class="quantity buttons_added">
                <input type="button" onclick="updateCart(${r.id_unit}${r.id_product},'minus');" value="-" class="minus minus-btn">
                <input type="number"  id="quantity${r.id_unit}${r.id_product}" name="quantity${r.id_unit}${r.id_product}" value="${r.qty}" class="input-text qty text">
                <input type="button" onclick="updateCart(${r.id_unit}${r.id_product}, 'plus');" value="+" class="plus plus-btn">
              </div>
            </div>
            <button type="button" onclick="removeCart(${r.id_product},${r.id_unit});" class="cart-close-btn"><i class="uil uil-trash"></i></button>
          </div>
        </div>`;
        subTotal = parseInt(r.qty) * parseInt(r.price);
        subTotalDiscount = parseInt(r.qty) * parseInt(r.discount_amount);
        total = parseInt(total) + parseInt(subTotal) - parseInt(subTotalDiscount);
        select.append(options);
        });
        $('#total').html(convertToRupiah(total));
        if (countData>0) {
          $('#btnCheckout').html('<a href="'+base_url+'/checkout" style="color:#FFF;" class="cart-checkout-btn hover-btn">Beli</a>');
        }else{
          $('#btnCheckout').html('<a class="cart-checkout-btn hover-btn">Beli</a>');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function removeCart(id, unit)
{
  if (confirm('Hapus data ini ?')) 
    {
        $.ajax({
            url: base_url+'/api/removecart',
            type: 'POST',
            data: {id_product:id, id_unit:unit},
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '
            },
            success: function(res) {
                getCart();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('jqXHR.responseJSON '+btnSubmit, jqXHR.responseJSON);
            }
        });
    }
}

function updateCart(id, type)
{
    var qty = parseInt($("input[name=quantity"+id+"]").val());

    if (type === 'minus') 
    {
      $("input[name=quantity"+id+"]").val(qty -1);
    }else{
      $("input[name=quantity"+id+"]").val(qty +1);
    }

    var quantity = $("input[name=quantity"+id+"]").val();
    $.ajax({
        url: base_url+'/api/updatecart',
        type: 'POST',
        data: {id_product:id, quantity: quantity},
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        success: function(res) {
            getCart();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR.responseJSON '+btnSubmit, jqXHR.responseJSON);
        }
    });
}

function convertToRupiah(angka)
{
    var rupiah = '';        
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}