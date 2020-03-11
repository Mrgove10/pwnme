import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public files : any = [];
  public url : string = "http://localhost:3000";

  constructor(private http: HttpClient) {
      
   }

  onSubmit(pseudo, commentaire, fichier) {
    console.log(pseudo);
    console.log(commentaire);
    console.log(fichier);

    let data = {
      "Pseudo": pseudo,
      "Text": commentaire,
      "Filename": fichier
    }

    this.http.post(this.url + "/files", JSON.stringify(data)).subscribe(Response => {
      console.log(Response);
      location.reload();
    });
    
    // envoyer en bdd
    //  localhost:3000/files
    // localhost:3000/static
  }

  ngOnInit(){
    this.getFiles();
  }

  dowload(fileName){
    console.log(fileName);
  }

  getFiles(){
    this.http.get<any>(this.url+"/files").subscribe(Response => {
      this.files = Response;
      console.log(this.files)
    });
  }

}

