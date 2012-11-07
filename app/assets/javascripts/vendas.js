function ProdutoModel(id, nome){
    this.id = id;
    this.nome = ko.observable(nome);
    this.preco = ko.observable(10);
    this.quantidade = ko.observable(1);

    this.total = ko.computed(function(){
        return this.preco() * this.quantidade();
    }, this);
}

function VendasModel(){
    this.desconto = ko.observable(0);
    this.produtos = ko.observableArray([]);

    this.total = ko.computed(function(){
        return this.produtos().reduce(function (acumulador, item) {
            return acumulador + item.total();
        }, 0).toFixed(2);
    }, this);
}

var vendas;

$(function(){

    shortcut.add('F2', function(){
        $('#pesquisa').focus();
    });

    shortcut.add('F3', function(){
        $( '#fechar-venda' ).dialog({
            title: 'Fechar Venda',
            modal: true,
            resizable: false,
            height: 300,
            width: 400,
            buttons: {
                Fechar: function(){
                    $.ajax({
                        type: 'post',
                        url: '/vendas/fechar/',
                        data: {
                            desconto: vendas.desconto(),
                            itens: vendas.produtos()
                        },
                        dataType: 'json',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
                        success: function() {
                            $('#fechar-venda').dialog('close');
                        }
                    });
                }
            }
        });
    });

    reajusta();

    function reajusta(){
        var heightLeftAndContent = $(window).height() * 0.8;
        var heightFooter = $(window).height() * 0.2;

        var widthLeft = $(window).width() * 0.2;
        var widthContent = $(window).width() * 0.75;

        var heightHeader = $('#header').height();

        $('#left').css('height', (heightLeftAndContent - heightHeader) + 'px');
        $('#left').css('width', widthLeft + 'px');

        $('#content').css('height', (heightLeftAndContent - heightHeader) + 'px');
        $('#content').css('width', widthContent + 'px');

        $('#grid').css('height', heightLeftAndContent + 'px');
        $('#grid').css('width', widthContent + 'px');

        $('#footer').css('height', heightFooter + 'px');
    }

    $(window).resize(function(){
        reajusta();
    });

    $('#pesquisa').autocomplete({
        minLength: 2,
        delay: 1000,
        source: '/produtos/pesquisa',
        select: function(event, ui) {
            vendas.produtos.push(new ProdutoModel(ui.item.id, ui.item.label));
        },
        close: function() {
            $('#pesquisa').val('');
        }
    });

    vendas = new VendasModel();

    ko.applyBindings(vendas);

    shortcut.add('F4', function(){

        window.open('/vendas/recibo');

        /*var id = Math.floor((Math.random()*10)+1);

        $.ajax({
            type: "GET",
            url: "/vendas/report?id=" + id,
            success: function(response) {
                $("a.media").attr("href", "/recibo"+ id +".pdf");

                $("a.media").media({
                    height:500,
                    width:700
                });

                $('#recibo').dialog({
                    title: 'Recibo',
                    modal: true,
                    resizable: false,
                    height: 570,
                    width: 740
                });
            }
        });*/
    });
});