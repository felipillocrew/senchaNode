Ext.define('mysqlNotas.view.forms.login',{
	extend: 'Ext.form.Panel',
	requires: ['Ext.form.FieldSet','Ext.field.Password'],
	alias: 'widget.login-view',
	xtype: 'login-view',
	config:{
		url: 'login.php',
		showAnimation: flipLeft,
		standardSubmit : false,
		itemId: 'formLogin',
		items:[
			{
				xtype: 'toolbar',
				docked: 'bottom',
				itemId: "logintoolbar",
				items: [
					{xtype: 'spacer'},
					{
						xtype: 'button',
						ui: 'confirm',
						text: 'Entrar',
						itemId: "btnlogin"
						
					}
				]
			},
			{
				xtype: 'fieldset',
				title: 'myNotes',
                instructions: 'Please login.',
				/*top: '30%',
				width: '97%',*/
                defaults: {
					required: true,
					labelAlign: 'top',
					labelWidth: '45%'
                },
				items: [
					{
						xtype: 'textfield',
						//label: 'Username',
						placeHolder: 'Username',
						name: 'usr'
					},
					{
						xtype: 'passwordfield',
						//label: 'Password',
						placeHolder: 'Password',
						name: 'pwd'
					}
				]
			}
		],
		listeners: [
			{
				delegate:'#btnlogin',
				event: 'tap',
				fn: "onbtnloginTap"
			},
			{
				delegate:'#fromLogin',
				event: 'submit',
				fn: "onFormsubmit"
			},
			{
				delegate:'#fromLogin',
				event: 'exception',
				fn: "onFormexception"
			}
		]
	},
	onbtnloginTap: function (){
		console.log("btnlogin was Tapped!");
		this.fireEvent("loginUser", this);
	},
	onFormsubmit: function (form, result, event){
		
		this.fireEvent("loginSubmit", this, form, result, event);
	},
	onFormexception: function (form, result, event){
		
		this.fireEvent("formexception", this, form, result, event);
	}
});