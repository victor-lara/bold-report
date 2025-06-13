import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
 public serviceUrl: string;
  public reportPath: string;
  public serverUrl: string;
  public processingMode: string;
  public authToken: string;

  constructor() {
    this.processingMode = 'Remote';
    this.reportPath = 'd55515ae-388d-4a7b-9dc9-80e97c221cfe';
    this.serviceUrl = "https://cloud.boldreports.com/reporting/reportservice/api/Viewer";
    this.authToken= "Bearer ...";
    this.serverUrl="https://cloud.boldreports.com/reporting/api/site/b341968";
  }
  
  onAjaxRequest(event: any) {
    event.headers.push({ Key: 'Authorization', Value: this.authToken });
  }
}
