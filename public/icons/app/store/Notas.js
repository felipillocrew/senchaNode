Ext.define("mysqlNotas.store.Notas",{
	extend: 'Ext.data.Store',
	config: {
		model: "mysqlNotas.model.Nota",
		sorters: [{
			property: 'fecha', 
			direction: 'DESC'
		}],
		grouper: {
			sortProperty: "fecha",
			direction: "DESC",
			groupFn: function (record) {
				if (record && record.data.fecha) {
					return record.data.fecha.toDateString();
				}
				else{
					return '';
				}
			}
		}
	}
});
