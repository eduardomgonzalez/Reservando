var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
   this.horarios = this.horarios.filter(function(horario) {
    return horario !== horarioReservado; //Toma los horarios que no son iguales
   });
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return this.promedio(this.calificaciones);
    }
}

// Funciones agregadas
Restaurant.prototype.sumatoria = function(numeros){
    let suma = 0;

    numeros.forEach(element => {
        suma += element;
    });

    return suma;
}

Restaurant.prototype.promedio = function(numeros){
    return Math.round( (this.sumatoria(numeros) / numeros.length) * 10 ) / 10;
}