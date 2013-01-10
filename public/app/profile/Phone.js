Ext.define('mysqlNotas.profile.Phone',{
	extend: 'Ext.app.Profile',
	config: {
		views: ['Main','forms.EditorNotas','forms.login'],
		controllers: ['Notas']
	},
	isActive: function() {
		console.log('es telefono');
        return Ext.os.is.Phone;
    },
	launch:function(){
        this.revisaLogin();
    },
	Login: function(){
		Ext.Viewport.add(Ext.create('mysqlNotas.view.phone.forms.login'));
	},
	noLogin: function(){
		Ext.Viewport.add(Ext.create('mysqlNotas.view.phone.Main'));
	},
	inSession: function() {
        var store,
            model;
        
        store = Ext.getStore("Session");
        if (!store) return false;
        model = store.first();
        if (!model) return false;
        return (model.get("session") == true);
    },
	revisaLogin: function() {
        if(this.inSession()){
			this.noLogin();
			return;
		}
		this.Login();
		return;
        
    }
});
