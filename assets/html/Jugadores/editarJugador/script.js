window.addEventListener("load", function () {
    leerDatos();
  });

  const guardar = document.getElementById('guardar');
  guardar.addEventListener('click', guardarJugador);

  const cancelar = document.getElementById('cancelar');
  cancelar.addEventListener('click', cancelarEdicion);

  function cancelarEdicion(){
    window.location.href = '../index.html';
  }

  function guardarJugador(){
    const jugador = JSON.parse(localStorage.getItem('jugadores'));
    
    const idEditar = parseInt(localStorage.getItem('editame'));

    // me quedo con los items menos el que quiero modificar
    const jugadorNuevo = jugador.filter( function(item){
      return item.id !== idEditar;
    });
    
    const aux = {
      'id' : idEditar,
      'dni' : document.getElementById('dni').value,
      'apellido' : document.getElementById('apellido').value,
      'nombre' : document.getElementById('nombre').value,
      'posicion' : document.getElementById('posicion').value,
      'apodo' : document.getElementById('apodo').value,
      'dorsal' : document.getElementById('dorsal').value,
      'pieHabil' : document.getElementById('pieHabil').value,
      'imagen' : document.getElementById('imagen').value
    }

    jugadorNuevo.push(aux);
    const aux2 = jugadorNuevo.sort( function(a,b){
      if(a.id < b.id){
        return -1
      }
      return 0;
    })

    localStorage.setItem('jugadores', JSON.stringify(aux2));
    window.location.href = '../index.html';
  }


  // guarda en el localStorage los datos predifinidos de jugadores
  function leerDatos(){
    const idEditar = parseInt(localStorage.getItem('editame'));

    const jugadores = JSON.parse(localStorage.getItem('jugadores'));

    const jugador = jugadores.find(item => item.id === idEditar );
    document.getElementById('dni').value = jugador.dni;
    document.getElementById('apellido').value = jugador.apellido;
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('posicion').value = jugador.posicion;
    document.getElementById('apodo').value = jugador.apodo;
    document.getElementById('dorsal').value = jugador.dorsal;
    document.getElementById('pieHabil').value = jugador.pieHabil;
    document.getElementById('imagen').value = jugador.imagen;
    document.getElementById('imagen').src = '../img/' + jugador.imagen;
    // document.getElementById('imagenContainer').style.backgroundImage = `url(jugadores/img/${jugador.imagen})`; 
  }
