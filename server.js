
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');
const router = express.Router();

pg.defaults.ssl = true;
var conString = "postgres://lfginsenmkkkri:4ac5d7ee37cb823610577318946c21e64f5db453e3aaa7b0f14221b2983bf92a@ec2-54-235-68-3.compute-1.amazonaws.com:5432/d9ms119o8u5lqi";

var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(permitirCrossDomain);


app.get('/', function(req, res) {
    res.sendfile('index.html');
});

console.log("Servidor iniciado");
    // escuchar
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
    
        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
    
            client.end();
            return res.json(result.rows);
            
        });
    });
});
    
//Usuario para actualizar y eliminar
app.get('/mostrarUsuario/:id',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.params.id;

    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result.rows);
        
        });
        
    });
});

app.put('/actualizarUsuario',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuario SET correo='"+req.body.correo+"', clave='"+req.body.clave+"', nombre='"+req.body.nombre+"',apellido='"+req.body.apellido+"',fecha_nacimiento='"+req.body.fecha_nacimiento+"', sexo='"+req.body.sexo+"' WHERE id='" + id + "';", function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });
});


app.delete('/eliminarUsuario',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;

    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
    
        client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });


});
//RESPUESTA
app.get('/mostrarRespuesta/:id',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.params.id;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT * FROM respuesta WHERE id=' + id + ';', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
  
  
});


app.get('/listarRespuestas', (req, res, next) => {
   var client = new pg.Client(conString);
   client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT * FROM respuesta', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }

           client.end();
           return res.json(result.rows);
          
       });
   });
});

app.put('/actualizarRespuesta',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.body.idusuario;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
  
        client.query("UPDATE respuesta SET rspverde='"+req.body.rspverde+"',rspdesayunosalado='"+req.body.rspdesayunosalado+"',rspdesayunodulce='"+req.body.rspdesayunodulce+"',rspalmuerzo='"+req.body.rspalmuerzo+"',rspmarisco='"+req.body.rspmarisco+"',rspsopa='"+req.body.rspsopa+"',rspcena='"+req.body.rspcena+"',rspcomidatipicacosta='"+req.body.rspcomidatipicacosta+"',rspcomidatipicasierra='"+req.body.rspcomidatipicasierra+"',rspcomidatipicaoriente='"+req.body.rspcomidatipicaoriente+"',rspproteina='"+req.body.rspproteina+"',rsppostres='"+req.body.rsppostres+"',rspsaboresdulces='"+req.body.rspsaboresdulces+"',rspbebida='"+req.body.rspbebida+"',rspcomidaextranjera='"+req.body.rspcomidaextranjera+"',rspcomidarapida='"+req.body.rspcomidarapida+"' WHERE idusuario='" + idusuario + "';", function(err, result) {
            
            if(err) {
                  return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
     });
});


app.delete('/eliminarRespuesta',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('DELETE FROM respuesta WHERE id=' + id + ';', function(err, result) {
          
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result);
       });
   });
  
  
});

app.post('/GuardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (nombre,apellido,correo,clave,sexo,fecha_nacimiento) VALUES ('"+req.body.nombre+"', '"+req.body.apellido+"', '"+req.body.correo+"', '"+req.body.clave+"', '"+req.body.sexo+"', '"+req.body.fecha_nacimiento+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});
app.post('/GuardarRespuesta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
      
        console.log("miau "+util.inspect(req,false,null));
       
        client.query("INSERT INTO respuesta (idusuario,rspverde,rspdesayunosalado,rspdesayunodulce,rspalmuerzo,rspmarisco,rspsopa,rspcena,rspcomidatipicacosta,rspcomidatipicasierra,rspcomidatipicaoriente,rspproteina,rsppostres,rspsaboresdulces,rspbebida,rspcomidaextranjera,rspcomidarapida) VALUES ("+req.body.idusuario+",'"+req.body.rspverde+"','"+req.body.rspdesayunosalado+"','"+req.body.rspdesayunodulce+"','"+req.body.rspalmuerzo+"','"+req.body.rspmarisco+"','"+req.body.rspsopa+"','"+req.body.rspcena+"','"+req.body.rspcomidatipicacosta+"','"+req.body.rspcomidatipicasierra+"','"+req.body.rspcomidatipicaoriente+"','"+req.body.rspproteina+"','"+req.body.rsppostres+"','"+req.body.rspsaboresdulces+"','"+req.body.rspbebida+"','"+req.body.rspcomidaextranjera+"','"+req.body.rspcomidarapida+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
       
            //console.log(result);
            client.end();
            return res.json(result.rows);
           
        });
       
    });
});
 
app.get('/listarInformacion', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
 
        client.query('SELECT * FROM informacion', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
 
            client.end();
            return res.json(result.rows);
           
        });
    });
 });
 

app.put('/actualizarInformacion',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.body.idusuario;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
  
        client.query("UPDATE informacion SET universidad='"+req.body.universidad+"',ciudad='"+req.body.ciudad+"',preferencia='"+ req.body.preferencia+"',descripcion='"+req.body.descripcion+"',instagram='"+req.body.instagram+"',numero='"+req.body.numero+"',foto='"+req.body.foto+"' WHERE idusuario='" + idusuario + "';", function(err, result) {
            
            if(err) {
                  return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json("Valio");
        });
     });
});

app.delete('/eliminarInformacion',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('DELETE FROM informacion WHERE id=' + id + ';', function(err, result) {
          
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result);
       });
   });
  
  
});

app.get('/mostrarInformacion/:idusuario',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.params.idusuario;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT * FROM informacion WHERE idusuario=' + idusuario + ';', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});

app.post('/GuardarInformacion', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
      
        console.log("miau "+util.inspect(req,false,null));
       
        client.query("INSERT INTO  informacion  (idusuario,universidad,ciudad,descripcion,instagram,preferencia,numero,foto) VALUES ("+req.body.idusuario+", '"+req.body.universidad+"', '"+req.body.ciudad+"','"+req.body.descripcion+"', '"+req.body.instagram+"', '"+req.body.preferencia+"','"+req.body.numero+"','"+req.body.foto+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
       
            //console.log(result);
            client.end();
            return res.json(result.rows);
           
        });
       
    });
});
app.get('/ultimoidusuario',(req,res)=>{
    var client = new pg.Client(conString);
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT id from usuario order by id desc LIMIT 1', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});
app.get('/generarinformacion/:idusuario',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.params.idusuario;

    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query("INSERT INTO  informacion  (idusuario,universidad,ciudad,descripcion,instagram,preferencia,numero,foto) VALUES ("+idusuario+", '', '','', '', '','','');", function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});

app.get('/mostrarTodo/:idusuario',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.params.idusuario;

    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT U.sexo,I.preferencia,R.* FROM usuario U,informacion I,respuesta R WHERE U.id='+idusuario+' AND I.idusuario='+idusuario+' AND R.idusuario='+idusuario+';', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});

app.get('/match/:idusuario',(req,res)=>{
    var client = new pg.Client(conString);
    var idusuario=req.params.idusuario;
    var datosUsuario;
    var datosTodos;
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
       }

       client.query('SELECT U.sexo,I.preferencia,R.* FROM usuario U,informacion I,respuesta R WHERE U.id='+idusuario+' AND I.idusuario='+idusuario+' AND R.idusuario='+idusuario+';', function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
            datosUsuario=result.rows;
            if (datosUsuario.length != 0) {
                //response.push({'result' : 'success', 'data' : rows});
                console.log("bine");
                client.query('SELECT U.sexo,U.nombre,I.preferencia,R.* FROM usuario U,informacion I,respuesta R WHERE I.idusuario=U.id AND R.idusuario=U.id', function(err, result) {
                    if(err) {
                        return console.error('error running query', err);
                    }
                    if (result.rows.length != 0) {
                        console.log("bieeen");
                        //console.log(result.rows);
                        datosTodos=result.rows;
                        //return(result.rows);
                        //return res.json(datosTodos);
                        var datosMatch=[];
                        var matchCoincidencias=[];
                        console.log(datosUsuario);
                        datosTodos.forEach(user => {
                            var coincidencias=0;
                            //console.log("yo: "+(user.sexo+"es"));
                            //console.log("yo: "+datosUsuario[0].preferencia);
                            if(user.id!=datosUsuario[0].idusuario){
                                if(user.preferencia == datosUsuario[0].sexo){
                                    if(datosUsuario[0].preferencia == user.sexo){
                                        //datosMatch.push(user);
                                        //console.log("entro");
                                        if(user.rspverde==datosUsuario[0].rspverde){
                                            coincidencias++;
                                        }
                                        if(user.rspdesayunosalado==datosUsuario[0].rspdesayunosalado){
                                            coincidencias++;
                                            
                                        }
                                        if(user.rspdesayunodulce==datosUsuario[0].rspdesayunodulce){
                                            coincidencias++;
                                        }
                                        if(user.rspalmuerzo==datosUsuario[0].rspalmuerzo){
                                            coincidencias++;
                                        }
                                        if(user.rspmarisco==datosUsuario[0].rspmarisco){
                                            coincidencias++;
                                        }
                                        if(user.rspsopa==datosUsuario[0].rspsopa){
                                            coincidencias++;
                                        }
                                        if(user.rspcena==datosUsuario[0].rspcena){
                                            coincidencias++;
                                        }
                                        if(user.rspcomidatipicacosta==datosUsuario[0].rspcomidatipicacosta){
                                            coincidencias++;
                                        }
                                        if(user.rspcomidatipicasierra==datosUsuario[0].rspcomidatipicasierra){
                                            coincidencias++;
                                        }
                                        if(user.rspcomidatipicaoriente==datosUsuario[0].rspcomidatipicaoriente){
                                            coincidencias++;
                                        }
                                        if(user.rspproteina==datosUsuario[0].rspproteina){
                                            coincidencias++;
                                        }
                                        if(user.rsppostres==datosUsuario[0].rsppostres){
                                            coincidencias++;
                                        }
                                        if(user.rspsaboresdulces==datosUsuario[0].rspsaboresdulces){
                                            coincidencias++;
                                        }
                                        if(user.rspbebida==datosUsuario[0].rspbebida){
                                            coincidencias++;
                                        }
                                        if(user.rspcomidaextranjera==datosUsuario[0].rspcomidaextranjera){
                                            coincidencias++;
                                        }
                                        if(user.rspcomidarapida==datosUsuario[0].rspcomidarapida){
                                            
                                            coincidencias++;
                                        }
                                    }
                                    
                                }
                            }
                            if(coincidencias>0){
                                //matchCoincidencias.push(coincidencias);
                                user.coincidencias=coincidencias;
                                datosMatch.push(user);
                            }
                            console.log(coincidencias);
                            
                        });
                        datosMatch.sort(function(a,b){
                            //return a.attributes.OBJECTID - b.attributes.OBJECTID;
                            if(a.coincidencias == b.coincidencias)
                                return 0;
                            if(a.coincidencias < b.coincidencias)
                                return 1;
                            if(a.coincidencias > b.coincidencias)
                                return -1;
                        });
                        return res.json(datosMatch);




                    } else {
                        response.push({'result' : 'error', 'msg' : 'No Results Found'});
                    }
                });
                
            } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
            }
            
       });
   });
});