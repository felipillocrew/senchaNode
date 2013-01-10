Ext.define("mysqlNotas.model.Nota",{
	extend: 'Ext.data.Model',
	isModel: true,
	config: {
		idProperty: 'notaid',
		fields: [
			{ name: 'notaid', type: 'int' },
			{ name: 'categoriaid', type: 'int' },
			{ name: 'fecha', type: 'date'},
			{ name: 'titulo', type: 'string' },
			{ name: 'detalle', type: 'string' }
		],
		validations: [
			{ type: 'presence', field: 'notaid' },
			{ type: 'presence', field: 'categoriaid' },
			{ type: 'length', min: 4, field: 'titulo', message: 'el título debe tener más de 4 carácteres' },
			{type: 'format', field: 'titulo', matcher: /^(A-Za-z).+/ , message: 'el título debe inicar con una letra'},
			{ type: 'presence', field: 'fecha' },
			{ type: 'presence', field: 'detalle' },
			{ type: 'presence', field: 'titulo', message: 'Por favor introduzca un título para esta nota.' }
		],
		proxy: {
			type: 'ajax',
			url: '/notas',
			reader: {
				type: 'json',
				rootProperty: 'notas',
				totalProperty: 'total',
				successProperty: 'success'
			}
		}
	},
	titulo: function() {
        var d = this.data,
            names = [d.titulo];
        return names.join(" ");
    },
	isNew: function() {
        var d = this.data,isNew=true;
         if(d.titulo!='') isNew=false;
        return isNew;
    }
});
