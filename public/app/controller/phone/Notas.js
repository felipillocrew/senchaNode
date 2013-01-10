Ext.define('mysqlNotas.controller.phone.Notas',{
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			main: 'view-main',
			editornotas: 'editor-notas-view',
			loginview: 'login-view',
			acctions: 'acctions-dialog'
		},
		control: {
			main: { 
				crearNuevaNota: 'crearNuevaNota',
				editarNota: 'editarNota',
				activeContainer: 'activeContainer',
				logoutFn: 'logout',
				swipeNota: 'showAct',
				reloadList: 'reloadList',
				showAct: 'showAct'
			},
			editornotas: {
				saveNote:'saveNote',
				deleteNote: 'deleteNote'
			},
			loginview: {
				loginUser: 'loginUser',
				loginSubmit: 'loginSubmit',
				formexception:'formexception'
			},
			acctions: {
				cancelAct: 'cancelAct',
				editAct: 'editAct',
				deleteAct: 'deleteAct'
			}
		}
	},
	// Transitions
	slideLeftTransition: {
		type: 'slide', 
		direction: 'left'
	},
	slideRightTransition: {
		type: 'slide', 
		direction: 'right'
	},
	flipRightTransition: {
		type: 'flip', 
		direction: 'right'
	},
	flipLeftTransition: {
		type: 'flip', 
		direction: 'left'
	},
	flipTopTransition: {
		type: 'flip', 
		direction: 'top'
	},
	// Helper functions
	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	// Commands.
	crearNuevaNota : function(){
		console.log('Vamos a crear una nueva nota');
		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		
		var nuevaNota = Ext.create("mysqlNotas.model.Nota",{
			notaid: 0,
			fecha: now,
			titulo: "",
			detalle: ""
		});
		this.verEditorNotas(nuevaNota)
	},
	editarNota : function(list, record){
		console.log('Vamos a Editar una Nota');
		this.verEditorNotas(record)
	},
	reloadList : function(){
		console.log('Vamos a Refrescar la lista');
		this.loadNotes();
	},
	showAct: function(dataview, idx, target, record, event){
		console.log('vamos a ver el Act');
		
		Ext.Viewport.add({
				xtype: 'acctions-dialog',
				id: 'ActionsDialog',
				hidden: true,
				record : record
			});
		var act = Ext.Viewport.down('#ActionsDialog');
		act.show();
	},
	cancelAct: function(){
		var view =  Ext.Viewport;
		var act = view.down('#ActionsDialog');
		act.destroy();
	},
	editAct: function(){
		var view =  Ext.Viewport;
		var act = view.down('#ActionsDialog');
		this.verEditorNotas(act.getRecord())
		act.destroy();
	},
	deleteAct: function(){
		var view =  Ext.Viewport,
		act = view.down('#ActionsDialog'),
		record = act.getRecord();
		view.add({
					xtype: 'confirmdialog',
					id: 'delete-confirm-dialog'
				});
		var dialog = view.down('#delete-confirm-dialog');
		dialog.confirm({
		title : 'Confirm',
		msg: 'Desea eleminar la Nota?',
		icon: 'msg-alert',
		scope: this,
		fn: function(btn) {
			if (btn == 'yes') {
				console.log(record);
				this.borrar(record,dialog);
			}
			else dialog.destroy();
		}
		});
		act.destroy();
	},
	activeContainer : function(){
		console.log('el Contenedor esta Activo');
	},
	verEditorNotas: function(record) {
    var title = record.titulo();
    if(title=='') title = 'Nota Nueva';
    var editNota = Ext.create('mysqlNotas.view.phone.forms.EditorNotas', {title: title});
	var editToolbar = editNota.down('#editToolbar');
	editNota.addbuttons(editToolbar,record.isNew());
	
    editNota.setRecord(record);    
    this.getMain().push(editNota);
  
  },
  saveNote: function(){
	  console.log('Vamos a Guardar la Nota');
	  var editornotas = this.getEditornotas();
	  editornotas.add({
				xtype: 'confirmdialog',
				id: 'save-confirm-dialog'
			});
	  var dialog = editornotas.down('#save-confirm-dialog');
	  dialog.confirm({
      title : 'Confirm',
      msg: 'Desea guardar la Nota?',
	  icon: 'msg-faq',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
			console.log(mysqlNotas.app.note_api);
			this.guardar(editornotas,dialog);
        }
		else dialog.destroy();
      }
    });  
  },
  deleteNote: function(){
	  console.log('Vamos a Eliminar la Nota');
	  var editornotas = this.getEditornotas();
	  editornotas.add({
				xtype: 'confirmdialog',
				id: 'delete-confirm-dialog'
			});
	var dialog = editornotas.down('#delete-confirm-dialog');
	dialog.confirm({
      title : 'Confirm',
      msg: 'Desea eleminar la Nota?',
	  icon: 'msg-alert',
      scope: this,
      fn: function(btn) {
        if (btn == 'yes') {
			this.borrar(editornotas.getRecord(),dialog);
        }
		else dialog.destroy();
      }
    });
	
  },
  guardar: function(editornotas,dialog){
	var currentNote = editornotas.getRecord();
	var newValues = editornotas.getValues();
	console.log(newValues);
	currentNote.set("titulo", newValues.titulo);
	currentNote.set("detalle", newValues.detalle);
	var errors = currentNote.validate();
	console.log(currentNote.data);
	if (!errors.isValid()){
		dialog.destroy();
		var msg = 'Por favor corrija los errores: <ul>';
		for(var i = 0; i < errors.items.length; i++)
			msg += '<li>' + errors.items[i].getMessage() + '</li>';
		msg += '</ul>';
		Ext.Msg.alert('Errores', msg); //Ext.emptyFn
		return;
	}
	this.doEdit(currentNote.data);
	this.getMain().pop();
  },
  doEdit: function(data) {
	Ext.Ajax.request({
		url: mysqlNotas.app.note_api+'notas.php',
		method: 'post',
		scope: this,
		params:{
			fnt: 'add',
			notaid: data.notaid,
			titulo: data.titulo,
			detalle: data.detalle
		},

		success: function(response){
			console.log (response)
			var data = Ext.decode(response.responseText);
			if(!data.success){
				Ext.Msg.alert('Error', data.msg);
			}
			Ext.Msg.alert('Result', data.msg, this.loadNotes);
		},
		failure: function(response) {
			Ext.Msg.alert('Result', 'Failure! Internal error occurred.');
		}
	});
	},
	borrar: function(currentNote,dialog){
	this.doDelete(currentNote.data);
	this.getMain().pop();
  },
	doDelete: function(data) {
		console.log(data.notaid);
		Ext.Ajax.request({
			url: mysqlNotas.app.note_api+'notas.php',
			method: 'post',
			scope: this,
			params:{
				fnt: 'del',
				notaid: data.notaid
			},

			success: function(response){
				console.log (response)
				var data = Ext.decode(response.responseText);
				if(!data.success){
					Ext.Msg.alert('Error', data.msg);
				}
				Ext.Msg.alert('Result', data.msg, this.loadNotes);
			},
			failure: function(response) {
				Ext.Msg.alert('Result', 'Failure! Internal error occurred.');
			}
		});
	},
	loadNotes: function(){
		var notasStore = Ext.getStore("Notas");
		notasStore.load();
	},
	//LOGIN
	addSession: function(usr){
		var sessionStore=Ext.getStore("Session")
		sessionStore.load();
		var now = new Date();
		var sessionID = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		var nuevaSession = Ext.create("mysqlNotas.model.Session",{
			sessionid: sessionID,
			fecha: now,
			session: true,
			usuario: usr
		});
		console.log(nuevaSession.getData());
		console.log('supuestamente agrego al usuario: ' + usr);
		sessionStore.add(nuevaSession);
		sessionStore.sync();
		
	},
	logout : function(){
		var sessionStore=Ext.getStore("Session"),
		model = sessionStore.first();
		sessionStore.remove(model);
		sessionStore.sync();
		this.getMain().destroy();
		Ext.Viewport.animateActiveItem(Ext.create('mysqlNotas.view.phone.forms.login'),this.flipTopTransition);
	},
	loginUser: function(){
		var formView = this.getLoginview(),
		values = formView.getValues(),
		url = formView.getUrl(), aqui = this;
		var success= false;
		Ext.Ajax.request({
			url: url,
			method: 'post',
			params: values,
			defaultHeaders: {
				'Content-Type': 'application/json'
			},
			failure : function(response){
				console.log('Login Error! ' + response.responseText);
			},
			success: function(response, opts) {
				var data = Ext.decode(response.responseText);
				if(!data.success){
					Ext.Msg.alert('Error', data.msg, Ext.emptyFn);
					formView.destroy();
					console.log('delete old view');
					Ext.Viewport.add({
						xtype: 'login-view'
					});
					console.log('add new view');
				}
				else{
					success = true;
					aqui.addSession(values.usr);
					formView.destroy();
					Ext.Viewport.add({
						xtype:'view-main'
					});
					
				}
			}
			
		});
		if (success) this.addSession(values.usr);
	},
	loginSubmit: function(){
		this.loginUser();
	},
	//
	launch : function(){
		this.callParent(arguments);
		var notasStore = Ext.getStore("Notas");
		notasStore.load();
		console.log("launch telefono");
	}
});
