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
  public authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhcmEuaEBvdXRsb29rLmNvbSIsIm5hbWVpZCI6IjE4NDciLCJ1bmlxdWVfbmFtZSI6IjM4NzYyOTExLWJlOGUtNDljNC1hM2UxLTQ1NDRmYmQwMzhhMyIsIklQIjoiMTAuMjQ0LjEuODYiLCJpc3N1ZWRfZGF0ZSI6IjE3NDgzNzIyNDIiLCJuYmYiOjE3NDgzNzIyNDIsImV4cCI6MTc1MjI3ODQwMCwiaWF0IjoxNzQ4MzcyMjQyLCJpc3MiOiJodHRwczovL2Nsb3VkLmJvbGRyZXBvcnRzLmNvbS9yZXBvcnRpbmcvc2l0ZS9iMzQxOTY4IiwiYXVkIjoiaHR0cHM6Ly9jbG91ZC5ib2xkcmVwb3J0cy5jb20vcmVwb3J0aW5nL3NpdGUvYjM0MTk2OCJ9.SmM9oJcqbPdt91Heqg4B8UvbgdGlzmBMsr1wzcRlmWg'

  constructor() {
    //  this.serviceUrl = 'https://demo.boldreports.com/services/api/ReportViewer';
    // this.serverUrl = 'https://demo.boldreports.com/services/api/site/site1';
    // this.reportPath = '/Sample Reports/Sales Order Detail'; // Replace with your report path
    // this.processingMode = 'Remote'; // Use 'Remote' for cloud server
    
    this.serviceUrl = 'https://cloud.boldreports.com/reporting/site/b341968/api/Viewer';
    this.serverUrl = 'https://cloud.boldreports.com/reporting/api/site/b341968';
    //this.serverServiceAuthorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhcmEuaEBvdXRsb29rLmNvbSIsIm5hbWVpZCI6IjE4NDciLCJ1bmlxdWVfbmFtZSI6IjM4NzYyOTExLWJlOGUtNDljNC1hM2UxLTQ1NDRmYmQwMzhhMyIsIklQIjoiMTAuMjQ0LjEuODYiLCJpc3N1ZWRfZGF0ZSI6IjE3NDgzNzIyNDIiLCJuYmYiOjE3NDgzNzIyNDIsImV4cCI6MTc1MjI3ODQwMCwiaWF0IjoxNzQ4MzcyMjQyLCJpc3MiOiJodHRwczovL2Nsb3VkLmJvbGRyZXBvcnRzLmNvbS9yZXBvcnRpbmcvc2l0ZS9iMzQxOTY4IiwiYXVkIjoiaHR0cHM6Ly9jbG91ZC5ib2xkcmVwb3J0cy5jb20vcmVwb3J0aW5nL3NpdGUvYjM0MTk2OCJ9.SmM9oJcqbPdt91Heqg4B8UvbgdGlzmBMsr1wzcRlmWg';
    this.reportPath = 'd55515ae-388d-4a7b-9dc9-80e97c221cfe';
    this.processingMode = 'Remote';
  }
  
  // Add this to your component
  onBeforeRender(event: any) {
    const reportViewer = event.detail;
    reportViewer.serviceAuthorizationToken = this.authToken;
  }

  onReportLoaded(event: any) {
    console.log('Report loaded');
    const reportViewer = event.detail;
    reportViewer.serviceAuthorizationToken = this.authToken;
    // You may need to refresh the report after setting the token
    reportViewer.refreshReport();
  }

}
