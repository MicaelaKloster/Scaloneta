window.addEventListener("load", function () {
  buscarInfo();
});
  
  document.getElementById('nuevo').addEventListener('click', crearNuevo);

  document.getElementById('guardar').addEventListener('click', guardar);

  
  // busca la info del localstorage 
  // sino encuentra la busca desde un archivo y setea el localstorage
  function buscarInfo(){
    const jugadores = JSON.parse(localStorage.getItem('jugadores'));
    // sino encuentro nada en el localstorage
    // busco desde el archivo

    if(jugadores == null){
      fetch('./Datos/jugadores.json')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // seteo el localstorage
        localStorage.setItem('jugadores', JSON.stringify(data));
        // cargo los datos desde el archivo
        cargaDatos(data);  
      })
    }
    else{
      // cargo los datos desde el localStorage
      cargaDatos(jugadores);
    }
  }

  function cargaDatos(data){
    const cardRow = document.getElementById('cardRow');
    // data.reverse().forEach(element => {
    data.forEach(element => {
      const cardColumn = document.createElement('div');
      cardColumn.classList.add('col-md-2');

      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('miCardJugadores');
      card.classList.add('m-1'); 

      const header = document.createElement('div');
      header.classList.add('card-header');
      header.classList.add('card-headerJugadores');
      
      const img = document.createElement('img');
      img.setAttribute('src', 'img/' + element.imagen);
      img.classList.add('card-img-top');
      img.classList.add('miImagenJugadores');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.appendChild(document.createTextNode(element.apellido
       + ' ' + element.nombre));

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      const parrafo = `Pie Hábil: ${element.pieHabil} (${element.apodo})`;
      cardText.appendChild(document.createTextNode(parrafo));

      const i = document.createElement('i');
      i.setAttribute('class','ri-edit-line');

      i.classList.add('m-1');
      i.setAttribute('id', element.id);
      i.setAttribute('onclick', 'editarJugador(this)');

      
      const ic = document.createElement('i');
      ic.setAttribute('class','ri-delete-bin-6-line');
      ic.classList.add('m-1');
      ic.setAttribute('id', element.id);
      ic.setAttribute('onclick', 'eliminar(this)');

      const footer = document.createElement('footer');
      footer.classList.add('card-footer');
      footer.appendChild(i);
      footer.appendChild(ic);

      header.appendChild(cardTitle);
      cardBody.appendChild(img);
      cardBody.appendChild(cardText);
      card.appendChild(header);
      card.appendChild(cardBody);
      card.appendChild(footer);
      cardColumn.appendChild(card);
      cardRow.appendChild(cardColumn);
    });
  }

  function editarJugador(param){
    let idEditar = parseInt(param.getAttribute("id"));
    localStorage.setItem('editame',JSON.stringify(idEditar));
    window.location.href = './editarJugador/editarJugador.html'    
  }

  function eliminar(param){
    // console.log(param)
    let idEliminar = parseInt(param.getAttribute("id"));

    const jugadores = JSON.parse(localStorage.getItem('jugadores'));
    const nuevo = jugadores.filter(function(item){
      return item.id !== idEliminar;
    });
    localStorage.setItem('jugadores',JSON.stringify(nuevo));

    this.borrarCards();
    cargaDatos(nuevo);
  }

  // funcion para los cards
  function borrarCards(){
    const elemento = document.getElementById('cardRow');
    while (elemento.firstChild) {
      elemento.firstChild.remove();
    }
  }


  function crearNuevo(){
    const staticBackdropLabel = document.getElementById('staticBackdropLabel');
    staticBackdropLabel.textContent='Nuevo Jugador';

    const forms = document.querySelectorAll('.needs-validation')
    
    // quito la clase de validacion
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated');
    });

    borrarFormulario();
    const img = document.getElementById('imagen').setAttribute('src','./img/notFound.png');
  }



  function guardar(){
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      event.preventDefault();
      
      if (form.checkValidity()) {
        // Si el formulario es válido
        const jugadores = JSON.parse(localStorage.getItem('jugadores'));
        
        // obtengo el id maximo
        maxId = jugadores.reduce(
          (max, obj) => obj.id > max ? obj.id : max, -Infinity);
        let i = 0;

        if (maxId !== -Infinity){
          i = maxId + 1;
        }

        const img = document.getElementById('imagen').getAttribute('src');
        const indice = img.lastIndexOf('/');
        let nombreImagen;
        if (indice !== -1) {
          nombreImagen = img.substring(indice + 1);
        }

        const aux = {
          'id' : i,
          'dni' : document.getElementById('dni').value,
          'apellido' : document.getElementById('apellido').value,
          'nombre' : document.getElementById('nombre').value,
          'apodo' : document.getElementById('apodo').value,
          'pieHabil' : document.getElementById('pieHabil').value,
          'imagen': nombreImagen
        }

        jugadores.push(aux);
        localStorage.setItem('jugadores', JSON.stringify(jugadores));

        borrarCards();
        cargaDatos(jugadores);
        const cancelarModal = document.getElementById('cancelarModal');
        cancelarModal.click();

      } else {
        // Si el formulario no es válido, muestra un mensaje de error
        form.classList.add('was-validated')
      }
    })
  }

  function borrarFormulario(){
    document.getElementById('dni').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apodo').value = '';
    document.getElementById('pieHabil').value = '';
    const imagen = document.getElementById('imagen');
    imagen.setAttribute('src', 'img/jugadores/notFound.png');   
  }

