
var express = require('express'),
crypto = require('crypto'),
routes = require('./routes'),
funciones = require('./functions'),
app = module.exports = express(),
_mysql = require('mysql');

var host = '127.0.0.1',
port = '3306',
user = 'cristobal',
password = 'c706180t',
db = 'notas';

var mysql = _mysql.createClient({
	host: host,
	port: port,
	user: user,
	password: password
});
mysql.query('use ' + db);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('mysql', mysql);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	})); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});


app.get('/', function (req, res) {
	res.redirect('/index.html');
});

app.get('/notas', function (req, res) {
	app.settings.mysql.query('select * from nota order by fecha',function(err,notas){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		res.contentType('json');
		res.json({
			success: true,
			notas: notas
		});
	});
});

app.get('/categorias', function (req, res) {
	app.settings.mysql.query('select * from categoria order by nombre',function(err,categorias){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		res.contentType('json');
		res.json({
			success: true,
			categorias: categorias
		});
	});
});

app.get('/nota/:notaid', function (req, res) {
	if(req.params.notaid){
		app.settings.mysql.query('select * from nota where notaid='+req.params.notaid+' order by fecha',function(err,notas){
			if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
			res.contentType('json');
			res.json({
				success: true,
				notas: notas
			});
		});
	}
	else{
		res.contentType('json');
		res.json({
			success: false,
			msg: 'debe especificar un id'
		});
	}
});

app.get('/nota', function (req, res) {
	res.contentType('json');
	res.json({
		success: false,
		msg: 'debe especificar un id'
	});
});

app.post('/nota/del/', function (req, res) {
	app.settings.mysql.query('delete from nota where notaid='+funciones.numerico(req.body.notaid)+';',function(err,result){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		res.contentType('json');
		res.json({
			success: true,
			msg: 'Eliminado Correctamente'
		});
	});
});

app.post('/nota/save', function (req, res) {
	if(funciones.numerico(req.body.notaid)!='0') update(req,res);
	else insert(req,res);
});

var update = function(req,res){
	var sql = funciones.updateNotas(req.body);
	app.settings.mysql.query(sql,function(err,result){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		console.log(result);
		res.contentType('json');
		res.json({
			success: true,
			msg: '<h2>Actulizado Correctamente</h2>'
			
		});
	});
};
var insert = function(req,res){
	var sql = funciones.insertNotas(req.body);
	app.settings.mysql.query(sql,function(err,result){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		res.contentType('json');
		res.json({
			success: true,
			msg: 'insertado Correctamente, id:' + result.insertId
		});
	});
};


app.post('/categoria/save', function (req, res) {
	if(funciones.numerico(req.body.categoriaid)!='0') updateCategoria(req,res);
	else insertCategoria(req,res);
});

var updateCategoria = function(req,res){
	var sql = funciones.updateCategoria(req.body);
	app.settings.mysql.query(sql,function(err,result){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		console.log(result);
		res.contentType('json');
		res.json({
			success: true,
			msg: '<h2>Actulizado Correctamente</h2>'
			
		});
	});
};
var insertCategoria = function(req,res){
	var sql = funciones.insertCategoria(req.body);
	app.settings.mysql.query(sql,function(err,result){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: err.message
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		res.contentType('json');
		res.json({
			success: true,
			msg: 'insertado Correctamente, id:' + result.insertId
		});
	});
};


/*************************************LOGIN*********************************************/
app.post('/login', function (req, res) {
	var usr= req.body.usr, pwd=req.body.pwd;
	autenticar(usr,pwd,function(data){
		res.contentType('json');
		res.json(data);
	});		
});

var autenticar = function(usr,pwd,message){
	app.settings.mysql.query("select usuario,clave from usuarios where usuario="+ funciones.comillas(usr,{
		comillas:1
	}),function(err,res){
		if (err) {
			res.contentType('json');
			res.json({
				success: false,
				msg: funciones.comillas(err.message)
			});
			//throw new Error('Error en la Base de Datos');
			console.log("Error: " + err.message);
			return;
		}
		if(!res.isEmpty())
		{
			var usrdb=res[0].usuario, pwddb=res[0].clave;
			if(usr.toString()==usrdb.toString()){
				var md5 = crypto.createHash('md5');
				md5.update(pwd);
				if(md5.digest('hex')==pwddb)
					message({
						success: true, 
						msg: 'Bienvenido'
					});
				else
					message({
						success: false,
						msg: 'Password Incorrecta'
					});
			}
			else
				message({
					success: false,
					msg: 'Usuario Incorrecta'
				});
		}
		else
			message({
				success: false,
				msg: 'usuario: <b>' + usr +'</b>, no existe'
				});
		
	});
	
};

/***************************************************************************************/

	
	
app.listen(3000);
console.log("Express server listening on port 3000");
