export class ClPago {
    id: number;
    numeroTarjeta: string;
    fechaVencimiento: string;
    cvv: string;
    nombreTitular: string;
    numeroDocumento: string;  // En formato RUT (ej. 12.345.678-9)
    email: string;

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.numeroTarjeta = obj && obj.numeroTarjeta || null;
        this.fechaVencimiento = obj && obj.fechaVencimiento || null;
        this.cvv = obj && obj.cvv || null;
        this.nombreTitular = obj && obj.nombreTitular || null;
        this.numeroDocumento = obj && obj.numeroDocumento || null;
        this.email = obj && obj.email || null;
    }
}