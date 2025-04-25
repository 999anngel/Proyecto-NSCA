export class ClAyudas {
  id: string; // Cambiado a string
  pregunta: string;
  respuesta: string;

  constructor(id: string, pregunta: string, respuesta: string) {
    this.id = id;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }
}
