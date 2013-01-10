Ext.define('mysqlNotas.view.tablet.Main',{
	extend: 'Ext.NavigationView',
	requires: ['Ext.NavigationView','Ext.Anim','Ext.field.Search'],
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
			//layout: 'fit',
			layout: 'hbox',
			xtype: 'container',
			itemId: 'listaNotasContainer',
			items: [
				{
					xtype: 'list-categorias',
					itemId: 'listaCategorias',
					items:[
						{
							xtype: 'toolbar-categorias'
						}
					],
					flex: 1
				},
				{
					xtype: 'list-notas',
					itemId: 'listaNotas',
					items:[
						{
							xtype: 'toolbar-notas'
						},
						{
							xtype: 'searchfield',
							itemId: 'search',
							id: 'search',
							placeHolder: 'Buscar Nota',
							docked: 'top'
						}
					],
					flex: 5
				}
			]
		}],
	listeners: [
		{
			delegate: "#deleteFilter",
			event: "tap",
			fn: "ondeleteFilterTap"
		},
		{
			delegate: "#catAdd",
			event: "tap",
			fn: "oncatAddTap"
		},
		{
			delegate: "#catRefresh",
			event: "tap",
			fn: "oncatRefreshTap"
		},
		{
			delegate: "#btnAdd",
			event: "tap",
			fn: "onbtnAddTap"
		},
		{
			delegate: "#search",
			event: "keyup",
			fn: "onsearchEnter"
		},
		{
			delegate: "#search",
			event: "clearicontap",
			fn: "onsearchClear"
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
			delegate: "#listaNotasContainer",
			event: "activate",
			fn: "onNotesListActivate"
		},
		/*************LISTA NOTAS**************/
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
		/*************LISTA CAT.***************/
		{
				delegate: "#listaCategorias",
				event: "itemtap",
				fn: "onlistaCategoriasItemtap"
			}/*,
			{
				delegate: "#listaCategorias",
				event: "itemtaphold",
				fn: "onlistaCategoriasItemtaphold"
			},
			{
				delegate: "#listaCategorias",
				event: "itemswipe",
				fn: "onlistaCategoriasItemswipe"
			}*/
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
	onNotesListActivate: function ( container, newActiveItem,  oldActiveItem,  eOpts ) {
		console.log("Container is Active");
		this.fireEvent('activeContainer', this);
	},
	onsearchEnter: function ( field,event,opt ) {
		console.log("search keyUp");
		this.fireEvent('searchNote', this,field,event,opt);
	},
	onsearchClear: function ( field,event,opt ) {
		console.log("search lear Icon");
		this.fireEvent('searchClear', this);
	},
	/***********************CAT. TOOLS*********************/
	ondeleteFilterTap: function (){
		this.fireEvent("deleteFilter", this);
	},
	oncatAddTap: function (){
		this.fireEvent("addCat", this);
	},
	oncatRefreshTap: function (){
		this.fireEvent("refreshCat", this);
	},
	/***********************LISTA*************************/
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
	onlistaCategoriasItemtap: function(list, idx, target, record, evt){
		console.log("List Items was Swipe");
		this.fireEvent('selectCategoria', this, record);
	}
});