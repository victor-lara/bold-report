import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { BoldBIService } from './bold-bi.service';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import { sanitizeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-root',
  template: ` <div id="dashboard-container"></div> `,
  styles: [
    `
      #dashboard-container {
        width: 100%;
        height: 100%;
        min-height: 600px;
      }
      .loading,
      .error {
        padding: 20px;
        text-align: center;
      }
    `,
  ],
  standalone: false,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dashboardContainer', { static: false }) container!: ElementRef;
  loading = true;
  error: string | null = null;
  config = {
    dashboardId: '04130fe8-2724-4476-8c3f-f3f715a6188f',
    serverUrl: 'https://cloud.boldbi.com/bi',
    siteIdentifier: 'site/b1907544',
    environment: BoldBI.Environment.Enterprise,
    embedType: BoldBI.EmbedType.Component,
    widgetId: 'bd902fc4-f794-4082-81fd-e3cc63847a32',
    authorizationServer: 'http://localhost:8080/embeddetail/get',
  };

  constructor(private boldbiService: BoldBIService) {}

  ngAfterViewInit() {
    //setTimeout(() => this.loadDashboard(), 1000);
    this.loadDashboard();
  }

  async loadDashboard() {
    try {
      const options = {
        serverUrl: `${this.config.serverUrl}/${this.config.siteIdentifier}`, //Dashboard Server BI URL (ex: http://localhost:5000/bi/site/site1, http://dashboard.syncfusion.com/bi/site/site1)
        dashboardId: this.config.dashboardId, //Item id of the dashboard in BI server.
        embedContainerId: 'dashboard-container', // This should be the container id where you want to embed the dashboard.
        embedType: this.config.embedType,
        environment: this.config.environment, // If Cloud, you should use BoldBI.Environment.Cloud
        mode: BoldBI.Mode.View,
        height: '100%',
        width: '100%',
        widgetId: this.config.widgetId,
        authorizationServer: {
          url: this.config.authorizationServer, //Url of the GetDetails(API) in this application.
        },
        expirationTime: 100000, //Set the duration for the token to be alive.
      };

      //await this.boldbiService.initializeDashboard(options);
      const report = BoldBI.create(options);
      //report.loadDashboard();
      report.loadDashboardWidget('Grid2');
      this.loading = false;
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
      this.error = 'Failed to load dashboard. Please try again later.';
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.boldbiService.destroyDashboard();
  }
}
