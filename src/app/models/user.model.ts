export class UserModel{


 id:string;
 nombre:string;
 apellido:string;
 cedula: number;
 correo:string;
 telefono:number;
 estado:boolean

   constructor(){
     this.estado = true;
   }

}
