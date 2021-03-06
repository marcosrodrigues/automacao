Ext.define('TipoProduto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'descricao', type: 'string'}
    ]
});

// create the data store
var storeTipoProduto = Ext.create('Ext.data.Store', {
    model: 'TipoProduto',
    proxy: {
        type: 'ajax',
        url: 'tipos_produto/lista',
        reader: {
            type: 'json',
            root: 'json'
        }
    },
    autoLoad: false
});

function inclusaoTiposProduto() {
    Ext.create('Ext.Window', {
        id: 'dadosTipoProduto',
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
                        url: 'tipos_produto/salvar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        params: {
                            descricao: Ext.getCmp('txtDescricao').value
                        },
                        success: function(){
                            Ext.getCmp('dadosTipoProduto').close();
                            storeTipoProduto.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosTipoProduto').close();
                }
            }]
        }
    }).show();
}

function edicaoTiposProduto(id, descricao){
    Ext.create('Ext.Window', {
        id: 'dadosTipoProduto',
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
                        url: 'tipos_produto/alterar',
                        headers: {
                            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'put',
                        params: {
                            id: id,
                            descricao: Ext.getCmp('txtDescricao').value
                        },
                        success: function(){
                            Ext.getCmp('dadosTipoProduto').close();
                            storeTipoProduto.load();
                        }
                    });
                }
            },{
                text: 'Cancelar',
                iconCls: 'icon-cancel',
                handler: function(){
                    Ext.getCmp('dadosTipoProduto').close();
                }
            }]
        }
    }).show();
}

function abrirCadastroTiposProduto() {
    var cadastro = Ext.getCmp('gridTiposProduto');
    if (cadastro) {
        cadastro.show();
    } else {
        storeTipoProduto.load();

        Ext.create('Ext.Window', {
            title: 'Tipos de Produto',
            width: 600,
            height: 350,
            plain: true,
            layout: 'fit',
            id: 'gridTiposProduto',
            items: {
                xtype: 'grid',
                store: storeTipoProduto,
                stateful: true,
                stateId: 'stateGrid',
                columns: [{
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/assets/icons/fam/delete.gif',
                        tooltip: 'Excluir Tipo de Produto',
                        handler: function(grid, rowIndex, colIndex) {
                            Ext.Msg.show({
                                title: 'Confirmação',
                                msg: 'Deseja excluir este tipo de produto?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(btn){
                                    if (btn == 'yes') {
                                        var rec = storeTipoProduto.getAt(rowIndex);

                                        Ext.Ajax.request({
                                            url: 'tipos_produto/excluir',
                                            method: 'delete',
                                            params: {
                                                id: rec.get('id')
                                            },
                                            success: function(){
                                                storeTipoProduto.load();
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
                        tooltip: 'Editar Tipo de Produto',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = storeTipoProduto.getAt(rowIndex);

                            edicaoTiposProduto(rec.get('id'), rec.get('descricao'));
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
                            inclusaoTiposProduto();
                        }
                    }]
                }]
            }
        }).show();
    }
}