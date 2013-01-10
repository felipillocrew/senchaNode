

/********************************FUNCIONES**********************************************/
String.prototype.replaceAll = function(str1, str2, ignore) 
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
String.prototype.trim = function() { 
	return this.replace(/^\s+|\s+$/, ''); 
};
String.prototype.isDigit = function() { 
	return /^\d+$/.test(this); 
};
Array.prototype.isEmpty = function() { 
	return this.length>0?false:true; 
};
String.prototype.charSplit = function() { 
	var l= this.length;
	var strArray=[];
	for(var i=0; i<l; i++){
		strArray[i]=this.charAt(i);
	}
	return strArray; 
};
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
/***************************************************************************************/



var comillas = function(s,config) {
	var comillas=0,largo=0;
	if(config)
		comillas=!config.comillas?0:config.comillas,largo=!config.largo?0:config.largo;
	if (s == null || s.toUpperCase() == "NULL" || s == '')
		return "NULL";
	s = s.trim();
	s = s.replace(/\s\s/g, ' ');
	s = s.replaceAll('\'', '');

	if (s == "")
		return "NULL";

	if (largo != 0 && s.length > largo)
		s = s.substring(0, largo - 1);
	if (comillas != 0)
		s = "'" + s + "'";
	return s;
};

var numerico = function(numero,config){
	
	var ceroesnulo=0,nuloesnulo=0,digitos=-1;
	if(config)
		ceroesnulo=!config.ceroesnulo?0:config.ceroesnulo,
		nuloesnulo=!config.nuloesnulo?0:config.nuloesnulo,
		digitos=!config.digitos?-1:config.digitos;
	
	if (numero == '')
		numero = "NULL";
	if(numero.toUpperCase() == "NULL" && nuloesnulo == 1)
		return "NULL";
	numero=((((numero.replaceAll('', '')).replaceAll('B/.', '')).replaceAll(',', '')).trim()).replace(/\s\s/g, ' ');
	var s= numero.replaceAll('.', ''),sa = s.charSplit();

	for (var value in sa){
		if(!value.isDigit){
			numero = "0";
			break;
		}
	}
	if (ceroesnulo == 1 && numero == "0")
		return "NULL";

	if (digitos != -1) {
		var d = parseFloat(numero);
		d = Math.round(d*(Math.pow(10,parseInt(digitos))))/Math.pow(10,parseInt(digitos));
		numero = d.toString();
	}
	return numero;
};

var updateNotas = function(params){
	var notaid =numerico(params.notaid),
		categoriaid =numerico(params.categoriaid),
		titulo=comillas(params.titulo.capitalize(),{comillas:1}),
		detalle=comillas(params.detalle,{comillas:1});
	return sql="update nota set categoriaid="+categoriaid+",titulo="+titulo+",detalle="+detalle+"where notaid="+notaid+";";
};

var insertNotas = function(params){
	console.log(params);
	var categoriaid= numerico(params.categoriaid),titulo=comillas(params.titulo.capitalize(),{comillas:1}),detalle=comillas(params.detalle,{comillas:1});
	return sql="insert into nota (categoriaid,titulo,detalle) values ("+ categoriaid+","+titulo+","+detalle+");"
};

var updateCategoria = function(params){
	var categoriaid =numerico(params.categoriaid),
		nombre=comillas(params.nombre.capitalize(),{comillas:1}),
		detalle=comillas(params.detalle,{comillas:1});
	return sql="update categoria set categoriaid="+categoriaid+",nombre="+nombre+",detalle="+detalle+"where categoriaid="+categoriaid+";";
};

var insertCategoria = function(params){
	console.log(params);
	var nombre=comillas(params.nombre.capitalize(),{comillas:1}),
		detalle=comillas(params.detalle,{comillas:1});
	return sql="insert into categoria (nombre,detalle) values ("+nombre+","+detalle+");"
};




module.exports.comillas = comillas;
module.exports.numerico = numerico;

module.exports.updateNotas = updateNotas;
module.exports.insertNotas = insertNotas;

module.exports.updateCategoria = updateCategoria;
module.exports.insertCategoria = insertCategoria;