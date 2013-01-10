Ext.define("mysqlNotas.store.Session",{
	extend: 'Ext.data.Store',
	config: {
		model: "mysqlNotas.model.Session",
		autoLoad: true
	}
});
