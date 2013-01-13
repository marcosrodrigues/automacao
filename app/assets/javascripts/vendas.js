function ProdutoModel(id, descricao){
    this.id = id;
    this.descricao = ko.observable(descricao);
    this.preco = ko.observable(10);
    this.quantidade = ko.observable(1);

    this.total = ko.computed(function(){
        return this.preco() * this.quantidade();
    }, this);
}

function ServicoModel(id, descricao) {
    this.id = id;
    this.descricao = ko.observable(descricao);
    this.preco = ko.observable(20);
    this.quantidade = ko.observable(1);

    this.total = ko.computed(function(){
        return this.preco() * this.quantidade();
    }, this);
}

function VendaModel(id){
    this.id = id;
    this.desconto = ko.observable(0);
    this.produtos = ko.observableArray([]);
    this.servicos = ko.observableArray([]);

    this.totalProdutos = ko.computed(function(){        
        return this.produtos().reduce(function (acumulador, item) {
            return acumulador + item.total();
        }, 0).toFixed(2);
    }, this);

    this.totalServicos = ko.computed(function(){        
        return this.servicos().reduce(function (acumulador, item) {
            return acumulador + item.total();
        }, 0).toFixed(2);
    }, this);

    this.total = ko.computed(function(){        
        return (parseFloat(this.totalProdutos()) + parseFloat(this.totalServicos())).toFixed(2);
    }, this);    
}

function VendasModel(){
    this.vendas = ko.observableArray([]);
    this.vendaAtiva = null;
}

var vendasAbertas;

function reajusta(){
    var heightLeftAndContent = $(window).height() * 0.9;
    var heightFooter = $(window).height() * 0.1;

    var widthLeft = $(window).width() * 0.2;
    var widthContent = $(window).width() * 0.75;

    var heightHeader = $('#header').height();

    $('#left').css('height', (heightLeftAndContent - heightHeader) + 'px');
    $('#left').css('width', widthLeft + 'px');

    $('#content').css('height', (heightLeftAndContent - heightHeader) + 'px');
    $('#content').css('width', widthContent + 'px');

    $('.grid').css('height', (heightLeftAndContent - heightHeader - 30) / 2 + 'px');
    $('.grid').css('width', widthContent + 'px');

    $('#footer').css('height', heightFooter + 'px');
}

function novaVenda() {
    $.ajax({
        type: 'get',
        url: '/vendas/nova_venda/',
        dataType: 'json',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
        success: function(id) {
            var venda = new VendaModel(id);

            vendasAbertas.vendas.push(venda);
            vendasAbertas.vendaAtiva = venda;    

            ko.applyBindings(vendasAbertas);
        }
    });    
}

function vendaAtiva() {
    return vendasAbertas.vendaAtiva;
}

$(function(){

    // Inicia a lista de vendas abertas
    vendasAbertas = new VendasModel();

    $.ajax({
        type: 'get',
        url: '/vendas/vendas_em_aberto/',
        dataType: 'json',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
        success: function(vendas) {
            vendas.forEach(function(v) {
                vendasAbertas.vendas.push(new VendaModel(v.id));
            });

            novaVenda();
        }
    });

    // Nova venda
    shortcut.add('F2', function(){
        novaVenda();

        $("#footer #info").text("VENDA");
    });

    // Fechar venda
    shortcut.add('F3', function(){
        $("#footer #info").text("FECHANDO VENDA");

        var fechada = false;

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
                            id: vendaAtiva().id,
                            desconto: vendaAtiva().desconto()
                        },
                        dataType: 'json',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
                        success: function() {
                            $('#fechar-venda').dialog('close');
                        }
                    });

                    fechada = true;
                }
            },
            close: function(){
                if (fechada)
                    $("#footer #info").text("VENDA FECHADA");
                else
                    $("#footer #info").text("VENDA");
            }
        });
    });
    
    // Cancelar venda
    shortcut.add('F4', function(){
        
    });

    // Coloca foco na pesquisa de produtos
    shortcut.add('F5', function(){
        $('#pesquisa-produtos').focus();
    });

    // Coloca foco na pesquisa de serviços
    shortcut.add('F6', function(){
        $('#pesquisa-servicos').focus();
    });

    // Mostra vendas abertas
    shortcut.add('F7', function(){
        $( '#vendas-abertas' ).dialog({
            title: 'Vendas Abertas',
            modal: true,
            resizable: false,
            height: 400,
            width: 600,
            buttons: {
                Selecionar: function(){
                    $('#vendas-abertas').dialog('close');
                }
            }
        });
    });

    // Recibo da venda
    shortcut.add('F8', function(){

        window.open('/vendas/recibo?id=' + vendaAtiva().id);

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

    reajusta();

    $(window).resize(function(){
        reajusta();
    });

    $('#pesquisa-produtos').autocomplete({
        minLength: 2,
        delay: 1000,
        source: '/produtos/pesquisa',
        select: function(event, ui) {
            vendaAtiva().produtos.push(new ProdutoModel(ui.item.id, ui.item.label));

            $("#grid-produtos .quantidade").last().focus();
        },
        close: function() {
            $('#pesquisa-produtos').val('');
        }
    });

    $('#pesquisa-servicos').autocomplete({
        minLength: 2,
        delay: 1000,
        source: '/servicos/pesquisa',
        select: function(event, ui) {
            vendaAtiva().servicos.push(new ServicoModel(ui.item.id, ui.item.label));

            $("#grid-servicos .quantidade").last().focus();
        },
        close: function() {
            $('#pesquisa-servicos').val('');
        }
    });

    $("#grid-produtos .quantidade").live("keypress", function(event) {
        if ( event.which == 13 ) {
            $.ajax({
                type: 'post',
                url: '/vendas/adiciona_produto/',
                data: {
                    id: vendaAtiva().id,
                    id_produto: vendaAtiva().produtos()[vendaAtiva().produtos().length - 1].id,
                    quantidade: vendaAtiva().produtos()[vendaAtiva().produtos().length - 1].quantidade
                },
                dataType: 'json',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
                success: function() {
                    $('#pesquisa-produtos').focus();

                    $("#footer #info").text("VENDA");
                }
            });
        }
    });

    $("#grid-servicos .quantidade").live("keypress", function(event) {
        if ( event.which == 13 ) {
            $.ajax({
                type: 'post',
                url: '/vendas/adiciona_servico/',
                data: {
                    id: vendaAtiva().id,
                    id_servico: vendaAtiva().servicos()[vendaAtiva().servicos().length - 1].id,
                    quantidade: vendaAtiva().servicos()[vendaAtiva().servicos().length - 1].quantidade
                },
                dataType: 'json',
                beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'))},
                success: function() {
                    $('#pesquisa-servicos').focus();

                    $("#footer #info").text("VENDA");
                }
            });
        }
    });
});