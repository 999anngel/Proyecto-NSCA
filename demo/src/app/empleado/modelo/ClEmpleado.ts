export class ClEmpleado {
    id: number;
    nombre: string;
    cargo: string;
    salario: number;
    departamento: string;
    genero: string;
    fechaIngreso: Date;
    email: string;
    telefono: string;
    imgPerfil: string;
    password: string; // Nueva propiedad para la contraseña

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.cargo = obj && obj.cargo || null;
        this.salario = obj && obj.salario || null;
        this.departamento = obj && obj.departamento || null;
        this.genero = obj && obj.genero || null;
        this.fechaIngreso = obj && obj.fechaIngreso || null;
        this.email = obj && obj.email || null;
        this.telefono = obj && obj.telefono || null;
        this.imgPerfil = obj && obj.imgPerfil || null;
        this.password = obj && obj.password || null; // Inicialización de la contraseña
    }
}
