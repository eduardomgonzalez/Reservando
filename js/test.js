var expect = chai.expect;

describe("Testeo de la función 'reservarHorario' de la clase 'Restaurant'", function() {

    it("Dado un restaurante con el horario 13:00, al reservar dicho horario, éste se elimina de la lista de horarios (se elimina del arreglo)", function() {
        let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        restaurant.reservarHorario("13:00");
        expect(restaurant.horarios).to.be.an('array').that.does.not.include("13:00");
    });

    it("Dado un restaurante con el horario 17:00 (el cual es inexistente), el tratar de reservarlo, la lista de horarios se mantiene igual (el arreglo no se modifica)", function() {
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
        let cantidadHorasActual = restaurant.horarios.length;
        restaurant.reservarHorario("17:00");
        expect(cantidadHorasActual).to.equal(restaurant.horarios.length);
    });

    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual. La lista de horarios no se modifica", function() {
        let restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]);
        let cantidadHorasActual = restaurant.horarios.length;
        restaurant.reservarHorario();
        expect(cantidadHorasActual).to.equal(restaurant.horarios.length);
    });
    
});

describe("Testeo de la función 'obtenerPuntuacion' de la clase 'Restaurant'. Obtener la puntuacion de un restaurante", function() {

    it("Dado un restaurante con calificaciones de: 7, 7, 3, 9, 7. Su puntuacion (el promedio) es de 6.6", function(){
        let restaurant = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
        expect(restaurant.obtenerPuntuacion()).to.equal(6.6);
    });

    it("Dado un restaurante que no posee calificaciones (arreglo de calificaciones vacio). Su puntuación es '0'", function() {
        let restaurant = new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", []);
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    });
});

describe("Testeo de la función 'calificar' de la clase 'Restaurant. Se califica a un restaurante", function() {

    it("Dada una calificación de 2 a un restaurante, se valida correctamente que el valor es un entero. El arreglo calificaciones aumenta en 1 su tamaño)", function() {
        let restaurant = new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]);
        let cantidadCalificacionesActual = restaurant.calificaciones.length;
        restaurant.calificar(2);
        expect(restaurant.calificaciones.length).to.equal(cantidadCalificacionesActual+1);
    });

    it("Dada una calificación de 0 y de -1 a un restaurante, dichas calificaciones no se agregan al arreglo de calificaciones, ya que no se permiten calificaciones menor o igual a 0", function() {
        let restaurant = new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]);
        let cantidadCalificacionesActual = restaurant.calificaciones.length;
        restaurant.calificar(0);
        restaurant.calificar(-1);
        expect(restaurant.calificaciones.length).to.equal(cantidadCalificacionesActual); // El array deberia ser igual
    });

    it(" Si se quiere calificar un restaurante y a la función no se le pasa nada como parámetro, el array de calificaciones permanece igual", function() {
        let restaurant = new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]);
        let cantidadCalificacionesActual = restaurant.calificaciones.length;
        restaurant.calificar();
        expect(restaurant.calificaciones.length).to.equal(cantidadCalificacionesActual); // El array deberia ser igual
    });
});

describe("Testeo de la función 'buscarRestaurante' de la clase 'Listado'", function() {

    it("Dado un listado de restaurantes, al buscar el restaurante con el id 1, se obtiene correctamente el restaurante", function() {
        let arrayRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listadoTest = new Listado(arrayRestaurantes);

        let restaurant = listadoTest.buscarRestaurante(1);
        expect(restaurant.id).to.equal(1);
    });

    it("Dado un listado de restaurantes, al buscar el restaurante con el id 40, se informa un mensaje que el restaurante no se encuentra. No se obtiene el restaurante", function() {
        let arrayRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listadoTest = new Listado(arrayRestaurantes);
        
        let restaurant = listadoTest.buscarRestaurante(40);
        expect(restaurant.id).to.equal(undefined);
    });
});

describe("Testeo de la función 'obtenerRestaurante' de la clase 'Listado'. Filtrar el listado de restaurantes", function() {

    it("Dado un listado con 3 restaurantes, si no se aplica ningún filtro, se obtiene como resutado 3 restaurantes", function() {
        let arrayRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listadoTest = new Listado(arrayRestaurantes);

        var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null, null, null)
        expect(restaurantesFiltrados.length).to.equal(3);
      });

    it("Dado un listado con 3 restaurantes, si filtro por el rubro 'Pizza', se obtiene como resultado 2 restaurantes", function() {
        let arrayRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Pizza", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Pizza", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ];
        let listadoTest = new Listado(arrayRestaurantes);

        var restaurantesFiltrados = listadoTest.obtenerRestaurantes("Pizza", null, null)
        expect(restaurantesFiltrados.length).to.equal(2);
    });

});

describe("Testeo de la funcion 'precioBase' de la clase 'Reserva'", function() {
    it("Dada una reserva con 8 personas y el precio por persona de 350, su precio base es de 2800", function() {
        let reserva = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva.precioBase()).to.equal(2800);
    });
});

describe("Testeo de la funcion 'precioTotal' de la clase 'Reserva'", function() {
    it("Dada una reserva de 8 personas, con un precio por persona de 350 y de un codigo de descuento de 'DES1', el precio final es de 2310", function() {
        let reserva = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva.precioTotal()).to.equal(2310);
    });
});