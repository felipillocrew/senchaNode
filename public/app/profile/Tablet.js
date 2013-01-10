Ext.define('mysqlNotas.profile.Tablet',{
    extend:'Ext.app.Profile',
    config:{
        views: ['Main','toolbarNotas','toolbarCategorias','listaNotas','listaCategorias','forms.EditorNotas','forms.EditorCategorias','forms.login'],
		controllers: ['Notas']
    },
    isActive: function() {
		console.log('no es telefono');
        return !Ext.os.is.Phone;
    },
    launch:function(){
		Ext.fly('Gen').destroy();
        mysqlNotas.app.revisaLogin();
    }
});