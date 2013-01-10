/**
 * @class notas.view.todo.ConfirmDialog
 * @extends Ext.MessageBox
 */
Ext.define('mysqlNotas.view.ui.ConfirmDialog', {
  extend: 'Ext.MessageBox',
  xtype: 'confirmdialog',

  confirm: function(config) {
    var title = config.title,
        msg = config.msg,
        fn = config.fn,
		icon= config.icon,
        scope = config.scope;
		
    return this.show({
      title: config.title,
      message : config.msg,
      buttons: Ext.MessageBox.YESNO,
      iconCls: icon,
      scope: scope,
      fn: fn
    });
  }

});
