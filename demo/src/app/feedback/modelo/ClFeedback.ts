export class ClFeedback {
    id: number; // Identificador único para el feedback
    nombreCompleto: string; // Nombre completo del cliente que deja el feedback
    calificacion: number; // Calificación del 1 al 5
    comentario: string; // Comentario del cliente
    fecha: Date; // Fecha en la que se dejó el feedback
  
    constructor(
      id: number,
      nombreCompleto: string,
      calificacion: number,
      comentario: string,
      fecha: Date
    ) {
      this.id = id;
      this.nombreCompleto = nombreCompleto;
      this.calificacion = calificacion;
      this.comentario = comentario;
      this.fecha = fecha;
    }
  }