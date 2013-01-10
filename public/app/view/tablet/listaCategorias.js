Ext.define('mysqlNotas.view.tablet.listaCategorias',{
	extend: 'Ext.List',
	requires: [ 'Ext.dataview.List'],
	xtype: 'list-categorias',
	alias: "widget.list-categorias",
	config:{
		scrollable:{
			direction:"vertical",
			indicators:false
		},
		store: 'Categorias',
		allowDeselect: true,
		loadingText: "Cargando Categorias...",
		emptyText: '</pre><div class="notes-list-empty-text">No Hay Categorias</div><pre>',
		itemTpl: '</pre><div class="list-item-title">{nombre}</div><pre>',
		grouped: true,
		margin: '0 0 0 0'
	}
});
