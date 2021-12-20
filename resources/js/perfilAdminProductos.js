var urlHost = "http://152.70.128.175:9093";
var urlUser = "/api/user/";
var urlUserNew = "/api/user/new";
var urlUserEdit = "/api/user/update";
var urlUserGet = "/api/user/all";
////
var urlProducto = "/api/cookware/";
var urlProductoNew = "/api/cookware/new";
var urlProductoEdit = "/api/cookware/update";
var urlProductosGet = "/api/cookware/all";
///
var recuperarJson;
var miIndice;
var miIndiceProducto;
$( document ).ready(function() {
    console.log( "Estas en el perfil ADMIN Productos" );
    init();
});
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html(d_user.name);
    traerInformacion();

    //////////Función para capturar el indice del dataTable
    $('#tablaUsuarios tbody').on( 'click', 'tr', function ()
    {
            var table = $('#tablaUsuarios').DataTable();
            miIndiceProducto = table.row( this ).index();
            console.log("MiIndiceProducto "+miIndiceProducto);

    });
    /////
}
function traerInformacion(){

    urlString = urlHost + urlProductosGet;
    $.ajax({
        method: "GET",
        url: urlString
    })
    .done(
        function(respuesta)
        {
            //alert("Datos"+respuesta);
            recuperarJson = respuesta;
            $('#tablaUsuarios').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "reference"},
                    {"data": "brand"},
                    {"data": "category"},
                    {"data": "materiales"},
                    {"data": "dimensiones"},
                    {"data": "description"},
                    {"data": "availability"},
                    {"data": "price"},
                    {"data": "quantity"},
                    {"data": "photography"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-primary btnEditarAbrir'>Editar</button><button type='button' class='btn btn-danger btn_borrar'>Borrar</button></div></div>"}
                ],
            });
        }
    )
    .fail(
        function()
        {
            //alert("Error servidor");
        }
    )
    .always(
        function()
        {
            //alert("siempre ejecutandose")
        }
    )
    ;
}
function agregarProductos()
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var reference = $.trim($("#reference").val());
    var brand = $.trim($("#brand").val());
    var category = $.trim($("#category").val());
    var materiales = $.trim($("#materiales").val());
    var dimensiones = $.trim($("#dimensiones").val());
    var description = $.trim($("#description").val());
    var availability = $.trim($("#availability").val());
    var price= $.trim($("#price").val());
    var quantity = $.trim($("#quantity").val());
    var photography = $.trim($("#photography").val());
    ////
    console.log("reference = "+reference);
    console.log("brand = "+brand);
    console.log("category = "+category);
    console.log("materiales = "+materiales);
    console.log("dimensiones = "+dimensiones);
    console.log("description = "+description);
    console.log("availability = "+availability);
    console.log("price = "+price);
    console.log("quantity = "+quantity);
    console.log("photography = "+photography);

    ////validación
    var miContador = $('.miFormRegistro input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormRegistro input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaRegistro').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaRegistro = banderaRegistro + 1;
    });
    ////Fin validación
    if(banderaRegistro == miContador)
    {

            let myData = {
                reference:reference,
                brand:brand,
                category:category,
                materiales:materiales,
                dimensiones:dimensiones,
                description:description,
                availability:availability,
                price:price,
                quantity:quantity,
                photography:photography,
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:urlHost+urlProductoNew,
                data: dataToSend,
                datatype:"json",
                cache: false,
                timeout: 600000,
                success:function(respuesta){
                    location.reload();
                    //console.log("URL ="+urlHost+urlUserNew);
                },
                error : function(e) {
                    alert("No FUNCIONA");
                },
                done : function(e) {
                    alert("No FUNCIONA");
                }
            });

    }

}
function f_llenarUsuarioEditar(id)
{
    $.ajax({
        url:urlHost+urlProductosGet,
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("Dato traido"+respuesta[id].reference);

            var reference = respuesta[id].reference;
            var brand = respuesta[id].brand;
            var category = respuesta[id].category;
            var materiales = respuesta[id].materiales;
            var dimensiones = respuesta[id].dimensiones;
            var description = respuesta[id].description;
            var availability = respuesta[id].availability;
            var price = respuesta[id].price;
            var quantity = respuesta[id].quantity;
            var photography = respuesta[id].photography;


            $("#reference_e").val(reference);
            $("#brand_e").val(brand);
            $("#category_e").val(category);
            $("#materiales_e").val(materiales);
            $("#dimensiones_e").val(dimensiones);
            $("#description_e").val(description);
            $("#availability_e").val(availability);
            $("#price_e").val(price);
            $("#quantity_e").val(quantity);
            $("#photography_e").val(photography);

            var myModal = new bootstrap.Modal(document.getElementById("myModalRegistroEditar"), {});
            myModal.show();
        }
    });
}
function editarInformacion()
{
    ////Recoger los valores de los inputs

    var reference = $.trim($("#reference_e").val());
    var brand = $.trim($("#brand_e").val());
    var category = $.trim($("#category_e").val());
    var materiales = $.trim($("#materiales_e").val());
    var dimensiones = $.trim($("#dimensiones_e").val());
    var description = $.trim($("#description_e").val());
    var availability = $.trim($("#availability_e").val());
    var price = $.trim($("#price_e").val());
    var quantity = $.trim($("#quantity_e").val());
    var photography = $.trim($("#photography_e").val());

    ////
    let myData = {
        reference:reference,
        brand:brand,
        category:category,
        materiales:materiales,
        dimensiones:dimensiones,
        description:description,
        availability:availability,
        price:price,
        quantity:quantity,
        photography:photography,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:urlHost+urlProductoEdit,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            location.reload();

        }
    });
}
function borrarCategoria(idElemento){
    $.ajax({
        url:urlHost+urlProductosGet,
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){

            var reference = respuesta[idElemento].reference;
            $.ajax({
                url:urlHost+urlProducto+reference,
                type:"DELETE",
                contentType:"application/JSON",
                datatype:"JSON",
                success:function(respuesta){
                    location.reload();
                }
            });
        }
    });

}


///Eventos
$(document).on("click", ".btn_agregarProductos", function(){
    //// Dato para recoger el Id por las filas
    //var count_table = ($('#tablaUsuarios').DataTable().data().count())+1;
    agregarProductos();
    //alert(table);
});
/////////// EDITAR
/////Recoger datos para el modal
$(document).on("click", ".btnEditarAbrir", function(){


    f_llenarUsuarioEditar(miIndiceProducto);

});
/////Editar
$(document).on("click", ".btn_editarUsuario", function(){
    editarInformacion();
});
////BORRAR
$(document).on("click", ".btn_borrar", function(){
    borrarCategoria(miIndiceProducto);
});

/////





