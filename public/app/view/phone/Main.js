Ext.define('mysqlNotas.view.phone.Main',{
	extend: 'Ext.NavigationView',
	requires: ['Ext.NavigationView', 'Ext.dataview.List','Ext.Anim','Ext.plugin.PullRefresh'],
	xtype: 'view-main',
	alias: "widget.view-main",
	config: {
		fullscreen: true,
		showAnimation: {
			type: 'flip', 
			direction: 'top'
		},
		items: [{
			title: 'Notas',
			layout: 'fit',
			xtype: 'container',
			itemId: 'listaNotasContainer',
			items: [
				{
					xtype: 'list',
					store: 'Notas',
					loadingText: "Cargando Notas...",
					emptyText: '</pre><div class="notes-list-empty-text">No Hay Notas</div><pre>',
					itemTpl: '</pre><div class="list-item-title">{titulo}</div><pre><div class="deleteListIcon"></div>',
					itemId: 'listaNotas',
					grouped: true,
					plugins: [
						{
							xclass: 'Ext.plugin.PullRefresh',
							pullRefreshText: 'baja para Actualizar',
							releaseRefreshText: 'Suelte para Actualizar',
							loadingText: 'Cargando...'
						}
					]
				},
				{
					xtype: 'toolbar',
					docked: 'bottom',
					items:[
						{
							xtype: 'button',
							id: 'btnLogout',
							ui: 'confirm',
							iconCls: 'logout',
							iconMask: true
						},

						{
							xtype: 'spacer'
						},
						{
							xtype: 'button',
							id: 'btnRefresh',
							ui: 'action',
							iconCls: 'refresh',
							iconMask: true
						},
						{
							xtype: 'button',
							ui: 'action',
							iconCls: 'add',
							iconMask: true,
							itemId: 'btnAdd'
						}
					]
				}
			]
		}],
	listeners: [
		{
			delegate: "#btnAdd",
			event: "tap",
			fn: "onbtnAddTap"
		},
		{
			delegate: "#btnRefresh",
			event: "tap",
			fn: "onbtnRefreshTap"
		},
		{
			delegate: "#btnLogout",
			event: "tap",
			fn: "onbtnLogoutTap"
		},
		{
			delegate: "#listaNotas",
			event: "itemtap",
			fn: "onlistaNotasItemtap"
		},
		{
			delegate: "#listaNotas",
			event: "itemtaphold",
			fn: "onlistaNotasItemtaphold"
		},
		{
			delegate: "#listaNotas",
			event: "itemswipe",
			fn: "onlistaNotasItemswipe"
		},
		{
			delegate: "#listaNotasContainer",
			event: "activate",
			fn: "onNotesListActivate"
		}
	]
	},
	onbtnAddTap: function (){
		console.log("btn Crear was Press");
		this.fireEvent("crearNuevaNota", this);
	},
	onbtnRefreshTap: function (){
		console.log("btn Crear was Press");
		this.fireEvent("reloadList", this);
	},
	onbtnLogoutTap: function (){
		console.log("btn Logout was Press");
		this.fireEvent("logoutFn", this);
	},
	onlistaNotasItemtap: function(list, idx, target, record, evt){
		console.log("List Items was Tapped");
		this.fireEvent('editarNota', this, record);
	},
	onlistaNotasItemtaphold: function(list, idx, target, record, evt){
		console.log("Item Tap was Holded");
		this.fireEvent('showAct', this, record);
	},
	onlistaNotasItemswipe: function(list, idx, target, record, evt){
		console.log("List Items was Swipe");
		this.fireEvent('swipeNota', this, idx, target, record,evt);
	},
	onNotesListActivate: function ( container, newActiveItem,  oldActiveItem,  eOpts ) {
		console.log("Container is Active");
		this.fireEvent('activeContainer', this);
	}
});