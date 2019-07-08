import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl,Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new UserModel;
  // forma:FormGroup;

  constructor(private usersService:UsersService,private route:ActivatedRoute) {
    // this.forma = new FormGroup({
    //   'id'        :new FormControl(),
    //   'nombre'    :new FormControl('',Validators.required),
    //   'apellido'  :new FormControl('',Validators.required),
    //   'cedula'    :new FormControl('',[Validators.required,Validators.pattern("[0-9]")]),
    //   'correo'    :new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    //   'telefono'  :new FormControl('',[Validators.required,Validators.pattern("[0-9]")]),
    //   'estado'    :new FormControl()
    // })
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.usersService.getUser(id)
          .subscribe((resp:UserModel) => {
              this.user    = resp;
              this.user.id = id;
          });
    }
  }

  guardar(form:NgForm){

    if (form.invalid){
          console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title:'Espere',
      text: 'Guardando informacion',
      type:'info',
      allowOutsideClick : false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.user.id ){
      peticion = this.usersService.actualizarUser(this.user);
    }else{
     peticion = this.usersService.crearUser(this.user);
    }

    peticion.subscribe(resp =>{

      Swal.fire({
        title:this.user.nombre,
        text:'Se actualizo correctamente',
        type:'success'
      });

      form.reset();


    });


  }
}
