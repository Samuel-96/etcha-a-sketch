//declaraciones de variables
let color; let colorAleatorio; let lineasGridActivadas = true;

const contenedorBoceto = document.querySelector(".container-boceto");
const btnColor = document.querySelector("#btnColor");
const colorPicker = document.querySelector("#colorPicker");
const slider = document.querySelector("#slider");
const btnRandomColor = document.querySelector("#btnRandomColor");
const btnEliminarColores = document.querySelector("#btnEliminarColores");
const btnLineasGrid = document.querySelector("#btnLineasGrid");

contenedorBoceto.style.display = "grid";
contenedorBoceto.style.gridTemplateColumns = "repeat(6, 1fr)";
contenedorBoceto.style.gridTemplateRows = "repeat(6, 1fr)";

//event listener
btnLineasGrid.addEventListener("click", function() {
    const cuadriculas = Array.from(contenedorBoceto.children);
  
    // Verifica el estado actual de las líneas del grid
    if (lineasGridActivadas) {

      cuadriculas.forEach(cuadricula => {
        cuadricula.style.border = "none";
      });
      btnLineasGrid.textContent = "Activar líneas del grid";
    } else {

      cuadriculas.forEach(cuadricula => {
        cuadricula.style.border = "solid";
        cuadricula.style.borderWidth = "0.1px";
      });
      btnLineasGrid.textContent = "Desactivar líneas del grid";
    }
    
    // Invierte el estado de las líneas del grid
    lineasGridActivadas = !lineasGridActivadas;
});

btnEliminarColores.addEventListener("click", function() {
    const cuadriculas = Array.from(contenedorBoceto.children);
    cuadriculas.forEach(cuadricula => {
      cuadricula.style.backgroundColor = "white";
    });
  });

btnColor.addEventListener("click", function() {
    colorPicker.click();
  });
  
colorPicker.addEventListener("input", function() {

    color = colorPicker.value;
    
    
    console.log("Color seleccionado:", color);
  });

btnRandomColor.addEventListener("click", function() {
    if (!btnRandomColor.checked) {
        // El checkbox está desmarcado
        colorAleatorio = false;
      } else {
        // El checkbox está marcado
        colorAleatorio = true;
      }
});

cargarGrid(36);

//funciones

function rangeSlider(){
    let valorSlider =  document.getElementById("slider").value;
    console.log(valorSlider*valorSlider);
    contenedorBoceto.style.gridTemplateColumns = "repeat("+ valorSlider + ", 1fr)";
    contenedorBoceto.style.gridTemplateRows = "repeat("+ valorSlider + ", 1fr)";
    borrarGrid(); //importante esto, ya que así evito un bug que deformaba el grid
    cargarGrid(valorSlider*valorSlider);

    //muestro la informacion de los valores del slider
    const valorMinimo = document.querySelector(".valorMinimo");
    valorMinimo.textContent = valorSlider + " filas";
    valorMinimo.style.color = "white";

    const valorMaximo = document.querySelector(".valorMaximo");
    valorMaximo.textContent = valorSlider + " columnas";
    valorMaximo.style.color = "white";
}

function borrarGrid() {
    while(contenedorBoceto.firstChild){
        contenedorBoceto.removeChild(contenedorBoceto.lastChild);
    }
  }
  


function cargarGrid(numCuadriculas){

    for(let i = 0; i < numCuadriculas; i++){
        const cuadricula = document.createElement("div");

        cuadricula.textContent = "";
        cuadricula.style.width = "auto";
        cuadricula.style.height = "auto";
        cuadricula.style.border = "solid";
        cuadricula.style.borderWidth = "0.1px";
        cuadricula.style.backgroundColor = "white";
        cuadricula.addEventListener("mouseover",hover);
        
        contenedorBoceto.appendChild(cuadricula);
    }
}

function hover(event) {
    const cuadricula = event.target;

    if(cuadricula.style.backgroundColor === "white"){
        cuadricula.style.backgroundColor = "green";
    }
    if(colorAleatorio){
        color = color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    cuadricula.style.backgroundColor = color;
  }