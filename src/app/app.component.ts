import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService} from './api.service';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
//   template: `
//   <ngx-json-viewer [json]="this.items"></ngx-json-viewer>
//     `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public items: any[];
  model:any={};
  public errorMessage: any;
  downloadJsonHref:any;
  APIEndpoint:any;
    constructor(private APIService: APIService, private http: HttpClient) {
        // this.generateDownloadJsonUri()
        this.APIEndpoint = 'http://localhost:8081/api/exportCollections/'
    }

    generateDownloadJsonUri() {
        console.log(this.model)
        let collectionName = this.model.collectionName;
        let documentId = this.model.documentId;
        let url = this.APIEndpoint + collectionName + '/' + documentId;
        this.http.get(url, {responseType: 'blob'}).subscribe((res) => {
                //console.log(res)
                saveAs(res, collectionName + "_" + documentId+".json")
            })
    }

    searchDocument(){
        console.log(this.model);
        let collectionName = this.model.collectionName;
        let documentId = this.model.documentId;
        this.APIService.getRouteData(this.APIEndpoint + collectionName + '/' + documentId).subscribe(
            response => {
                console.log(response)
                this.items = response;
                this.errorMessage  = '';
            },
            error => {
              console.log(error.error.message)
              if (error.status === 500) {
                this.errorMessage = error.error.message;
                this.items = [];
              }
            }
          );

    }
}
