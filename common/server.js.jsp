//El usuario que est� loggeado en el servidor
var user=null;


//El context Path de la aplicaci�n
function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}