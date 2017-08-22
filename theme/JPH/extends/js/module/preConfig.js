showSubmit()
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    showSubmit()

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    showSubmit()
    procesarEntidad(data)
}
function showSubmit(){
    var elem = $$('#div2 .item').length;

    if(elem>0){
        $$('#submit').show()
    }else{
        $$('#submit').hide()
    }
}
/* Funcion que permite eliminar las entidades y agregar entidades */
function  procesarEntidad(data) {
    var elem1 = $$('#div1 .item#'+data);
    var elem2 = $$('#div2 .item#'+data);
    var token;
    var msj;
    if(parseInt(elem1.length)==1 && parseInt(elem2.length)==0)
    {
        token = '<?php echo md5('delete')?>';
        msj = 'Entidad '+data+' fue extraida del panel de configuración';
    }else if(parseInt(elem1.length)==0 && parseInt(elem2.length)==1){
        token = '<?php echo md5('create')?>';
        msj = 'Entidad '+data+' fue agregada al panel de configuración';
    }

    // create a new Class instance
    var myRequest = new Request.JSON({
        url: '/setEntidadesProcesar',
        method: 'POST',
        data: {'token': token, 'entidad' : data},
        onSuccess: function(dataJson){
            informar(msj);
        }
    }).send();

}
$$('#enviarDatos').addEvent('click',function (e) {
    window.location.href='/configCampos';
});