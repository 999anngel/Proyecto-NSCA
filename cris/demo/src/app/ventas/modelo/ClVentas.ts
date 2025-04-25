export class ClVenta {
    id?: number; // Hacer opcional ya que puede no ser asignado en la creación
    idUsuario: number;
    productos: { id: number; nombre: string; cantidad: number; precio: number }[]; // Arreglo para productos
    total: number;
    metodoPago: string; // Agregar el método de pago
    fecha: Date | null;

    constructor(obj: any) {
        this.id = obj && obj.id || null; // Opcional
        this.idUsuario = obj && obj.idUsuario || null;
        this.productos = obj && obj.productos || []; // Inicializa como arreglo
        this.total = obj && obj.total || 0; // Inicializa en 0
        this.metodoPago = obj && obj.metodoPago || null; // Método de pago
        this.fecha = obj && obj.fecha ? new Date(obj.fecha) : null; // Fecha de la venta
    }
}
