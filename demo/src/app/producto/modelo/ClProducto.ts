// export class ClProducto {
//   id: number;
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   cantidad: number;
//   fecha: Date;
//     constructor(values: Object= {}){
//         Object.assign(this, values);
//     }
// }
export class ClProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number | null;
    stock: number | null;
    categoria: string;
    genero: string;
    color: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    ventas: number;


    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.descripcion = obj && obj.descripcion || null;
        this.precio = obj && obj.precio || null;
        this.stock = obj && obj.stock || null;
        this.categoria = obj && obj.categoria || null;
        this.genero = obj && obj.genero || null;
        this.color = obj && obj.color || null;
        this.img1 = obj && obj.img1 || null;
        this.img2 = obj && obj.img2 || null;
        this.img3 = obj && obj.img3 || null;
        this.img4 = obj && obj.img4 || null;
        this.ventas = obj && obj.ventas || null;

    }
}
