var animalA = ["Deer", "Camel","Fish","Horse","Albatross","Bear","Flamingo","Goose","Lemur","Mosquito"] //array de animales inicales

renderButtons()     // CALL PARA HACER BOTONES INCIALES


newButton()         // CALL PARA HACER BOTONES INCIALES
buttonClick ();     // CALL PARA CLICK SOBRE BOTONES GENERADORES DE GIFS




function renderButtons() {                              // FUNCION DE BOTONES INCIALES            
  $("#buttonIns").empty();                              // borrar botones
  for (var i = 0; i < animalA.length; i++) {            // for para correr todo el array
        var a = $("<button>");                          //generar botones
        a.addClass("btn btn-info");                     // asignarle class al botton para imagen
        a.attr("animaln", animalA[i]);                  // valor del botton para poder utilizar el nombre
        a.text(animalA[i]);                             // el nombre que se vera del boton
        $("#buttonIns").append(a);                      //  ingresar los botones al haml
    }                   
};                                                      // FUNCION DE BOTONES INCIALES

function newButton() {                                  // FUNCION QUE GENERA BOTONES
    $("#submit").on("click", function(event) {          //listener cuando se apriete el boton de nuevo boton
    event.preventDefault();
    var animals = $("#submit01").val().trim();          //toma el valor que se registro
    animalA.push(animals);                              // mete el valor al array
    console.log(animalA);
    renderButtons();                                    // vulve a call el generador de botones
    buttonClick ();
});                                                     // cierre de listener de nuevos elementos del array
}                                                       // FUNCION GENERA NUEVOS BOTONESS 
    



function buttonClick () {                               // FUNCION QUE BUSCA GIFTS
$("button").on("click", function() {                    //listener cuando se apriete el boton
    console.log(this);
    var animal = $(this).attr("animaln");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"; // 10 items

    $.ajax({
    url: queryURL,
     method: "GET"
    })
    .then(function(response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
            
                var gifDiv = $("<div>");                                         // crea un div
                gifDiv.attr("class", "allImage");

                var rating = results[i].rating;                                 // variable para rating
                var p = $("<p>").text("Rating: " + rating.toUpperCase());       // crea un tag parrafo para el ratin
                p.attr("id", "gif");
                var personImage = $("<img" + " " + "data-state=" + "'still'" + " " + "class=" + "'gif'" + ">");                                           // crea un tag imagen
                personImage.attr("src",             results[i].images.original_still.url);          // valor defaul still 
                personImage.attr("data-still",      results[i].images.original_still.url);          // muestra el archivo still
                personImage.attr("data-animate",    results[i].images.original.url);                // muestra el archivo movimiento
               
                gifDiv.append(p);          // mete al div creado el parrafo
                gifDiv.append(personImage);         // mete la imagen al div creado
                $("#images").prepend(gifDiv);       // mete al html las paginas
                
        }     giftsChange();       // CALL PARA CAMBIAR EL ESTADO DEL GIF DE ANIMATE A STILL
    }) 
}) 
};                      // TERMINA FUNCION QUE BUSCA GIFTS




function giftsChange(){                                      // FUNCION QUE CAMBIA EL ESTADO DEL GIF
    $(".gif").on("click", function() {
            var state = $(this).attr("data-state");         // al click sobre una imagen trae el estado en el que se encuentra la imagen
            console.log(state);

            if (state === "still") {                        // si es igual a still
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
    });
};


