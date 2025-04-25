export class ClCarrito {
    id: number; // Identificador del carrito
    idUsuario: number; // Identificador del usuario al que pertenece el carrito
    idProducto: number; // Identificador del producto en el carrito
    nombre: string; // Nombre del producto
    precio: number; // Precio del producto
    cantidad: number; // Precio del producto
    img: string; // Imagen del producto
    subtotal: number; // Subtotal del producto en el carrito
    fechaCreacion: Date; // Fecha de creación del carrito

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.idUsuario = obj && obj.idUsuario || null;
        this.idProducto = obj && obj.productoId || null;
        this.nombre = obj && obj.nombre || null;
        this.precio = obj && obj.precio || null;
        this.cantidad = obj && obj.precio || null;
        this.img = obj && obj.img || null;
        this.subtotal = obj && obj.subtotal || null; // Se puede ajustar si hay lógica para calcular el subtotal
        this.fechaCreacion = obj && obj.fechaCreacion || new Date();
    }
}
