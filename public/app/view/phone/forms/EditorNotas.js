Ext.define('mysqlNotas.view.phone.forms.EditorNotas',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.form.FieldSet'],
	alias: 'widget.editor-notas-view',
	xtype: 'editor-notas-view',
	config:{
		srollable: 'vertical',
		items:[
			{
				xtype: 'toolbar',
				docked: 'bottom',
				itemId: "editToolbar"
			},
			{
				xtype: 'fieldset',
				defaults: {
					required: true,
					labelAlign: 'top',
					labelWidth: '45%',
					utoComplete: false
                },
				items: [
					{
						xtype: 'textfield',
						label: 'Titulo',
						name: 'titulo'
					},
					{
						xtype: 'textareafield',
						label: 'Texto',
						name: 'detalle',
						maxRows: 12
					}
				]
			}
		],
		listeners: [
			{
				delegate:'#btnDelete',
				event: 'tap',
				fn: "onbtnDeleteTap"
			},
			{
				delegate:'#btnSave',
				event: 'tap',
				fn: "onbtnSaveTap"
			}
		]
	},
	onbtnSaveTap: function (){
		console.log("btnSave was Tapped!");
		this.fireEvent("saveNote", this);
	},
	onbtnDeleteTap: function (){
		
		this.fireEvent("deleteNote", this);
	},
	addbuttons: function(toolbar,isEdit){
		if(isEdit){
			toolbar.add([{
							xtype: 'spacer'
						},
						{
							xtype: 'button',
							iconCls: 'check2',
							iconMask: true,
							itemId: "btnSave"
						}]);
		}
		else{
			toolbar.add([
				{
							xtype: 'spacer'
						},
						{
							xtype: 'button',
							iconCls: 'delete2',
							iconMask: true,
							itemId: "btnDelete"
						},
						{
							xtype: 'button',
							iconCls: 'check2',
							iconMask: true,
							itemId: "btnSave"
						}
			]);

			}
	},
	init: function(){
		console.log("btnDelete was Tapped!");
	}
});