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