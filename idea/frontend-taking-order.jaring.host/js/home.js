$(document).ready(function() {
    getMarket();
    getProductDiscount();
    getBanner();
});

function getMarket(page = 1) {
    $('#loading').show();
    var list_market = $('#cate');
    list_market.html('');
    $.ajax({
        url: base_url + '/api/getmarket',
        type: 'GET',
        data: 'page=' + page,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        success: function(res) {
            $('#loading').hide();
            var response = res.data;
            list_market.html('<div id="testing" class="owl-carousel cate-slider owl-theme"></div>');
            $.each(response['data'], function(index, value) {


                if (value.is_active == true) {
                    var market = `<div class="item">
                            <a href="${base_url}/${value.id}/${value.market_name}/${value.city_name}/product" class="category-item">
                              <div class="cate-img">
                                <img src="${base_url}/asset-new/icon-pasar.png" alt="">
                              </div>
                              <div class="name-pasar">${value.market_name}</div>
                            </a>
                          </div>`;

                } else {
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
            $('#testing').owlCarousel({
                margin: 30,
                nav: true,
                dots: false,
                navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 4
                    },
                    1200: {
                        items: 6
                    },
                    1400: {
                        items: 6
                    }
                }
            })

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
        }
    });
}

function getProductDiscount(page = 1, id_commodity = null, search = null, id_market = null) {
    $('#loading_discount').show();
    var id_market = $('#id_market').val();
    var select = $('#product_discount');
    select.html('');
    $.ajax({
        url: base_url + '/api/getproduct/discount',
        type: 'GET',
        data: {
            id_market: id_market,
            page: page,
            id_commodity: id_commodity,
            search: search
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        success: function(res) {
            $('#loading_discount').hide();
            var response = res.data;
            console.log(response);
            $.each(response['data'], function(index, value) {
                var amount = parseInt(value.price) - parseInt(value.discount_amount);
                if (value.type_id == 1) {
                    var optionunit = `
              <li>
                <input type="radio" id="units${value.id_market_product}" class="${value.unit_name}" value="${value.price}" onclick="handleClick(this, ${value.product_id});" name="unit_key">
                <label for="units${value.id_market_product}">${convertToRupiah(parseInt(value.price))} / ${value.unit_name}</label>
                <input type="hidden" id="unit_name${value.id_market_product}" value="${value.unit_name}">
              </li>`;
                    var jenis = 'Satuan';
                } else {
                    var optionunit = `
                <li>
                  <input type="radio" id="denom${value.id_market_product}" class="${value.unit_name}" value="${value.price}" onclick="handleClick(this, ${value.product_id});" name="unit_key">
                  <label for="denom${value.id_market_product}">${convertToRupiah(parseInt(value.price))} / ${value.unit_name}</label>
                  <input type="hidden" id="denom_name${value.id_market_product}" value="${value.unit_name}">
                </li>`;
                    var jenis = 'Denominasi';
                }


                var input = `<input type="hidden" id="id_market${value.product_id}" value="${value.market_id}">
                        <input type="hidden" id="id_product${value.product_id}" value="${value.product_id}" >
                        <input type="hidden" id="id_unit${value.product_id}">
                        <input type="hidden" id="unit_name${value.product_id}">
                        <input type="hidden" id="qty${value.product_id}">
                        <input type="hidden" id="id_type${value.product_id}">
                        <input type="hidden" id="product_name${value.product_id}" value="${value.product_name}">
                        <input type="hidden" id="product_price${value.product_id}">
                        <input type="hidden" id="img_product${value.product_id}" value="${value.product_img}">`;
                var options =
                    `<div class="col-lg-3 col-md-3 col-12">
                  <div class="product-item mb-30">
                    <a href="${base_url}/${id_market}/product/single/${value.product_id}" class="product-img">
                      <img src="${value.product_img}" alt="">
                      <div class="product-absolute-options">
                        <span class="offer-badge-1">${value.discount}% off</span>
                        <span class="like-icon" title="wishlist"></span>
                      </div>
                    </a>
                <div class="product-text-dt">
                  <p>${value.product_name}</p>
                  <div class="text-commodity">${value.commodity_name}</div>
                  <div class="row">
                    <div class="col-md-8 col-lg-8 col-8">
                      <div class="filtr-cate-title">
                        <div class="text-satuan">${jenis}</div>
                      </div>
                        <div class="filter-denom-unit-disc scrollstyle_4">
                        <ul class="kggrm-now">
                          <div class="text-price-denom">${optionunit}</div>
                        </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-4">
                    </div>
                    <div class="col-lg-12 col-md-12 col-12">
                    <hr>
                    </div>
                    <div class="col-lg-7 col-md-7 col-7">
                        <div class="text-price-discount"><span class="outer"><span class="inner">${convertToRupiah(value.price)}</span></span></div>
                        <div class="text-price">${convertToRupiah(amount)}<span> ${value.unit_name}</span></div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-5">
                        <div class="bg-btn-qty">
                          <div class="quantity buttons_added">
                            <input type="button" value="-" class="minus minus-btn">
                            <input type="number" step="1" id="quantity${value.product_id}" name="quantity" value="1" class="input-text qty text">
                            <input type="button" value="+" class="plus plus-btn">
                          </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-12">
                      <div id="inputan_discount${value.product_id}"></div>
                      <button style="button" class="btn-cart-new" id="btn_cart${value.product_id}" onclick="addCart(${value.product_id})" disabled>+ Keranjang</button>
                    </div>
                </div>
            </div>
            </div>
              `;
                select.append(options);
                $('#inputan_discount' + value.product_id).append(input);

            });

            $('#links_discount').html('');
            var pre = `<li id="prev_discount" class="page-item"><a class="page-link" href="#" onclick="getProductDiscount(${parseInt(res.data.current_page)-1})">Previous</a></li>`;
            $('#links_discount').append(pre);

            for (var i = 1; i <= res.data.last_page; i++) {
                var link = `<li class="page-item"><a class="page-link" onclick="getProductDiscount(${i})" href="#">${i}</a></li>`;
                if (res.data.current_page == i) {
                    var link = `<li class="page-item active"><a class="page-link active" onclick="getProductDiscount(${i})" href="#">${i}</a></li>`;
                }
                $('#links_discount').append(link);
            }
            var nex = `<li id="next_discount" class="page-item"><a class="page-link" onclick="getProductDiscount(${parseInt(res.data.current_page)+1})" href="#">Next</a></li>`;
            $('#links_discount').append(nex);
            if (res.data.current_page == 1) {
                var prev = document.getElementById("prev_discount");
                prev.classList.add("disabled");
            } else {
                var prev = document.getElementById("prev_discount");
                prev.classList.remove("disabled");
            }

            if (res.data.current_page == res.data.last_page) {
                var next = document.getElementById("next_discount");
                next.classList.add("disabled");
            } else {
                var next = document.getElementById("next_discount");
                next.classList.remove("disabled");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
        }
    });
}

function handleClick(myRadio, id_product) {
    var typeId = 1;
    var unit_name = $('#unit_name' + myRadio.id.substr(5)).val();
    if (myRadio.id.substr(0, 5) === 'denom') {
        typeId = 2;
        unit_name = $('#denom_name' + myRadio.id.substr(5)).val();
    }
    $('#btn_cart' + id_product).prop('disabled', false);
    $('#id_unit' + id_product).val(myRadio.id.substr(5));
    $('#id_type' + id_product).val(typeId);
    $('#product_price' + id_product).val(myRadio.value);
    $('#unit_name' + id_product).val(unit_name);
}

function addCart(id) {
    var qty = $('#quantity' + id).val();
    var whoop = document.getElementById("whoops");
    requiredValidasi = true;
    var url = base_url + '/api/addtocart';
    var type = 'POST';
    form = document.getElementById('form_cart');
    var formData = new FormData(form);
    formData.append("id_market", $('#id_market' + id).val());
    formData.append("id_product", $('#id_product' + id).val());
    formData.append("product_name", $('#product_name' + id).val());
    formData.append("id_unit", $('#id_unit' + id).val());
    formData.append("qty", qty);
    formData.append("unit_name", $('#unit_name' + id).val());
    formData.append("id_type", $('#id_type' + id).val());
    formData.append("product_price", $('#product_price' + id).val());
    formData.append("img_product", $('#img_product' + id).val());
    formData.append("discount", 0);
    formData.append("discount_amount", 0);
    $('#form_cart').find('.required').each(function() {
        if (($(this).val()) === "" || ($(this).val()) === "-" || ($(this).val()) === " ") {
            requiredValidasi = false;
        }

    });

    if (requiredValidasi != false) {
        $.ajax({
            type: type,
            contentType: false,
            processData: false,
            url: url,
            data: formData,
            success: function(response) {
                getCart();
                $('#chartmodal').modal('show');
            }
        });
    } else {
        whoop.style.display = "block";
        whoop.innerHTML = '<strong>Whoops!</strong> There were some problems with your input.';
    }
}


function getBanner() {
    var select = $('#banner');
    select.html('');
    var list_promo = $('#list_promo');
    list_promo.html('');
    $.ajax({
        url: base_url + '/api/getbanner',
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        success: function(res) {
            var response = res.data;
            list_promo.html('<div id="promo" class="owl-carousel featured-slider owl-theme"></div>');
            response.map(function(r) {
                if (parseInt(r.content_type_id) == 1) {
                    var options = `
              <div class="col-lg-4 col-md-4 col-6">
                <a href="#" class="best-offer-item">
                  <img style="height:100%; width:100%" src="${r.content_img}" alt="">
                </a>
              </div>
            `;

                } else {
                    var promo = `<div class="item">
                            <a href="#" class="best-offer-item">
                              <img src="${r.content_img}" alt="">
                            </a>
                          </div>`;
                }
                $(".featured-slider").append(promo);
                select.append(options);
            });
            $('#promo').owlCarousel({
                items: 8,
                loop: false,
                margin: 10,
                nav: true,
                dots: false,
                navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    },
                    1400: {
                        items: 5
                    }
                }
            })

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
        }
    });
}