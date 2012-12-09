Ext.define('ContaReceber', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'cliente_id', type: 'int'},
        {name: 'cliente', type: 'string'},
        {name: 'vencimento', type: 'date'},
        {name: 'valor', type: 'float'}
    ]
});

// create the data store
var storeContaReceber = Ext.create('Ext.data.Store', {
    model: 'ContaReceber',
    proxy: {
        type: 'ajax',
        url: 'contas_receber/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoContaReceber() {
    Ext.create('Ext.Window', {
        id: 'dadosContaReceber',
        title: 'Dados',
        width: 275,
        height: 150,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'combobox',
                id: 'cliente',
                store: storeCliente,
                displayField: 'nome',
                valueField: 'id',
                fieldLabel: 'Cliente',
                emptyText: 'Selecione um Cliente'
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
                        url: 'contas_receber/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            cliente_id: Ext.getCmp('cliente').value,
                            vencimento: Ext.getCmp('vencimento').value,
                            valor: Ext.getCmp('valor').value

                        },
                        success: function(){
                            Ext.getCmp('dadosContaReceber').close();
                            storeContaReceber.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosContaReceber').close();
                }
            }]
        }
    }).show();
}

function edicaoContaReceber(id, cliente_id, vencimento, valor){
    Ext.create('Ext.Window', {
        id: 'dadosContaReceber',
        title: 'Dados',
        width: 275,
        height: 150,
        modal: true,
        items: {
            xtype: 'panel',
            items: [{
                xtype: 'combobox',
                id: 'cliente',
                store: storeCliente,
                displayField: 'nome',
                valueField: 'id',
                fieldLabel: 'Cliente',
                emptyText: 'Selecione um Cliente',
                value: cliente_id
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
                        url: 'contas_receber/alterar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            cliente_id: Ext.getCmp('cliente').value,
                            vencimento: Ext.getCmp('vencimento').value,
                            valor: Ext.getCmp('valor').value
                        },
                        success: function(){
                            Ext.getCmp('dadosContaReceber').close();
                            storeContaReceber.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosContaReceber').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroContasReceber() {
    var cadastro = Ext.getCmp('gridContasReceber');
    if (cadastro) {
        cadastro.show();
    } else {
        storeContaReceber.load();

        Ext.create('Ext.Window', {
            title: 'Contas a Receber',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridContaReceber',
            items: {
                xtype: 'grid',
                store: storeContaReceber,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Conta a Receber',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir esta conta a receber?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeContaReceber.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'contas_receber/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeContaReceber.load();
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
                        tooltip: 'Editar Conta a Receber',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeContaReceber.getAt(rowIndex);

                            edicaoContaReceber(rec.get('id'), rec.get('cliente_id'), rec.get('vencimento'),
                                rec.get('valor'));
                        }
                    }]
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/sales.png',
                        tooltip: 'Recebimentos',
                        handler: function(grid, rowIndex, colIndex) {

                        }
                    }]
                },{
                    text     : 'Cliente',
                    flex     : 1,
                    dataIndex: 'cliente'
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
                            inclusaoContaReceber();
                        }
                    }]
                }]
            }
        }).show();
    }
}