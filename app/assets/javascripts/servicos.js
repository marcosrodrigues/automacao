Ext.define('Servico', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'descricao', type: 'string'}
    ]
});

// create the data store
var storeServico = Ext.create('Ext.data.Store', {
    model: 'Servico',
    proxy: {
        type: 'ajax',
        url: 'servicos/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoServico() {
    Ext.create('Ext.Window', {
        id: 'dadosServico',
        title: 'Dados',
        width: 275,
        height: 100,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                maxLength: 60,
                autoFocus: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'servicos/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            descricao: Ext.getCmp('txtDescricao').value
                        },
                        success: function(){
                            Ext.getCmp('dadosServico').close();
                            storeServico.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosServico').close();
                }
            }]
        }
    }).show();
}

function edicaoServico(id, descricao){
    Ext.create('Ext.Window', {
        id: 'dadosServico',
        title: 'Dados',
        width: 275,
        height: 100,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'txtDescricao',
                fieldLabel: 'Descrição',
                maxLength: 60,
                autoFocus: true,
                value: descricao
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'servicos/alterar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            descricao: Ext.getCmp('txtDescricao').value
                        },
                        success: function(){
                            Ext.getCmp('dadosServico').close();
                            storeServico.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosServico').close();
                }
            }]
        }
    }).show();
}

Ext.define('PrecoServico', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'data', type: 'date'},
        {name: 'preco', type: 'float'}
    ]
});

// create the data store
var storePrecoServico = Ext.create('Ext.data.Store', {
    model: 'PrecoServico',
    proxy: {
        type: 'ajax',
        url: 'servicos/precos',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoPrecoServico(servico_id) {
    Ext.create('Ext.Window', {
        id: 'dadosPrecoServico',
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
                id: 'precoServico',
                fieldLabel: 'Preço',
                decimalSeparator: ',',
                hideTrigger: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'servicos/salvar_preco',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            servico_id: servico_id,
                            data: Ext.getCmp('data').value,
                            preco: Ext.getCmp('precoServico').value
                        },
                        success: function(){
                            Ext.getCmp('dadosPrecoServico').close();
                            storePrecoServico.load({id: servico_id});
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosPrecoServico').close();
                }
            }]
        }
    }).show();
}

function edicaoPrecoServico(servico_id, id, data, preco){
    Ext.create('Ext.Window', {
        id: 'dadosPrecoServico',
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
                id: 'precoServico',
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
                        url: 'servicos/alterar_preco',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            data: Ext.getCmp('data').value,
                            preco: Ext.getCmp('precoServico').value
                        },
                        success: function(){
                            Ext.getCmp('dadosPrecoServico').close();
                            storePrecoServico.load({id: servico_id});
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosPrecoServico').close();
                }
            }]
        }
    }).show();
}

function abrirPrecosServico(id, descricao) {
    storePrecoServico.load({id: id});

    Ext.create('Ext.Window', {
        title: 'Preços: ' + descricao,
        width: 500,
        height: 200,
        plain: true,
        layout: 'fit',
        id: 'precosServico',
        modal: true,
        resizable: false,
        items: {
            xtype: 'grid',
            store: storePrecoServico,
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
                                    var rec = storePrecoServico.getAt(rowIndex);

                                    Ext.Ajax.request({
                                        url: 'servicos/excluir_preco',
                                        headers: {
                                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        method: 'delete',
                                        params: {
                                            id: rec.get('id')
                                        },
                                        success: function(){
                                            storePrecoServico.load({id: id});
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
                        var rec = storePrecoServico.getAt(rowIndex);

                        edicaoPrecoServico(id, rec.get('id'), rec.get('data'), rec.get('preco'));
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
                        inclusaoPrecoServico(id);
                    }
                }]
            }]
        }
    }).show();
}

function abrirCadastroServicos() {
    var cadastro = Ext.getCmp('gridServicos');
    if (cadastro) {
        cadastro.show();
    } else {
        storeServico.load();

        Ext.create('Ext.Window', {
            title: 'Serviços',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridServicos',
            items: {
                xtype: 'grid',
                store: storeServico,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Serviço',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir este serviço?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeServico.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'servicos/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeServico.load();
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
                        tooltip: 'Editar Serviço',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeServico.getAt(rowIndex);

                            edicaoServico(rec.get('id'), rec.get('descricao'));
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/sales.png',
                        tooltip: 'Preços',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeServico.getAt(rowIndex);

                            abrirPrecosServico(rec.get('id'), rec.get('descricao'));
                        }
                    }]
                },{
                    text     : 'Descrição',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'descricao'
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
                            inclusaoServico();
                        }
                    }]
                }]
            }
        }).show();
    }
}