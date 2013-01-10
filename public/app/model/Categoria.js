Ext.define("mysqlNotas.model.Categoria",{
	extend: 'Ext.data.Model',
	isModel: true,
	config: {
		idProperty: 'categoriaid',
		fields: [
			{ name: 'categoriaid', type: 'int' },
			{ name: 'nombre', type: 'string' },
			{ name: 'detalle', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'categoriaid' },
			{ type: 'length', min: 4, field: 'nombre', message: 'el título debe tener más de 4 carácteres' },
			{type: 'format', field: 'nombre', matcher: /^(A-Za-z).+/ , message: 'el título debe inicar con una letra'},
			{ type: 'presence', field: 'detalle' },
			{ type: 'presence', field: 'nombre', message: 'Por favor introduzca un título para esta nota.' }
		],
		proxy: {
			type: 'ajax',
			url: '/categorias',
			reader: {
				type: 'json',
				rootProperty: 'categorias',
				totalProperty: 'total',
				successProperty: 'success'
			}
		}
	},
	titulo: function() {
        var d = this.data,
            names = [d.nombre];
        return names.join(" ");
    },
	isNew: function() {
        var d = this.data,isNew=true;
         if(d.nombre!='') isNew=false;
        return isNew;
    }
});
