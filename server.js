
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

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
    var id=req.body.id;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
  
        client.query("UPDATE respuesta SET rspVerde='"+req.body.rspVerde+"', rspDesayunoSalado='"+req.body.rspDesayunoSalado+"',rspDesayunoDulce='"+req.body.rspDesayunoDulce+"',rspAlmuerzo='"+req.body.rspAlmuerzo+"',rspMarisco='"+req.body.rspMarisco+"', rspSopa='"+req.body.rspSopa+"', rspCena='"+req.body.rspCena+"', rspComidaTipicaCosta='"+req.body.rspComidaTipicaCosta+"', rspComidaTipicaSierra='"+req.body.rspComidaTipicaSierra+"', rspComidaTipicaOriente='"+req.body.rspComidaTipicaOriente+"', rspProteina='"+req.body.rspProteina+"', rspPostres='"+req.body.rspPostres+"' , rspSaboresDulces='"+req.body.rspSaboresDulces+"', rspBebida='"+req.body.rspBebida+"', rspComidaExtranjera='"+req.body.rspComidaExtranjera+"', rspComidaRapida='"+req.body.rspComidaRapida+"' WHERE id='" + id + "';", function(err, result) {
            
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
       
        client.query("INSERT INTO respuesta (idusuario,rspverde,rspdesayunosalado,rspdesayunodulce,rspalmuerzo,rspmarisco,rspsopa,rspcena,rspcomidatipicacosta,rspcomidatipicasierra,rspcomidatipicaoriente,rspproteina,rsppostres,rspsaboresdulces,rspbebida,rspcomidaextranjera,rspcomidarapida) VALUES ("+req.body.idusuario+",'"+req.body.rspverde+"','"+req.body.rspdesayunosalado+"','"+req.body.rspdesayunodulce+"','"+req.body.rspalmuerzo+"','"+req.body.rspmarisco+"','"+req.body.rspsopa+"','"+req.body.rspcena+"','"+req.body.rspcomidatipicacosta+"',"+req.body.rspcomidatipicasierra+"','"+req.body.rspcomidatipicaoriente+"','"+req.body.rspproteina+"','"+req.body.rsppostres+"','"+req.body.rspsaboresdulce+"','"+req.body.rspbebida+"','"+req.body.rspcomidaextranjera+"','"+req.body.rspcomidarapida+"');", function(err, result) {
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
  
        client.query("UPDATE informacion SET universidad='"+req.body.universidad+"',ciudad='"+req.body.ciudad+"',preferencia='"+ req.body.preferencia+"',descripcion='"+req.body.descripcion+"',instagram='"+req.body.instagram+"',numero='"+req.body.numero+"' WHERE idusuario='" + idusuario + "';", function(err, result) {
            
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
       
        client.query("INSERT INTO  informacion  (idusuario,universidad,ciudad,descripcion,instagram,preferencia,numero) VALUES ("+req.body.idusuario+", '"+req.body.universidad+"', '"+req.body.ciudad+"','"+req.body.descripcion+"', '"+req.body.instagram+"', '"+req.body.preferencia+"','"+req.body.numero+"');", function(err, result) {
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

       client.query("INSERT INTO  informacion  (idusuario,universidad,ciudad,descripcion,instagram,preferencia,numero) VALUES ("+idusuario+", '', '','', '', '','');", function(err, result) {
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result.rows);
      
       });
      
   });
    
});