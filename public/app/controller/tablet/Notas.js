Ext.define('mysqlNotas.controller.tablet.Notas',{
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			main: 'view-main',
			notas: '#listaNotas',
			categorias: '#listaCategorias',
			editornotas: 'editor-notas-view',
			loginview: 'login-view',
			acctions: 'acctions-dialog',
			editorCategorias: 'editor-categorias'
			
		},
		control: {
			main: { 
				activeContainer: 'activeContainer',
				logoutFn: 'logout',
				/*Notas*/
				crearNuevaNota: 'crearNuevaNota',
				editarNota: 'editarNota',
				swipeNota: 'showAct',
				reloadList: 'reloadList',
				showAct: 'showAct',
				searchNote: 'SearchKeyUp',
				searchClear: 'searchClear',
				/*Categorias*/
				addCat: 'agregarCat',
				refreshCat: 'reloadCat',
				selectCategoria: 'onSelectCategoria',
				deleteFilter: 'onDeleteFilter'
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
			},
			editorCategorias:{
				saveCategoria: 'onSaveCategoria',
				deleteCategoria: 'onDeleteCategoria'
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
		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		
		var nuevaNota = Ext.create("mysqlNotas.model.Nota",{
			notaid: 0,
			categoriaid:1,
			fecha: now,
			titulo: "",
			detalle: ""
		});
		this.verEditorNotas(nuevaNota)
	},
	editarNota : function(list, record){
		this.verEditorNotas(record)
	},
	reloadList : function(){
		this.loadNotes();
	},
	showAct: function(dataview, idx, target, record, event){
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
					this.borrar(record,dialog);
				}
				else dialog.destroy();
			}
		});
		act.destroy();
	},
	activeContainer : function(){},
	verEditorNotas: function(record) {
		var title = record.titulo();
		if(title=='') title = 'Nota Nueva';
		var editNota = Ext.create('mysqlNotas.view.tablet.forms.EditorNotas', {
			title: title
		});
		var editToolbar = editNota.down('#editToolbar');
		editNota.addbuttons(editToolbar,record.isNew());
	
		editNota.setRecord(record);    
		this.getMain().push(editNota);
  
	},
	saveNote: function(){
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
					this.guardar(editornotas,dialog);
				}
				else dialog.destroy();
			}
		});  
	},
	deleteNote: function(){
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
		currentNote.set("titulo", newValues.titulo);
		currentNote.set("detalle", newValues.detalle);
		var errors = currentNote.validate();
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
		console.log(data);
		Ext.Ajax.request({
			url: '/nota/save',
			method: 'post',
			scope: this,
			params:{
				notaid: data.notaid,
				categoriaid: data.categoriaid,
				titulo: data.titulo,
				detalle: data.detalle
			},
			success: function(response){
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
		Ext.Ajax.request({
			url: '/nota/del/',
			method: 'post',
			scope: this,
			params:{
				notaid: data.notaid
			},

			success: function(response){
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
		sessionStore.add(nuevaSession);
		sessionStore.sync();
		
	},
	logout : function(){
		var sessionStore=Ext.getStore("Session"),
		model = sessionStore.first();
		sessionStore.remove(model);
		sessionStore.sync();
		this.getMain().destroy();
		Ext.Viewport.add(Ext.create('mysqlNotas.view.tablet.forms.login'));
		
	},
	loginUser: function(){
		var formView = this.getLoginview(),
		values = formView.getValues(),
		url = formView.getUrl(), aqui = this;
		var success= false;
		Ext.Ajax.request({
			url: url,
			method: 'post',
			//params: JSON.stringify(values),
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
					Ext.Viewport.add({
						xtype: 'login-view'
					});
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
	SearchKeyUp:function(v,f){
		var e=f.getValue(),b=this.getNotas().getStore();
		b.clearFilter();
		if(e){
			var d=e.split(" "),a=[],c;
			for(c=0;c<d.length;c++){
				if(!d[c]) continue;
				a.push(new RegExp(d[c],"i"))
			}
			b.filter(function(h){
				var g=[];
				for(c=0;c<a.length;c++){
					var j=a[c],i=h.get("titulo").match(j)||h.get("detalle").match(j);
					g.push(i)
				}
				if(a.length>1&&g.indexOf(false)!=-1) return false;
				else return g[0];
			});
		}
	},
	searchNote: function(view,field,event,opt){
		if(event.browserEvent.keyIdentifier =="Enter"){
			var value = field.getValue(),  
			store = this.getNotas().getStore();
			
			store.clearFilter();
			if (value){
				var searches = value.split(' '),regexps = [],i;
				for (i = 0; i < searches.length; i++) 
				{  
					if (!searches[i]) continue;  
					//if found, create a new regular expression which is case insenstive  
					regexps.push(new RegExp(searches[i], 'i'));  
				}
				
				store.filter(function(record) 
				{  
					var matched = [];  
					//loop through each of the regular expressions  
					for (i = 0; i < regexps.length; i++) 
					{  
						var search = regexps[i],  
						didMatch = record.get('titulo').match(search);
						//if it matched the first or last name, push it into the matches array   
						matched.push(didMatch);  
					}  //if nothing was found, return false (dont so in the store)                 
					if (regexps.length > 1 && matched.indexOf(false) != -1) {  
						return false;  
					} else {  
						//else true true (show in the store)  
						return matched[0];  
					}  
				});
			}
		}
	},
	searchClear: function() {
		this.getNotas().getStore().clearFilter();
	},
	/**********************CATEGORIA TOOL BAR*****************************/
	agregarCat: function(){
		console.log('abre form de categoria');	
		var nuevaCategoria = Ext.create("mysqlNotas.model.Categoria",{
			categoriaid:0,
			nombre: "",
			detalle: ""
		});
		this.verEditorCategorias(nuevaCategoria)
	},
	reloadCat: function(){
		console.log('recarga las categorias');
		this.loadCategorias();
	},
	onSelectCategoria:function(list, record){
		console.log('has selecionado categorias: ' +record.get('nombre') + ' con el id: ' + record.get('categoriaid'));
		var id = record.get('categoriaid'),  
		store = this.getNotas().getStore();
		store.clearFilter();
		if (id){			
			store.filter('categoriaid',id);
		}
	},
	onDeleteFilter:function(){
		this.getNotas().getStore().clearFilter();
		this.getCategorias().deselectAll();
	},
	loadCategorias: function(){
		var categorias = Ext.getStore("Categorias");
		categorias.load();
		var nuevaCategoria = Ext.create("mysqlNotas.model.Categoria",{
			categoriaid:0,
			nombre: "Sin Categoria",
			detalle: "no tiene detalle"
		});
		categorias.add(nuevaCategoria)
	},
	verEditorCategorias: function(record) {
		var title = record.titulo();
		if(title=='') title = 'Categoria Nueva';
		var EditorCategorias = Ext.create('mysqlNotas.view.tablet.forms.EditorCategorias', {
			title: title
		});
		var editToolbar = EditorCategorias.down('#editCategoriaToolbar');
		EditorCategorias.addbuttons(editToolbar,record.isNew());
	
		EditorCategorias.setRecord(record);    
		this.getMain().push(EditorCategorias);
  
	},
	onSaveCategoria: function(){
		var editorCategorias = this.getEditorCategorias();
		editorCategorias.add({
			xtype: 'confirmdialog',
			id: 'save-confirm-dialog'
		});
		var dialog = editorCategorias.down('#save-confirm-dialog');
		dialog.confirm({
			title : 'Confirm',
			msg: 'guardar la Categoria?',
			icon: 'msg-faq',
			scope: this,
			fn: function(btn) {
				if (btn == 'yes') {
					var toSaveCategoria = editorCategorias.getRecord(),
					formValues = editorCategorias.getValues();
					toSaveCategoria.set("nombre", formValues.nombre);
					toSaveCategoria.set("detalle", formValues.detalle)
					var errors = toSaveCategoria.validate();
					if (!errors.isValid()){
						dialog.destroy();
						var msg = 'Por favor corrija los errores: <ul>';
						for(var i = 0; i < errors.items.length; i++)
							msg += '<li>' + errors.items[i].getMessage() + '</li>';
						msg += '</ul>';
						Ext.Msg.alert('Errores', msg); //Ext.emptyFn
						return;
					}
					this.doSaveCategoria(toSaveCategoria);
					this.getMain().pop();
				}
				else dialog.destroy();
			}
		});  
		
	},
	doSaveCategoria: function(record) {
		var data=record.data;
		Ext.Ajax.request({
			url: '/categoria/save',
			method: 'post',
			scope: this,
			params:{
				categoriaid: data.categoriaid,
				nombre: data.nombre,
				detalle: data.detalle
			},
			success: function(response){
				var data = Ext.decode(response.responseText);
				if(!data.success){
					Ext.Msg.alert('Error', data.msg);
				}
				Ext.Msg.alert('Result', data.msg, this.loadCategorias);
			},
			failure: function(response) {
				Ext.Msg.alert('Result', 'Failure! Internal error occurred.');
			}
		});
	},
	onDeleteCategoria: function(){
		
	},
	/***********************************************/
	launch : function(){
		this.callParent(arguments);
		//this.loadNotes();//
		console.log('launch tablet');
	},
	init: function(){
		var categorias = Ext.getStore("Categorias"),
		nuevaCategoria = Ext.create("mysqlNotas.model.Categoria",{
			categoriaid:0,
			nombre: "Sin Categoria",
			detalle: "no tiene detalle"
		});
		categorias.add(nuevaCategoria)
		
	}
});
