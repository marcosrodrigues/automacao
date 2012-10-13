Ext.define('Produto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'descricao', type: 'string'},
        {name: 'codigo_barras', type: 'string'},
        {name: 'preco_venda', type: 'float'},
        {name: 'tipo_produto_id', type: 'int'},
        {name: 'tipo_produto', type: 'string'}
    ]
});

// create the data store
var storeProduto = Ext.create('Ext.data.Store', {
    model: 'Produto',
    proxy: {
        type: 'ajax',
        url: 'produtos/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoProdutos() {
    Ext.create('Ext.Window', {
        id: 'dadosProduto',
        title: 'Dados',
        width: 275,
        height: 175,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                maxLength: 120,
                autoFocus: true
            },{
                xtype: 'textfield',
                id: 'txtCodigoBarras',
                fieldLabel: 'Código de Barras',
                maxLength: 60,
                autoFocus: true
            },{
                xtype: 'numberfield',
                id: 'txtPrecoVenda',
                fieldLabel: 'Preço de Venda',
                maxLength: 60,
                autoFocus: true,
                decimalSeparator: ',',
                hideTrigger: true
            },{
                xtype: 'combobox',
                id: 'tipoProduto',
                store: storeTipoProduto,
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Tipo de Produto',
                emptyText: 'Selecione um Tipo de Produto'
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/salvar',
                        params: {
                            descricao: Ext.getCmp('txtDescricao').value,
                            codigo_barras: Ext.getCmp('txtCodigoBarras').value,
                            preco_venda: Ext.getCmp('txtPrecoVenda').value,
                            tipo_produto_id: Ext.getCmp('tipoProduto').value
                        },
                        success: function(){
                            Ext.getCmp('dadosProduto').close();
                            storeProduto.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosProduto').close();
                }
            }]
        }
    }).show();
}

function edicaoProduto(id, descricao, codigo_barras, preco_venda, tipo_produto_id){
    Ext.create('Ext.Window', {
        id: 'dadosProduto',
        title: 'Dados',
        width: 275,
        height: 175,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                maxLength: 120,
                autoFocus: true,
                value: descricao
            },{
                xtype: 'textfield',
                id: 'txtCodigoBarras',
                fieldLabel: 'Código de Barras',
                maxLength: 60,
                autoFocus: true,
                value: codigo_barras
            },{
                xtype: 'numberfield',
                id: 'txtPrecoVenda',
                fieldLabel: 'Preço de Venda',
                maxLength: 60,
                autoFocus: true,
                decimalSeparator: ',',
                hideTrigger: true,
                value: preco_venda
            },{
                xtype: 'combobox',
                id: 'tipoProduto',
                store: storeTipoProduto,
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Tipo de Produto',
                emptyText: 'Selecione um Tipo de Produto',
                value: tipo_produto_id
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/alterar',
                        method: 'put',
                        params: {
                            id: id,
                            descricao: Ext.getCmp('txtDescricao').value,
                            codigo_barras: Ext.getCmp('txtCodigoBarras').value,
                            preco_venda: Ext.getCmp('txtPrecoVenda').value,
                            tipo_produto_id: Ext.getCmp('tipoProduto').value
                        },
                        success: function(){
                            Ext.getCmp('dadosProduto').close();
                            storeProduto.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosProduto').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroProdutos() {
    var cadastro = Ext.getCmp('gridProdutos');
    if (cadastro) {
        cadastro.show();
    } else {
        storeProduto.load();

        Ext.create('Ext.Window', {
            title: 'Produtos',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridProdutos',
            items: {
                xtype: 'grid',
                store: storeProduto,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Produto',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir este produto?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeProduto.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'produtos/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeProduto.load();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/edit.png',
                        tooltip: 'Editar Produto',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeProduto.getAt(rowIndex);

                            edicaoProduto(rec.get('id'), rec.get('descricao'), rec.get('codigo_barras'),
                                rec.get('preco_venda'), rec.get('tipo_produto_id'));
                        }
                    }]
                },{
                    text     : 'Descrição',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'descricao'
                },{
                    text     : 'Código de Barras',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'codigo_barras'
                },{
                    text     : 'Preço de Venda',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'preco_venda'
                },{
                    text     : 'Tipo de Produto',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'tipo_produto'
                }],
                height: 350,
                width: 600,
                viewConfig: {
                    stripeRows: true
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        text: 'Novo',
                        iconCls: 'icon-add',
                        handler: function(){
                            inclusaoProdutos();
                        }
                    }]
                }]
            }
        }).show();
    }
}