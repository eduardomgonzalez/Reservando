var Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento
}

Reserva.prototype.precioBase = function() {
    return this.cantidadPersonas * this.precioPersona;
}

Reserva.prototype.precioTotal = function() {
    let precioBase = this.precioBase();
    let adicionales = this.adicionales(precioBase);
    let descuentos = this.descuentos(precioBase);

    return precioBase + adicionales - descuentos;
}

// Adicionales con respecto al precio base
Reserva.prototype.adicionales = function(base){
    return this.adicionalesPorHorario(base) + this.adicionalesPorFinDeSemana(base);
}

Reserva.prototype.adicionalesPorHorario = function(base) {
    var hora = this.horario.getHours() ;

    if( (hora >= 13 && hora < 14) || (hora >=20 && hora < 21) )
    {
        return base * 5 / 100;
    }else {
        return 0;
    }
}

Reserva.prototype.adicionalesPorFinDeSemana = function(base) {
    var dia = this.horario.getUTCDay();

    if(dia === 0 || dia === 5 || dia === 6)
    {
        return base * 10 / 100;
    }else {
        return 0;
    }
}
// Fin adicionales

// Descuentos con respecto al precio base
Reserva.prototype.descuentos = function(base) {
    return this.descuentosPorGrupo(base) + this.descuentosPorCodigo(base);
}

Reserva.prototype.descuentosPorGrupo = function(base) {
    if(this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6)
    {
        return base * 5 / 100;
    }else if(this.cantidadPersonas >= 7 && this.cantidadPersonas < 8){
        return base * 10 / 100;
    }else if(this.cantidadPersonas >= 8){
        return base * 15 / 100;
    }else {
        return 0;
    }
}

Reserva.prototype.descuentosPorCodigo = function(base) {
    if(this.codigoDescuento === "DES15")
    {
        return base * 15 / 100;
    }else if(this.codigoDescuento === "DES200"){
        return 200;
    }else if(this.codigoDescuento === "DES1"){
        return this.precioPersona;
    }
}
// Fin descuentos