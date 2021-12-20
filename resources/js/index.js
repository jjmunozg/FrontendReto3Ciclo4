var urlHost = "http://152.70.128.175:9093";
var urlUser = "/api/user/";
var urlUserNew = "/api/user/new/";
$( document ).ready(function() {
    console.log( "Estas en la página Inicio" );
    init();
});
function init()
{
    $(".confirmacionRegistro").hide();
}
function login()
{
    console.log("Mi boton Login Funciona");
    ///Variables
    var banderaLogin = 0;
    var miContador = $('.miFormLogin input').length;
    //var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    ////Recoger los valores de los inputs
    var usuario_login = $.trim($("#usr_login").val());
    var password_login = $.trim($("#pwd_login").val());
    ////
    console.log("usuario_login = "+usuario_login);
    console.log("password_login = "+password_login);
    ///
    ////validación
    console.log("contadorRegistro = "+miContador);

    $('.miFormLogin input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaLogin').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaLogin = banderaLogin + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaLogin == miContador){

        if(!validarEmail(usuario_login)){
            $('.alertaEmail').html("Email incorrecto");
        }
        else{
        
            $.ajax({
                url:urlHost+urlUser+usuario_login+"/"+password_login,
                type: "GET",
                datatype:"JSON",
                success:function(respuesta){
                    console.log(respuesta);
                    console.log("id "+respuesta.id);
                    if(respuesta.id === null)
                    {
                        $("#usr_login").focus();
                        $(".alertaLogin").html("Usuario o contraseña INCORRECTOS");
                    }
                    else
                    {
                        console.log("ENTRO");
                        validarPerfiles(respuesta.type);
                        sessionStorage.setItem('miUser', JSON.stringify(respuesta));
                    }
                }
            });
        }
    }
}

function validarPerfiles(perfil)
{
    switch (perfil) {
        case 'ADM':
            console.log('Perfil Admin');
            window.location.href = "perfilAdmin.html";
            break;
        case 'COORD':
            console.log('Perfil Coordinador');
            break;
        case 'ASE':
            console.log('Perfil Asesor');
            window.location.href = "asesorPerfil.html";
            break;
        }
}
$(document).on("click",".btn_login",function() {
    login();
});


function validarEmail(email) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
     //alert("La dirección de email " + email + " es correcta!.");
     return true;
    } else {
     //alert("La dirección de email es incorrecta!.");
     return false;
    }
  }

  function emailexite(email) {
    validar = null;   
  $.ajax({
        //url:"http://152.70.128.175:9090/api/user/"+email,
        url:urlHost+urlUser+email,
        type: "GET",
        datatype:"JSON",
        async: false,
        success:function(respuesta){
                     
            console.log("emailexite "+respuesta);
            validar = respuesta;
            console.log("validar "+validar);
            
        }
    });

    return validar;
   
  }

function registrarUsuario()
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var id = Math.floor(Math.random() * (9999 - 1)) + 1;
    var identification = $.trim($("#identificacion").val());
    var name = $.trim($("#nombre").val());
    var address = $.trim($("#direccion").val());
    var cellPhone = $.trim($("#celular").val());
    var email = $.trim($("#mail").val());
    var password = $.trim($("#pwd").val());
    var password_r = $.trim($("#pwr_r").val());
    var zone = $.trim($("#zona").val());
    var type = $.trim($("#tipo").val());
    ////
    console.log("ID = "+id);
    console.log("identification = "+identification);
    console.log("name = "+name);
    console.log("address = "+address);
    console.log("cellPhone = "+cellPhone);
    console.log("email = "+email);
    console.log("password = "+password);
    console.log("password_r = "+password_r);
    console.log("zone = "+zone);
    console.log("type = "+type);
    ////validación
    var miContador = $('.miFormRegistro input').length;
    console.log("contadorRegistro = "+miContador);
    console.log("emailexiste en registro = "+emailexite(email));
    $('.miFormRegistro input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaRegistro').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaRegistro = banderaRegistro + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaRegistro == miContador)
    {
        if(password != password_r)
        {
            $('.alertaRegistro').html("Los password deben coincidir");

        }else if(!validarEmail(email)){

            $('.alertaEmail').html("Email incorrecto");

        }else if(emailexite(email)){

            $('.alertaEmailexiste').html("Email ya existe");

        }else { 

            let myData = {
                id:id,
                identification:identification,
                name:name,
                address:address,
                cellPhone:cellPhone,
                email:email,
                password:password,
                zone:zone,
                type:type
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                //url:"http://152.70.128.175:9090/api/user/new",
                url:urlHost+urlUserNew,
                data: dataToSend,
                datatype:"json",
                cache: false,
                timeout: 600000,
                success:function(respuesta){
                    $(".confirmacionRegistro").show();
                    $(".miFormRegistro").hide();
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

}

$(document).on("click",".btn_registrarse",function() {
    registrarUsuario();
});