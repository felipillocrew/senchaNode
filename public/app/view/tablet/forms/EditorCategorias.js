Ext.define('mysqlNotas.view.tablet.forms.EditorCategorias',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.form.FieldSet','Ext.field.Select'],
	alias: 'widget.editor-categorias',
	xtype: 'editor-categorias',
	config:{
		items:[
			{
				xtype: 'toolbar',
				docked: 'bottom',
				itemId: "editCategoriaToolbar"
			},
			{
				xtype: 'fieldset',
				defaults: {
					required: true,
					labelAlign: 'top',
					autoComplete: false,
					labelWidth: '45%'
                },
				items: [
					{
						xtype: 'textfield',
						label: 'Nombre',
						name: 'nombre'
					},
					{
						xtype: 'textfield',
						label: 'Detalle',
						name: 'detalle'
					}
				]
			}
		],
		listeners: [
			{
				delegate:'#btnCatDelete',
				event: 'tap',
				fn: "onbtnDeleteCatTap"
			},
			{
				delegate:'#btnSaveCat',
				event: 'tap',
				fn: "onbtnSaveCatTap"
			}
		]
	},
	onbtnSaveCatTap: function (){
		console.log("btnSaveCat was Tapped!");
		this.fireEvent("saveCategoria", this);
	},
	onbtnDeleteCatTap: function (){
		console.log("btnCatDelete");
		this.fireEvent("deleteCategoria", this);
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
							itemId: "btnSaveCat"
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
							itemId: "btnDeleteCat"
						},
						{
							xtype: 'button',
							iconCls: 'check2',
							iconMask: true,
							itemId: "btnSaveCat"
						}
			]);

			}
	},
	init: function(){
		console.log("btnDelete was Tapped!");
	}
});