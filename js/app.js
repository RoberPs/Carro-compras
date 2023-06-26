//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
      //1 Cuando agregas un curso presionando 'Agregar al Carrito'
      listaCursos.addEventListener('click', agregarCurso);
     //Elimina cursos del carrito 
      carrito.addEventListener('click', eliminarCurso);

      //Muestra los cursos de localStorage

   document.addEventListener('DOMContentLoaded',()=>{
       
      articulosCarrito=JSON.parse(localStorage.getItem('carro'))||[];
      carritoHTML();
   })
       
     //Vaciar carrito 
      vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML();//Eliminamos todo el html
     })
}

// Funciones  // 2 se ejecuta la funcion agregar curso
function agregarCurso(e){
    e.preventDefault();

    //3 nos aseguramos de que el usuario a presionado el boton de agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){

      //4 accedemos  al div que tiene el contenido del curso
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);

    carritoHTML();
    
    }; 
};
//Elimina curso del carrito

function eliminarCurso(e){
   /* console.log(e.target.classList); */
   if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
        
        carritoHTML();  //iterar sobre carrito y mostrar en html

   } 

}

// 5 leemos los datos del curso  
//Lee el contenido del HTML al que le dimos click y extrae su información
function leerDatosCurso(curso){


// 6 Crear un objeto con el contenido del curso actual
   const infoCurso = {
     imagen : curso.querySelector('img').src,
     titulo : curso.querySelector('h4').textContent,
     precio : curso.querySelector('.precio span').textContent,
     id: curso.querySelector('a').getAttribute('data-id'),
     cantidad : 1
   }
   
   // Revisa si un elemento ya existe en el carrito

   const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
       //Actualizamos la cantidad
       const cursos = articulosCarrito.map( curso => {
          if (curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actualizado
          }else{
            return curso;//retorna el no duplicado
          }
              
       })
       articulosCarrito = [...cursos]
    }else {
        // 7 Agrega elementos al arreglo del carrito
         articulosCarrito = [...articulosCarrito, infoCurso];
    }

   carritoHTML();

}

 // 8 imprimimos el html
//Muestra el carrito de compras en el HTML
function carritoHTML(){
    
       //Limpiar el HTML
       limpiarHTML()
         //Recorre el carrito y genera el html
        articulosCarrito.forEach(curso => {
           //destructuring te crea las variable y las puedes omitir en el td
          const {imagen, titulo, precio, cantidad, id} = curso;

          const row = document.createElement('tr');
          row.innerHTML =`
              <td>
                  <img src ='${curso.imagen}' width = '100'>     
              </td>
              <td> ${titulo}</td>
              <td> ${precio}</td>
              <td> ${cantidad}</td>
              <td>
                 <a href ='#'  class ='borrar-curso' data-id='${id}'> x </a>
              </td>
           `;

           //Agrega el html del carrito en el tbody
           contenedorCarrito.appendChild(row);
            
    })

    //Agregar el carrito de compras al storage
    sincronizarStorage();
   
}

//Almacenar el localStorage

function sincronizarStorage(){

    localStorage.setItem('carro',JSON.stringify(articulosCarrito))

}

// 9 Elimina los cursos del tbody
function limpiarHTML(){
   //forma lenta
   /* contenedorCarrito.innerHTML = ''; */


   while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild)
       
   }

   

}