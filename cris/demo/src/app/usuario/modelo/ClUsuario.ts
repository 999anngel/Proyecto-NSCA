export class ClUsuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    metodoPago1: string | null;
    metodoPago2: string | null;
    metodoPago3: string | null;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.apellido = obj && obj.apellido || null;
      this.correo = obj && obj.correo || null;
      this.contrasena = obj && obj.contrasena || null;
      this.metodoPago1 = obj && obj.metodoPago1 || null;
      this.metodoPago2 = obj && obj.metodoPago2 || null;
      this.metodoPago3 = obj && obj.metodoPago3 || null;
    }
  }
  