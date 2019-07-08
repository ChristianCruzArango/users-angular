import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'https://examen-41a3a.firebaseio.com'

  constructor(private http:HttpClient) { }

  crearUser(user:UserModel){

    return this.http.post(`${this.url}/users.json`,user)
            .pipe(
              map((resp:any) => {
                  user.id = resp.name;
                  return user;
              })
            );

  }

  actualizarUser(user:UserModel){

      const userTemp={
        /*operador exprest */
        ...user
      };

      delete userTemp.id;

      return this.http.put(`${this.url}/users/${user.id}.json`,userTemp);
  }

  getUsers(){

    return this.http.get(`${this.url}/users.json`)
      .pipe(
          map(this.crearArregloUsers )
      );
  }

  private crearArregloUsers (usersObjeto:object){

    if (usersObjeto === null){return [];}

    const users:UserModel[] = [];

    Object.keys(usersObjeto).forEach(key =>{
      const user:UserModel = usersObjeto[key];
      user.id = key;

      users.push(user);
    });

    return users;

  }

  getUser(id:string){
    return this.http.get(`${this.url}/users/${id}.json`);
  }

  borrarUser(id:string){
    return this.http.delete(`${this.url}/users/${id}.json`);
  }

}
