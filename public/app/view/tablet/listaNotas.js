Ext.define('mysqlNotas.view.tablet.listaNotas',{
	extend: 'Ext.List',
	requires: [ 'Ext.dataview.List','Ext.plugin.PullRefresh'],
	xtype: 'list-notas',
	alias: "widget.list-notas",
	config:{
		scrollable:{
			direction:"vertical",
			indicators:false
		},
		store: 'Notas',
		//pinHeaders:false,
		loadingText: "Cargando Notas...",
		emptyText: '</pre><div class="notes-list-empty-text">No Hay Notas</div><pre>',
		//itemCls: 'sticky',
		itemTpl: '</pre><div class="list-item-title">{titulo}</div><pre><div class="deleteListIcon"></div>',
		//itemTpl: '<p class="sticky"<strong>{titulo}</strong></p>',
		grouped: true,
		margin: '0 0 0 5',
		plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'baja para Actualizar',
				releaseRefreshText: 'suelte para Actualizar',
				loadingText: 'Cargando...'
			}
		]
	}
});
