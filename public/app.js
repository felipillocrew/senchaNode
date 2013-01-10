Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'mysqlNotas': 'app',
	Ext: '../touch/src'
  }
});

// transisiones
var flipRight = {type: 'flip',direction: 'right'};
var flipLeft = {type: 'flip',direction: 'left'};
var slideRight = {type: 'slide', direction: 'right'};
var slideLeft = {type: 'slide', direction: 'left'};
var slideTop = {type: 'slide', direction: 'top'};
var slideBottom = {type: 'slide', direction: 'down'};

Ext.application({
	name: 'mysqlNotas',
	icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
	
	requires: ['Ext.MessageBox'/*,'Ext.device.*','Ext.device.Connection','Ext.device.Camera','Ext.device.Notification'*/],
	
	views: ['ui.ConfirmDialog','ui.Acciones'],
	profiles: ['Phone', 'Tablet'],
	stores: ['Notas','Categorias','Session','Browserdata'],
	models: ['Nota','Categoria','Session','Browser'],
	
	note_api:'php/',
	//note_api: 'http://www.felipillocrew.com/apis/notes/',
	
	Login: function(){
		if (!Ext.os.is.Phone)
			 Ext.Viewport.add(Ext.create('mysqlNotas.view.tablet.forms.login'));
		 else 
			 Ext.Viewport.add(Ext.create('mysqlNotas.view.phone.forms.login'));
	},
	noLogin: function(){
		if (!Ext.os.is.Phone)
			 Ext.Viewport.add(Ext.create('mysqlNotas.view.tablet.Main'));
		 else 
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
        
    },
	onUpdated: function() {
        Ext.Msg.confirm(
            "Aplicación Actualizada",
            "Esta aplicación fue actualizada a su versión más reciente.\n Recargar ahora?",
            function() {
                window.location.reload();
            }
        );
    }
});

