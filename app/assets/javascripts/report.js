$(function(){

    function print(){
        $("#report").printElement({
            pageTitle:'Titulo do Relatório'
        });
    }

    $("#imprimir").click(function(){
        print();

        return false;
    });

    shortcut.add('F9', function(){
        print();
    });

});