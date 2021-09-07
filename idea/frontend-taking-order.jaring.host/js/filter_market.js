$(document).ready(function(){
  
  getProvince();
  $( "#province" ).change(function() {
    getCity();
  });
  $( "#city" ).change(function() {
    getDistrict();
  });
  $( "#district" ).change(function() {
    getArea();
  });

  getMarketType();
  getMarketCategory();
  getMarketClass();
  getMarketPurpose();
});    

function getProvince()
{
  var select = $('#province');
    select.html('');
    select.append('<option selected disabled value="">Semua Provinsi</option>')
    $.ajax({
      url: base_url+'/api/getprovince',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = `<option value='${r.id}'>${r.province_name}</option>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function getCity(idProvince = null)
{
  if (idProvince == null) {
      var provinceId = $('#province').val();
    }else{
      var provinceId = idProvince;
    }
  var select = $('#city');
    select.html('');
    $.ajax({
      url: base_url+'/api/getcity',
      type: 'GET',
      data: 'id_province='+provinceId,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = `<option value='${r.id}'>${r.city_name}</option>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function getDistrict(idCity = null)
{
    var select = $('#district');
    if (idCity == null) {
      var cityId = $('#city').val();  
    }else{
      var cityId = idCity;  
    }
    select.html('');
    $.ajax({
      url: `${base_url}/api/getdistrict`,
      type: 'GET',
      data: 'id_city='+cityId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = `<option value='${r.id}'>${r.district_name}</option>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });

}

function getArea(idDistrict = null)
{
    var select = $('#area');
    if (idDistrict == null) {
      var districtId = $('#district').val();  
    }else{
      var districtId = idDistrict;  
    }
    select.html('');
    select.append('<option selected disabled value="">-- Select --</option>')
    $.ajax({
      url: `${base_url}/api/getarea`,
      type: 'GET',
      data: 'id_district='+districtId,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = `<option value='${r.id}'>${r.area_name}</option>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });

}

function getMarketType()
{
  var select = $('#market_type');
    select.html('');
    $.ajax({
      url: base_url+'/api/getmarkettype',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = 
          `<li>
              <input type="radio" id="type_market${r.id}" value="${r.id}" name="type_market">
              <label for="${r.id}">${r.market_type_name}</label>
            </li>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function getMarketCategory()
{
  var select = $('#market_category');
    select.html('');
    $.ajax({
      url: base_url+'/api/getmarketcategory',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = 
          `<li>
              <input type="radio" id="category_market${r.id}" value="${r.id}" name="category_market">
              <label for="${r.id}">${r.market_category_name}</label>
            </li>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function getMarketClass()
{
  var select = $('#market_class');
    select.html('');
    $.ajax({
      url: base_url+'/api/getmarketclass',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = 
          `<li>
              <input type="radio" id="class_market${r.id}" value="${r.id}" name="class_market">
              <label for="${r.id}">${r.market_class_name}</label>
            </li>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

function getMarketPurpose()
{
  var select = $('#market_purpose');
    select.html('');
    $.ajax({
      url: base_url+'/api/getmarketpurpose',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = 
          `<li>
              <input type="radio" id="purpose_market${r.id}" value="${r.id}" name="purpose_market">
              <label for="${r.id}">${r.market_purpose_name}</label>
            </li>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}
function resetFilter(){
  $("#form_filter")[0].reset();
  var select = $('#market');

    select.html('');
    $.ajax({
      url: base_url+'/api/getmarket',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        response.map(function(r){
          var options = 
          `<div class="col-lg-4 col-md-6">
              <div class=" how-order-steps blog-top-item media container">
                <div class="media-left">
                  <img class="ft-plus-square icon-bg-circle bg-cyan mr-0" src="${base_url}/images/blog/img-2.jpg" alt="">
                </div>
                <div class="media-body" style="text-align: left; padding-left: 10px">
                  <a href="blog_detail_view.html" class="top-post-link">
                    <h3>${r.market_name}</h3>
                    <p>${r.address}</p>
                  </a>
                </div>
              </div>
            </div>`;
          select.append(options);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}
function submitFilter(page = 1)
{
  var areaId = $('#area').val();
  var typeId = null;
  var categoryId = null;
  var classId = null;
  var purposeId = null;
  typeId = $("input[type='radio'][name='type_market']:checked").val();
  categoryId = $("input[type='radio'][name='category_market']:checked").val();
  classId = $("input[type='radio'][name='class_market']:checked").val();
  purposeId = $("input[type='radio'][name='purpose_market']:checked").val();
  
    $('#loading').show();
      var list_market = $('#cate');
  list_market.html('');
     
      
    $.ajax({
      url: base_url+'/api/getmarket',
      type: 'GET',
      data: { page:page,id_area: areaId, id_type: typeId, id_category: categoryId, id_class: classId,id_purpose: purposeId},
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        $('#loading').hide();
        var response = res.data;
        
        list_market.html('<div id="testing" class="owl-carousel cate-slider owl-theme"></div>');
        $.each(response['data'], function( index, value ) { 
          if (value.is_active == true) {
            var market = `<div class="item">
                            <a href="${base_url}/${value.id}/product" class="category-item">
                              <div class="cate-img">
                                <img src="${base_url}/asset-new/icon-pasar.png" alt="">
                              </div>
                              <div class="name-pasar">${value.market_name}</div>
                            </a>
                          </div>`;

            }else{
               var market = `<div class="item">
                            <div style="opacity : 0.2" class="categories-item">
                              <div class="cate-img">
                                <img src="${base_url}/asset-new/icon-pasar.png" alt="">
                              </div>
                              <div class="name-pasar">${value.market_name}</div>
                            </div>
                          </div>`;
            }
          $(".cate-slider").append(market);
        });
  
       $('#testing').owlCarousel({margin:30,nav:true,dots:false,navText:["<i class='uil uil-angle-left'></i>","<i class='uil uil-angle-right'></i>"],responsive:{0:{items:2},600:{items:2},1000:{items:4},1200:{items:6},1400:{items:6}}}) 
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}

