
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

        client.query("UPDATE usuario SET correo='"+req.body.correo+"', clave='"+req.body.clave+"', nombre='"+req.body.nombre+"',apellido='"+req.body.apellido+"',numero='"+req.body.numero+"',fecha_nacimiento='"+req.body.fecha_nacimiento+"', sexo='"+req.body.sexo+"' WHERE id='" + id + "';", function(err, result) {
            
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
    
app.post('/GuardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("miau "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (nombre,apellido,numero,correo,clave,sexo,fecha_nacimiento) VALUES ('"+req.body.nombre+"', '"+req.body.apellido+"', '"+req.body.numero+"', '"+req.body.correo+"', '"+req.body.clave+"', '"+req.body.sexo+"', '"+req.body.fecha_nacimiento+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
        
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
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
  
        client.query("UPDATE respuesta SET rspPreferencia='"+req.body.rspPreferencia+"', rspVerde='"+req.body.rspVerde+"', rspDesayunoSalado='"+req.body.rspDesayunoSalado+"',rspDesayunoDulce='"+req.body.rspDesayunoDulce+"',rspAlmuerzo='"+req.body.rspAlmuerzo+"',rspMarisco='"+req.body.rspMarisco+"', rspSopa='"+req.body.rspSopa+"', rspCena='"+req.body.rspCena+"', rspComidaTipicaCosta='"+req.body.rspComidaTipicaCosta+"', rspComidaTipicaSierra='"+req.body.rspComidaTipicaSierra+"', rspComidaTipicaOriente='"+req.body.rspComidaTipicaOriente+"', rspProteina='"+req.body.rspProteina+"', rspPostres='"+req.body.rspPostres+"' , rspSaboresDulces='"+req.body.rspSaboresDulces+"', rspBebida='"+req.body.rspBebida+"', rspComidaExtranjera='"+req.body.rspComidaExtranjera+"', rspComidaRapida='"+req.body.rspComidaRapida+"' WHERE id='" + id + "';", function(err, result) {
            
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

app.post('/GuardarRespuesta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
      
        console.log("miau "+util.inspect(req,false,null));
       
        client.query("INSERT INTO respuesta (idusuario,rspPreferencia,rspVerde,rspDesayunoSalado,rspDesayunoDulce,rspAlmuerzo,rspMarisco,rspSopa,rspCena,rspComidaTipicaCosta,rspComidaTipicaSierra,rspComidaTipicaOriente,rspProteina,rspPostres,rspSaboresDulces,rspBebida,rspComidaExtranjera,rspComidaRapida) VALUES ('"+req.body.idusuario+"', '"+req.body.rpsPreferencia+"', '"+req.body.rspVerde+"', '"+req.body.rspDesayunoSalado+"', '"+req.body.rspDesayunoDulce+"', '"+req.body.rspAlmuerzo+"',  '"+req.body.rspMarisco+"', '"+req.body.rspSopa+"', '"+req.body.rspCena+"','"+req.body.rspComidaTipicaCosta+"',"+req.body.rspComidaTipicaSierra+"','"+req.body.rspComidaTipicaOriente+"', '"+req.body.rspProteina+"', '"+req.body.rspPostres+"', '"+req.body.rspSaboresDulce+"', '"+req.body.rspBebida+"', '"+req.body.rspComidaExtranjera+"', '"+req.body.rspComidaRapida+"');", function(err, result) {
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
    var id=req.body.id;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
  
        client.query("UPDATE informacion SET universidad='"+req.body.universidad+"', ciudad='"+req.body.ciudad+"', pais='"+req.body.pais+"',carrera='"+req.body.carrera+"' WHERE id='" + id + "';", function(err, result) {
            
            if(err) {
                  return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
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

app.get('/mostrarInformacion/:id',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.params.id;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('SELECT * FROM informacion WHERE id=' + id + ';', function(err, result) {
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
       
        client.query("INSERT INTO  informacion  (idusuario,universidad,ciudad,pais,carrera) VALUES ('"+req.body.idusuario+"', '"+req.body.rpsUniversidad+"', '"+req.body.rspCiudad+"', '"+req.body.rspPais+"', '"+req.body.rspCarrera+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
       
            //console.log(result);
            client.end();
            return res.json(result.rows);
           
        });
       
    });
});
 
