function ProdutoModel(nome){
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

    reajusta();

    function reajusta(){
        var heightLeftAndContent = $(window).height() * 0.8;
        var heightFooter = $(window).height() * 0.2;

        var widthLeft = $(window).width() * 0.2;
        var widthContent = $(window).width() * 0.8;

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
            vendas.produtos.push(new ProdutoModel(ui.item.label));
        },
        close: function() {
            $('#pesquisa').val('');
        }
    });

    vendas = new VendasModel();

    ko.applyBindings(vendas);
});