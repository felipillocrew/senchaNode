Ext.define("mysqlNotas.store.Categorias",{
	extend: 'Ext.data.Store',
	config: {
		model: "mysqlNotas.model.Categoria",
		pageSize: 10,
		autoLoad: true,
		sorters: [{
			property: 'nombre', 
			direction: 'DESC'
		}],
		grouper: {
			sortProperty: "nombre",
			direction: "DESC",
			groupFn: function (record) {
				if (record && record.data.nombre) {
					return record.data.nombre[0];
				}
				else{
					return '';
				}
			}
		}
	}
});
