Ext.define('Fornecedor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nome', type: 'string'},
        {name: 'telefone', type: 'string'}
    ]
});

// create the data store
var storeFornecedor = Ext.create('Ext.data.Store', {
    model: 'Fornecedor',
    proxy: {
        type: 'ajax',
        url: 'fornecedores/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoFornecedor() {
    Ext.create('Ext.Window', {
        id: 'dadosFornecedor',
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
                        url: 'fornecedores/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            nome: Ext.getCmp('nome').value,
                            telefone: Ext.getCmp('telefone').value
                        },
                        success: function(){
                            Ext.getCmp('dadosFornecedor').close();
                            storeFornecedor.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosFornecedor').close();
                }
            }]
        }
    }).show();
}

function edicaoFornecedor(id, nome, telefone){
    Ext.create('Ext.Window', {
        id: 'dadosFornecedor',
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
                        url: 'fornecedores/alterar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            nome: Ext.getCmp('nome').value,
                            telefone: Ext.getCmp('telefone').value
                        },
                        success: function(){
                            Ext.getCmp('dadosFornecedor').close();
                            storeFornecedor.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosFornecedor').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroFornecedores() {
    var cadastro = Ext.getCmp('gridFornecedores');
    if (cadastro) {
        cadastro.show();
    } else {
        storeFornecedor.load();

        Ext.create('Ext.Window', {
            title: 'Fornecedores',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridFornecedores',
            items: {
                xtype: 'grid',
                store: storeFornecedor,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Fornecedor',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir este fornecedor?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeFornecedor.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'fornecedores/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeFornecedor.load();
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
                        tooltip: 'Editar Fornecedor',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeFornecedor.getAt(rowIndex);

                            edicaoFornecedor(rec.get('id'), rec.get('nome'), rec.get('telefone'));
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
                            inclusaoFornecedor();
                        }
                    }]
                }]
            }
        }).show();
    }
}