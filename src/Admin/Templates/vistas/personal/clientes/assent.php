    // Definicion los campos del DataTable de esta vista
    var Config = {};
    Config.colums = [
        { "data": "nombres" },
        { "data": "apellidos" },
        { "data": "correo" },
        { "data": "estatus" },
    ];

    // Configuracion de visual del DataTable
    Config.show = {
        "display":10,
        "search":true,
        "pagina":true,
        "rowid": "id"
    }

    // Configuracion de relacion de entidad
    Config.relacionPadre = {
        "field":"",
        "value": ""
    }

