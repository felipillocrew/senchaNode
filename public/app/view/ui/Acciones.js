Ext.define('mysqlNotas.view.ui.Acciones', {
  extend: 'Ext.ActionSheet',
  xtype: 'acctions-dialog',

  config: {
	  items: [
        {
			xtype: 'button',
            text: 'Eliminar',
            ui  : 'decline',
			itemId: 'actDelete'
        },
        {
			xtype: 'button',
            text: 'Editar',
			ui  : 'action',
			itemId: 'actEdit'
        },
        {
			xtype: 'button',
            text: 'Cancel',
            ui  : 'confirm',
			itemId: 'actCancel'
        }
    ],
	listeners: [
		{
			delegate:'#actCancel',
			event: 'tap',
			fn: "onactCancelTap"
		},
		{
			delegate:'#actEdit',
			event: 'tap',
			fn: "onactEditTap"
		},
		{
			delegate:'#actDelete',
			event: 'tap',
			fn: "onactDeleteTap"
		}
	]
  },
  onactCancelTap: function (){
	console.log("actCancel was Tapped!");
	this.fireEvent("cancelAct", this);
  },
  onactEditTap: function (){
	console.log("actEdit was Tapped!");
	this.fireEvent("editAct", this);
  },
  onactDeleteTap: function (){
	console.log("actDelete was Tapped!");
	this.fireEvent("deleteAct", this);
}

});
