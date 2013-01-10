Ext.define("mysqlNotas.model.Session",{
	extend: 'Ext.data.Model',
	isModel: true,
	config: {
		fields: [
			{ name: 'sessionid', type: 'int' },
			{ name: 'usuario', type: 'string'},
			{name: 'session', type: 'boolean', defaultValue: true},
			{ name: 'fecha', type: 'date' }
		],
		proxy: {
			type: 'localstorage',
			id: 'login-user'
		}
	},
	isSession: function() {
        var d = this.data,isSession=true;
         if(d.session != false) isSession=false;
        return isSession;
    },
	changeSession: function() {
        var oldSession = this.get('session'),
            newSession = !oldSession;

        this.set('session', newSession);
    }
});


