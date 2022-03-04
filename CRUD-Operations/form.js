$( document ).ready(function() {
    var form_flag=0;
    var page = 1;
    manageData();
    /* manage data list */
    function manageData() {
        $("#create-item").find("input[name='pname']").val('');
        $("#create-item").find("input[name='code']").val('');
        $("#create-item").find("input[name='price']").val('');
        $("#create-item").find("input[name='quantity']").val('');
        $.ajax({
            dataType: 'json',
            url: url+'getData.php',
            data: {page:page}
        }).done(function(data){
            manageRow(data.data);
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
        //var form_action = $("#create-item").find("form").attr("action");
        var name = $("#create-item").find("input[name='pname']").val();
        var code = $("#create-item").find("input[name='code']").val();
        var price = $("#create-item").find("input[name='price']").val();
        var quantity = $("#create-item").find("input[name='quantity']").val();
        if(name != '' && code != '' && price != '' && quantity != '' ){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url+'create.php',
                data:{name:name, code:code, price:price, quantity:quantity}
            }).done(function(data){
                $("#create-item").find("input[name='pname']").val('');
                $("#create-item").find("input[name='code']").val('');
                $("#create-item").find("input[name='price']").val('');
                $("#create-item").find("input[name='quantity']").val('');
                getPageData();
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

        $("#create-item").find("input[name='pname']").val(name);
        $("#create-item").find("input[name='code']").val(code);
        $("#create-item").find("input[name='price']").val(price);
        $("#create-item").find("input[name='quantity']").val(quantity);
        $("#create-item").find(".edit-id").val(id);
    });
    
    


    
    /* Updated new Item */
    $(".crud-submit").click(function(e){
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var name = $("#create-item").find("input[name='pname']").val();
        var code = $("#create-item").find("input[name='code']").val();
        var price = $("#create-item").find("input[name='price']").val();
        var quantity = $("#create-item").find("input[name='quantity']").val();

        var id = $("#create-item").find(".edit-id").val();
        if(name!= '' && code!= '' && price!= ''&& quantity!= ''){
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: url + form_action,
                data:{name:name, code:code, price:price, quantity:quantity, id:id}
            }).done(function(data){
                getPageData();
                toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
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
    var id = $(this).parent("td").next("td").data('id');
    var curr_quantity = $(this).next().val();
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

 