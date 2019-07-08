import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:UserModel[]=[];
  cargando = false;

  constructor(private usersService:UsersService) { }

  ngOnInit() {

    this.cargando=true;
    this.usersService.getUsers()
          .subscribe(resp => {
            this.users = resp;
            this.cargando=false;
          });
  }

  borrarUser(user:UserModel,i:number){

    Swal.fire({
      title:'Esta Seguro?',
      text:`Esta seguro de eliminar el Usuario ${user.nombre}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.users.splice(i,1);
        this.usersService.borrarUser(user.id)
            .subscribe();
      }
    });


  }

}
