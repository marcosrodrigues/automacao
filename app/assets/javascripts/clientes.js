Ext.define('Cliente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nome', type: 'string'},
        {name: 'telefone', type: 'string'}
    ]
});

// create the data store
var storeCliente = Ext.create('Ext.data.Store', {
    model: 'Cliente',
    proxy: {
        type: 'ajax',
        url: 'clientes/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoCliente() {
    Ext.create('Ext.Window', {
        id: 'dadosCliente',
        title: 'Dados',
        width: 275,
        height: 120,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'nome',
                fieldLabel: 'Nome',
                maxLength: 60,
                autoFocus: true
            },{
                xtype: 'textfield',
                id: 'telefone',
                fieldLabel: 'Telefone',
                maxLength: 60,
                autoFocus: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'clientes/salvar',
                        params: {
                            nome: Ext.getCmp('nome').value,
                            telefone: Ext.getCmp('telefone').value
                        },
                        success: function(){
                            Ext.getCmp('dadosCliente').close();
                            storeCliente.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosCliente').close();
                }
            }]
        }
    }).show();
}

function edicaoCliente(id, nome, telefone){
    Ext.create('Ext.Window', {
        id: 'dadosCliente',
        title: 'Dados',
        width: 275,
        height: 120,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                id: 'nome',
                fieldLabel: 'Nome',
                maxLength: 60,
                autoFocus: true,
                value: nome
            },{
                xtype: 'textfield',
                id: 'telefone',
                fieldLabel: 'Telefone',
                maxLength: 60,
                autoFocus: true,
                value: telefone
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'clientes/alterar',
                        method: 'put',
                        params: {
                            id: id,
                            nome: Ext.getCmp('nome').value,
                            telefone: Ext.getCmp('telefone').value
                        },
                        success: function(){
                            Ext.getCmp('dadosCliente').close();
                            storeCliente.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosCliente').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroClientes() {
    var cadastro = Ext.getCmp('gridClientes');
    if (cadastro) {
        cadastro.show();
    } else {
        storeCliente.load();

        Ext.create('Ext.Window', {
            title: 'Clientes',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridClientes',
            items: {
                xtype: 'grid',
                store: storeCliente,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Cliente',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir este cliente?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeCliente.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'clientes/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeCliente.load();
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
                        tooltip: 'Editar Cliente',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeCliente.getAt(rowIndex);

                            edicaoCliente(rec.get('id'), rec.get('nome'), rec.get('telefone'));
                        }
                    }]
                },{
                    text     : 'Nome',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'nome'
                },{
                    text     : 'Telefone',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'telefone'
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
                            inclusaoCliente();
                        }
                    }]
                }]
            }
        }).show();
    }
}