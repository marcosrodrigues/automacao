Ext.define('MovimentacaoEstoque', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'produto_id', type: 'int'},
        {name: 'produto', type: 'string'},
        {name: 'operacao', type: 'int'},
        {name: 'quantidade', type: 'int'}
    ]
});

// create the data store
var storeMovimentacaoEstoque = Ext.create('Ext.data.Store', {
    model: 'MovimentacaoEstoque',
    proxy: {
        type: 'ajax',
        url: 'movimentacoes_estoque/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoMovimentacaoEstoque() {
    Ext.create('Ext.Window', {
        id: 'dadosMovimentacaoEstoque',
        title: 'Dados',
        width: 290,
        height: 145,
        modal: true,
        resizable: false,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'combobox',
                id: 'produto',
                store: storeProduto,
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Produto',
                emptyText: 'Selecione um Produto',
                width: 270
            },{
                xtype: 'combobox',
                id: 'operacao',
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Operação',
                emptyText: 'Selecione uma Operação',
                width: 270,
                store: Ext.create('Ext.data.Store', {
                    fields: ['id', 'descricao'],
                    data: [
                        {id: 1, descricao: 'Entrada'},
                        {id: 2, descricao: 'Saída'}
                    ]
                })
            },{
                xtype: 'numberfield',
                id: 'quantidade',
                fieldLabel: 'Quantidade',
                hideTrigger: true,
                allowDecimals: false,
                width: 150
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'movimentacoes_estoque/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            produto_id: Ext.getCmp('produto').value,
                            operacao: Ext.getCmp('operacao').value,
                            quantidade: Ext.getCmp('quantidade').value
                        },
                        success: function(){
                            Ext.getCmp('dadosMovimentacaoEstoque').close();
                            storeMovimentacaoEstoque.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosMovimentacaoEstoque').close();
                }
            }]
        }
    }).show();
}

function abrirMovimentacoesEstoque() {
    var cadastro = Ext.getCmp('movimentacoesEstoque');
    if (cadastro) {
        cadastro.show();
    } else {
        storeMovimentacaoEstoque.load();

        Ext.create('Ext.Window', {
            title: 'Movimentar Estoque',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            resizable: false,
            id: 'movimentacoesEstoque',
            items: {
                xtype: 'grid',
                store: storeMovimentacaoEstoque,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    text     : 'Produto',
                    flex     : 1,
                    dataIndex: 'produto'
                },{
                    text     : 'Operação',
                    dataIndex: 'operacao',
                    renderer: function(value) {
                        return value == 1 ? 'Entrada' : 'Saída';
                    }
                },{
                    text     : 'Quantidade',
                    dataIndex: 'quantidade'
                }],
                height: 350,
                width: 600,
                viewConfig: {
                    stripeRows: true
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        text: 'Fazer Lançamento',
                        iconCls: 'icon-add',
                        handler: function(){
                            inclusaoMovimentacaoEstoque();
                        }
                    }]
                }]
            }
        }).show();
    }
}