




export class ClFavorito {
    id: number;                   // Identificador único del favorito
    id_producto: number;          // Identificador único del producto
    nombre_producto: string;
    imagen_producto: string;

    constructor(obj: any) {
        this.id = obj && obj.id || null;                             // Inicializa el id
        this.id_producto = obj && obj.id_producto || null;         // Inicializa id_producto
        this.nombre_producto = obj && obj.nombre_producto || null; // Inicializa nombre_producto
        this.imagen_producto = obj && obj.imagen_producto || null; // Inicializa imagen_producto

    }
}
