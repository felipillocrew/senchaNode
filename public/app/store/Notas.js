Ext.define("mysqlNotas.store.Notas",{
	extend: 'Ext.data.Store',
	config: {
		model: "mysqlNotas.model.Nota",
		pageSize: 10,
		autoLoad: true,
		sorters: [{
			property: 'fecha', 
			direction: 'DESC'
		}],
		grouper: {
			sortProperty: "titulo",
			direction: "ASC",
			groupFn: function (record) {
				if (record && record.data.titulo) {
					return (record.data.titulo[0]).toUpperCase();
				}
				else{
					return '';
				}
			}
		}
	}
});
