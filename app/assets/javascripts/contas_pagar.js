Ext.define('ContaPagar', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'fornecedor_id', type: 'int'},
        {name: 'fornecedor', type: 'string'},
        {name: 'vencimento', type: 'date'},
        {name: 'valor', type: 'float'}
    ]
});

// create the data store
var storeContaPagar = Ext.create('Ext.data.Store', {
    model: 'ContaPagar',
    proxy: {
        type: 'ajax',
        url: 'contas_pagar/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoContaPagar() {
    Ext.create('Ext.Window', {
        id: 'dadosContaPagar',
        title: 'Dados',
        width: 275,
        height: 150,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'combobox',
                id: 'fornecedor',
                store: storeFornecedor,
                displayField: 'nome',
                valueField: 'id',
                fieldLabel: 'Fornecedor',
                emptyText: 'Selecione um Fornecedor'
            },{
                xtype: 'datefield',
                id: 'vencimento',
                fieldLabel: 'Vencimento',
                format: 'd/m/Y'
            },{
                xtype: 'numberfield',
                id: 'valor',
                fieldLabel: 'Valor',
                decimalSeparator: ',',
                hideTrigger: true
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'contas_pagar/salvar',
                        params: {
                            fornecedor_id: Ext.getCmp('fornecedor').value,
                            vencimento: Ext.getCmp('vencimento').value,
                            valor: Ext.getCmp('valor').value

                        },
                        success: function(){
                            Ext.getCmp('dadosContaPagar').close();
                            storeContaPagar.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosContaPagar').close();
                }
            }]
        }
    }).show();
}

function edicaoContaPagar(id, fornecedor_id, vencimento, valor){
    Ext.create('Ext.Window', {
        id: 'dadosContaPagar',
        title: 'Dados',
        width: 275,
        height: 150,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'combobox',
                id: 'fornecedor',
                store: storeFornecedor,
                displayField: 'nome',
                valueField: 'id',
                fieldLabel: 'Fornecedor',
                emptyText: 'Selecione um Fornecedor',
                value: fornecedor_id
            },{
                xtype: 'datefield',
                id: 'vencimento',
                fieldLabel: 'Vencimento',
                format: 'd/m/Y',
                value: vencimento
            },{
                xtype: 'numberfield',
                id: 'valor',
                fieldLabel: 'Valor',
                decimalSeparator: ',',
                hideTrigger: true,
                value: valor
            }],
            buttons: [{
                text: 'Salvar',
                iconCls: 'icon-save',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'contas_pagar/alterar',
                        method: 'put',
                        params: {
                            id: id,
                            fornecedor_id: Ext.getCmp('fornecedor').value,
                            vencimento: Ext.getCmp('vencimento').value,
                            valor: Ext.getCmp('valor').value
                        },
                        success: function(){
                            Ext.getCmp('dadosContaPagar').close();
                            storeContaPagar.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosContaPagar').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroContasPagar() {
    var cadastro = Ext.getCmp('gridContasPagar');
    if (cadastro) {
        cadastro.show();
    } else {
        storeContaPagar.load();

        Ext.create('Ext.Window', {
            title: 'Contas a Pagar',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridContaPagar',
            items: {
                xtype: 'grid',
                store: storeContaPagar,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Conta a Pagar',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir esta conta a pagar?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeContaPagar.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'contas_pagar/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeContaPagar.load();
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
                        tooltip: 'Editar Conta a Pagar',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeContaPagar.getAt(rowIndex);

                            edicaoContaPagar(rec.get('id'), rec.get('fornecedor_id'), rec.get('vencimento'),
                                rec.get('valor'));
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/sales.png',
                        tooltip: 'Pagamentos',
                        handler: function(grid, rowIndex, colIndex) {

                        }
                    }]
                },{
                    text     : 'Fornecedor',
                    flex     : 1,
                    dataIndex: 'fornecedor'
                },{
                    text     : 'Vencimento',
                    flex     : 1,
                    dataIndex: 'vencimento',
                    xtype: 'datecolumn' //TODO - ver pq sempre mostra um dia depois
                },{
                    text     : 'Valor',
                    flex     : 1,
                    dataIndex: 'valor'
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
                            inclusaoContaPagar();
                        }
                    }]
                }]
            }
        }).show();
    }
}