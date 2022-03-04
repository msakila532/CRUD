$( document ).ready(function() {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    //var is_ajax_fire = 0;
    manageData();
    /* manage data list */
    function manageData() {
        $.ajax({
            dataType: 'json',
            url: url+'getData.php',
            data: {page:page}
        }).done(function(data){
            total_page = Math.ceil(data.total/10);
            current_page = page;
            // $('#pagination').twbsPagination({
            //     totalPages: total_page,
            //     visiblePages: current_page,
            //     onPageClick: function (event, pageL) {
            //         page = pageL;
            //         if(is_ajax_fire != 0){
            //           getPageData();
            //         }
            //     }
            // });
            manageRow(data.data);
            //is_ajax_fire = 1;
        });
    }

    /* Get Page Data*/
    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: url+'getData.php',
            data: {page:page}
        }).done(function(data){
            manageRow(data.data);
        });
    }

    /* Add new Item table row */
    function manageRow(data) {
        var	rows = '';
        $.each( data, function( key, value ) {
              rows += '<tr>';
              rows +=  '<td>'+value.name+'</td>';
              rows += '<td>'+value.code+'</td>';
              rows +=  '<td>'+value.price+'</td>';
              rows += "<td><button type='button' class='pls-minus'> - </button><input type='number' name='quantity' value='"+value.quantity+"' style='width:15%;' min='0'><button type='button' class='pls-altera'> + </button></td>";
              //rows += '<td>'+value.quantity+'</td>';
              rows += '<td data-id="'+value.id+'">';
              rows += '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
              rows += '<button class="btn btn-danger remove-item">Delete</button>';
              rows += '</td>';
              rows += '</tr>';
        });
        $("tbody").html(rows);
    }
    
    
    /* Create new Item */
    $(".crud-submit").click(function(e){
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var name = $("#create-item").find("input[name='pname']").val();
        var code = $("#create-item").find("input[name='code']").val();
        var price = $("#create-item").find("input[name='price']").val();
        var quantity = $("#create-item").find("input[name='quantity']").val();
        if(name != '' && code != '' && price != '' && quantity != '' ){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url+form_action,
                data:{name:name, code:code, price:price, quantity:quantity}
            }).done(function(data){
                $("#create-item").find("input[name='pname']").val('');
                $("#create-item").find("input[name='code']").val('');
                $("#create-item").find("input[name='price']").val('');
                $("#create-item").find("input[name='quantity']").val('');
                getPageData();
                $(".modal").modal('hide');
                toastr.success('Item Created Successfully.', 'Success Alert', {timeOut: 5000});
                
            });
        }else{
            alert('You are missing Details')
        }
    
    
    });
    
    
    /* Remove Item */
    $("body").on("click",".remove-item",function(){
        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");
        $.ajax({
            dataType: 'json',
            type:'POST',
            url: url + 'delete.php',
            data:{id:id}
        }).done(function(data){
            c_obj.remove();
            toastr.success('Item Deleted Successfully.', 'Success Alert', {timeOut: 5000});
            getPageData();
        });
    });
    
    
    /* Edit Item */
    $("body").on("click",".edit-item",function(){
        var id = $(this).parent("td").data('id');
        var name= $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
        var code = $(this).parent("td").prev("td").prev("td").prev("td").text();
        var price = $(this).parent("td").prev("td").prev("td").text();
        var quantity= $(this).parent("td").prev("td").find("input[name='quantity']").val();

        $("#edit-item").find("input[name='pname']").val(name);
        $("#edit-item").find("input[name='code']").val(code);
        $("#edit-item").find("input[name='price']").val(price);
        $("#edit-item").find("input[name='quantity']").val(quantity);
        $("#edit-item").find(".edit-id").val(id);
    });
    
    
    /* Updated new Item */
    $(".crud-submit-edit").click(function(e){
        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var name = $("#edit-item").find("input[name='pname']").val();
        var code = $("#edit-item").find("input[name='code']").val();
        var price = $("#edit-item").find("input[name='price']").val();
        var quantity = $("#edit-item").find("input[name='quantity']").val();
        var id = $("#edit-item").find(".edit-id").val();
        if(name!= '' && code!= '' && price!= ''&& quantity!= ''){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url + form_action,
                data:{name:name, code:code, price:price, quantity:quantity, id:id}
            }).done(function(data){
                $(".modal").modal('hide');
                toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
                getPageData();
            });
        }else{
            alert('You are missing Details.')
        }
    
    
    });
    });

    /* Increase Decrese Quantity*/
    
    $(document).ready(function() {
        $(document).on("click",".pls-altera",function() {
        var id = $(this).parent("td").next("td").data('id');
        var curr_quantity = $(this).prev().val();
         curr_quantity = parseInt(curr_quantity)+1;
         $(this).prev().val(curr_quantity);
         update_quantity(curr_quantity,id);
     
  });
  $(document).on("click",".pls-minus",function() {
    var curr_quantity = $(this).next().val();
    var id = $(this).parent("td").next("td").data('id');
         if(curr_quantity != 0) {
             curr_quantity = parseInt(curr_quantity)-1;
             $(this).next().val(curr_quantity);
             update_quantity(curr_quantity,id);
              
         }
  
    
     });


     function update_quantity(curr_quantity,id){
        $.ajax({
            dataType: 'json',
            type:'POST',
            url: url + 'current_qty.php',
            data:{quantity:curr_quantity,id:id}
        }).done(function(data){
            getPageData();
        });
        
    }
});