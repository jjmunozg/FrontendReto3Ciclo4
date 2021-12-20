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
////Json Productos
var miJsonOrden = {};
$( document ).ready(function() {
    console.log( "Estas en el perfil ASESOR orden" );
    init();
});
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html(d_user.name);
    traerInformacion();

    //////////Función para capturar el indice del dataTable
    $('#tablaMostrarProductos tbody').on( 'click', 'tr', function ()
    {
            var table = $('#tablaMostrarProductos').DataTable();
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
            pintarDataProductos();
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
function pintarDataProductos()
{
    $('#tablaMostrarProductos').dataTable( {
        responsive: true,
        data : recuperarJson,
        columns: [
            {"data": "reference"},
            {"data": "brand"},
            {"data": "category"},
            {"data": "name"},
            {"data": "availability"},
            {"data": "price"},
            {"data": "quantity"},
            {"defaultContent": "<input type='radio' name='seleccionar' />"}
        ],
    });
}
function pintarDataOrden()
{
    $('#tablaOrdenes').dataTable( {
        responsive: true,
        data : miJsonOrden,
        columns: [
            {"data": "reference"},
            {"data": "brand"},
            {"data": "category"},
            {"data": "name"},
            {"data": "availability"},
            {"data": "price"},
            {"data": "quantity"},
            {"defaultContent": "<input type='radio' name='seleccionar' />"}
        ],
    });
}
$(document).on("click", ".btn_agregarProducto", function(){
    //// Dato para recoger el Id por las filas
    console.log("AgregarProductos");
    console.log("JSON orden"+recuperarJson[miIndiceProducto].reference);
    miJsonOrden = miJsonOrden + recuperarJson[miIndiceProducto];
    pintarDataOrden();
});






