$(document).ready(function(){
  count();  
}); 

function logout(id){
    $.ajax({
        url: base_url+'/api/logout',
        type: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        },
        success: function(res) {
            document.location = base_url+'/';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR.responseJSON '+btnSubmit, jqXHR.responseJSON);
        }
    });

}

function count()
{
  var countOrder = $('#countOrder');
  var countOrder1 = $('#countOrder1');
    
    $.ajax({
      url: base_url+'/api/getawatingpayment',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
      },
      success: function(res) {
        var response = res.data;
        var count = 0;
        var riwayat = 0;
        $.each(response['data'], function( index, value ) {
          if (value.status_seq == 1) {
            count = parseInt(count) + 1;
          }
          
        });
        countOrder.html(count);
        countOrder1.html(count);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('jqXHR.responseJSON ', jqXHR.responseJSON);
      }
    });
}