export class ClSesion {
    id: number;          // Identificador único para la sesión
    idUsuario: number;  // ID del usuario que ha iniciado sesión
    rol: string;        // Rol del usuario (por ejemplo: 'admin', 'usuario', etc.)

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.idUsuario = obj && obj.idUsuario || null;
        this.rol = obj && obj.rol || null;
    }
}
