/*toolbarCategorias*/

Ext.define('mysqlNotas.view.tablet.toolbarCategorias',{
	extend: 'Ext.Toolbar',
	requires: ['Ext.field.Search'],
	xtype: 'toolbar-categorias',
	alias: "widget.toolbar-categorias",
	config:{
		docked: 'bottom',
		defaults:{
			iconMask:true,
			ui:"plain"
		},
		layout:{
				pack:"center",
				align:"center"
			},
			scrollable:{
				direction:"horizontal",
				indicators:false
			},
		items:[
				{
					id: 'deleteFilter',
					iconCls: 'trash2'
				},
				{
					id: 'catRefresh',
					iconCls: 'refresh'
				},
				{
					iconCls: 'add',
					itemId: 'catAdd'
				}
			]
	}
});


