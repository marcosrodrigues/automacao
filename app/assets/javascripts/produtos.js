Ext.define('Produto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'descricao', type: 'string'},
        {name: 'codigo_barras', type: 'string'},
        {name: 'tipo_produto_id', type: 'int'},
        {name: 'tipo_produto', type: 'string'},
        {name: 'quantidade', type: 'int'},
        {name: 'preco_compra', type: 'float'},
        {name: 'lucro', type: 'float'}
    ]
});

// create the data store
var storeProduto = Ext.create('Ext.data.Store', {
    model: 'Produto',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'produtos/lista',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'count'
        }
    },
    autoLoad: false
});

function inclusaoProdutos() {
    Ext.create('Ext.Window', {
        id: 'dadosProduto',
        title: 'Dados',
        width: 500,
        height: 200,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                width: 450
            },{
                xtype: 'textfield',
                id: 'txtCodigoBarras',
                fieldLabel: 'Código de Barras',
                width: 350
            },{
                xtype: 'combobox',
                id: 'tipoProduto',
                store: storeTipoProduto,
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Tipo de Produto',
                emptyText: 'Selecione um Tipo de Produto',
                width: 350
            },{
                xtype: 'numberfield',
                id: 'preco_compra',
                fieldLabel: 'Preço de Compra',
                decimalSeparator: ',',
                hideTrigger: true
            },{
                xtype: 'numberfield',
                id: 'lucro',
                fieldLabel: 'Lucro',
                decimalSeparator: ',',
                hideTrigger: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            descricao: Ext.getCmp('txtDescricao').value,
                            codigo_barras: Ext.getCmp('txtCodigoBarras').value,
                            tipo_produto_id: Ext.getCmp('tipoProduto').value,
                            preco_compra: Ext.getCmp('preco_compra').value,
                            lucro: Ext.getCmp('lucro').value
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

function edicaoProduto(id, descricao, codigo_barras, tipo_produto_id){
    Ext.create('Ext.Window', {
        id: 'dadosProduto',
        title: 'Dados',
        width: 500,
        height: 150,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                width: 450,
                value: descricao
            },{
                xtype: 'textfield',
                id: 'txtCodigoBarras',
                fieldLabel: 'Código de Barras',
                width: 350,
                value: codigo_barras
            },{
                xtype: 'combobox',
                id: 'tipoProduto',
                store: storeTipoProduto,
                displayField: 'descricao',
                valueField: 'id',
                fieldLabel: 'Tipo de Produto',
                emptyText: 'Selecione um Tipo de Produto',
                width: 350,
                value: tipo_produto_id
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/alterar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            descricao: Ext.getCmp('txtDescricao').value,
                            codigo_barras: Ext.getCmp('txtCodigoBarras').value,
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

Ext.define('Preco', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'data', type: 'date'},
        {name: 'preco', type: 'float'}
    ]
});

// create the data store
var storePreco = Ext.create('Ext.data.Store', {
    model: 'Preco',
    proxy: {
        type: 'ajax',
        url: 'produtos/precos',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoPreco(produto_id) {
    Ext.create('Ext.Window', {
        id: 'dadosPreco',
        title: 'Dados',
        width: 275,
        height: 120,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'datefield',
                id: 'data',
                fieldLabel: 'Data',
                format: 'd/m/Y'
            },{
                xtype: 'numberfield',
                id: 'preco',
                fieldLabel: 'Preço',
                decimalSeparator: ',',
                hideTrigger: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/salvar_preco',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            produto_id: produto_id,
                            data: Ext.getCmp('data').value,
                            preco: Ext.getCmp('preco').value
                        },
                        success: function(){
                            Ext.getCmp('dadosPreco').close();
                            storePreco.load({id: produto_id});
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosPreco').close();
                }
            }]
        }
    }).show();
}

function edicaoPreco(produto_id, id, data, preco){
    Ext.create('Ext.Window', {
        id: 'dadosPreco',
        title: 'Dados',
        width: 275,
        height: 120,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'datefield',
                id: 'data',
                fieldLabel: 'Data',
                format: 'd/m/Y',
                value: data
            },{
                xtype: 'numberfield',
                id: 'preco',
                fieldLabel: 'Preço',
                decimalSeparator: ',',
                hideTrigger: true,
                value: preco
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'produtos/alterar_preco',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            data: Ext.getCmp('data').value,
                            preco: Ext.getCmp('preco').value
                        },
                        success: function(){
                            Ext.getCmp('dadosPreco').close();
                            storePreco.load({id: produto_id});
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosPreco').close();
                }
            }]
        }
    }).show();
}

function abrirPrecos(id, descricao) {
    storePreco.load({id: id});

    Ext.create('Ext.Window', {
        title: 'Preços: ' + descricao,
        width: 500,
        height: 200,
        plain: true,
        layout: 'fit',
        id: 'precos',
        modal: true,
        resizable: false,
        items: {
            xtype: 'grid',
            store: storePreco,
            stateful: true,
            stateId: 'stateGrid',
            columns: [{
                xtype: 'actioncolumn',
                width: 25,
                items: [{
                    icon: '/assets/icons/fam/delete.gif',
                    tooltip: 'Excluir Preço',
                    handler: function(grid, rowIndex, colIndex) {
                        Ext.Msg.show({
                            title: 'Confirmação',
                            msg: 'Deseja excluir este preco?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function(btn){
                                if (btn == 'yes') {
                                    var rec = storePreco.getAt(rowIndex);

                                    Ext.Ajax.request({
                                        url: 'produtos/excluir_preco',
                                        headers: {
                                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        method: 'delete',
                                        params: {
                                            id: rec.get('id')
                                        },
                                        success: function(){
                                            storePreco.load({id: id});
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
                    tooltip: 'Editar Preco',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = storePreco.getAt(rowIndex);

                        edicaoPreco(id, rec.get('id'), rec.get('data'), rec.get('preco'));
                    }
                }]
            },{
                xtype: 'datecolumn',
                text: 'Data',
                dataIndex: 'data',
                format: 'd/m/Y',
                flex: 1
            },{
                text     : 'Preço',
                dataIndex: 'preco',
                flex: 1
            }],
            width: 500,
            height: 200,
            viewConfig: {
                stripeRows: true
            },
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: 'Novo',
                    iconCls: 'icon-add',
                    handler: function(){
                        inclusaoPreco(id);
                    }
                }]
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
            width: 900,
            height: 532,
            plain: true,
            layout: 'fit',
            id: 'gridProdutos',
            resizable: false,
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
                                            headers: {
                                                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                            },
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

                            edicaoProduto(rec.get('id'), rec.get('descricao'), rec.get('codigo_barras'), rec.get('tipo_produto_id'));
                        }
                    }]
                }/*,{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/fornecedores.png',
                        tooltip: 'Fornecedores',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeProduto.getAt(rowIndex);
                        }
                    }]
                }*/,{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/sales.png',
                        tooltip: 'Preços',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeProduto.getAt(rowIndex);

                            abrirPrecos(rec.get('id'), rec.get('descricao'));
                        }
                    }]
                },{
                    text     : 'Descrição',
                    flex     : 1,
                    dataIndex: 'descricao'
                },{
                    text     : 'Código de Barras',
                    dataIndex: 'codigo_barras'
                },{
                    text     : 'Tipo de Produto',
                    dataIndex: 'tipo_produto'
                },{
                    text     : 'Preço de Compra',
                    dataIndex: 'preco_compra',
                    align: 'right'
                },{
                    text     : 'Lucro(%)',
                    dataIndex: 'lucro',
                    width: 60
                },{
                    text     : 'Quantidade',
                    dataIndex: 'quantidade',
                    width: 70
                }],
                width: 900,
                height: 532,
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
                }],
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: storeProduto,
                    displayInfo: true,
                    displayMsg: 'Mostrando {0} - {1} de {2}',
                    emptyMsg: "Nenhum produto cadastrado"
                })
            }
        }).show();
    }
}