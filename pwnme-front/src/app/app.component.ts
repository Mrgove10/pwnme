import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public files : any = [];
  public url : string = "http://localhost:3000";
  public image : any;

  constructor(private http: HttpClient) {
      
   }

  sortBy(prop: string) {
    return this.files.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  onSubmit(pseudo, commentaire, fichier) {

    if(pseudo == null || pseudo == ""){
      // stop
      alert("votre pseudo n'est pas valide")
    }
    else if (commentaire == null || commentaire == "") {
      // stop
      alert("votre commentaire n'est pas valide")
    }else{
    
      var arrayFichier = fichier.split("\\");
      var fileName = arrayFichier[arrayFichier.length-1];
  
      var extensionArray = fileName.split(".");
      var extension = extensionArray[extensionArray.length-1];
      console.log(extension)
      if(extension != "jpg" && extension != "jpeg" && extension != "png" && extension != "pdf" && extension != "gif"){
        alert("extension pas bonne");
      }else{
        
        let data = {
          "Pseudo": pseudo,
          "Text": commentaire,
          "Filename": fileName,
          "File" : this.image
        };
    
        var headers = new HttpHeaders({
          'Content-Type': 'application/json'
        })
    
        var requestBody = JSON.stringify(data);
    
        console.log(data);
    
        this.http.post(this.url + "/files", requestBody, {headers}).subscribe(Response => {
          console.log(Response);
          location.reload();
        });
    }
  }

    
  }

  ngOnInit(){
    this.getFiles();
  }

  getFiles(){
    this.http.get<any>(this.url+"/files").subscribe(Response => {
      this.files = Response;
      this.files.forEach(element => {
        element.Filename = this.url+"/static/"+element.Filename;
      });
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}

