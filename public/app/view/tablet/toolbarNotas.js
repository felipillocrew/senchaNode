/*toolbarNotas*/

Ext.define('mysqlNotas.view.tablet.toolbarNotas',{
	extend: 'Ext.Toolbar',
	requires: ['Ext.field.Search'],
	xtype: 'toolbar-notas',
	alias: "widget.toolbar-notas",
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
//				{
//					xtype: 'button',
//					id: 'btnLogout',
//					ui: 'confirm',
//					iconCls: 'logout',
//					iconMask: true
//				},
//				{
//					xtype: 'spacer'
//				},
//				{
//					xtype: 'button',
//					id: 'btnRefresh',
//					ui: 'action',
//					iconCls: 'refresh',
//					iconMask: true
//				},
//				{
//					xtype: 'button',
//					ui: 'action',
//					iconCls: 'add',
//					iconMask: true,
//					itemId: 'btnAdd'
//				}
				{
					id: 'btnLogout',
					iconCls: 'logout'
				},
				{
					xtype: 'spacer'
				},
				{
					id: 'btnRefresh',
					iconCls: 'refresh'
				},
				{
					iconCls: 'add',
					itemId: 'btnAdd'
				}
			]
	}
});


