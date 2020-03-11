import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {
    var pseudo = form.value.pseudo;
    var commentaire = form.value.commentaire;
    var fichier = form.value.fichier;


    // envoyer en bdd
    //  localhost:3000/files
    // localhost:3000/static
  }

  ngOnInit(){
    this.getFiles();
  }

  getFiles(){
    this.http.get<any>("localhost:3000/files").subscribe(Response => {
      // this.users = Response; //assigns the response
      // this.users = this.shuffle(this.users);
      // this.users.forEach(u => {
      //   u.distance = 0;
      //   u.profilepicture = ApiAdress + "/images/user/low/" + u.idsmall + ".png";
      // });
    });
  }

}

