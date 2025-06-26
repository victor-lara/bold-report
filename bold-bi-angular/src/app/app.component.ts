import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { BoldBIService } from './bold-bi.service';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

@Component({
  selector: 'app-root',
  template: ` <div id="dashboard-container"></div> `,
  styles: [
    `
      .dashboard-container {
        width: 100%;
        height: 80vh;
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

  constructor(private boldbiService: BoldBIService) {}

  ngAfterViewInit() {
    this.loadDashboard();
  }

  private validateConfig(config: any): boolean {
    const stringProps = [
      'serverUrl',
      'dashboardId',
      'embedToken',
      'width',
      'height',
      'expirationTime',
      'embedType',
      'environment',
    ];
    return stringProps.every((prop) => {
      const isValid =
        typeof config[prop] === 'string' && config[prop].trim() !== '';
      if (!isValid) {
        console.error(`Invalid ${prop}:`, config[prop]);
      }
      return isValid;
    });
  }

  async loadDashboard() {
    try {
      const config = {
        serverUrl: 'http://localhost:4200/bi', // Replace with your Bold BI server URL
        dashboardId: '85244641-f2d6-4252-a4ee-f6ea8aaaa280', // Or use dashboardPath instead
        embedContainerId: 'dashboard-container',
        embedToken: 'yJgcJrbyjY1ibbHmUF6eWoyBiWHzdF5Z',
        embedType: BoldBI.EmbedType.Component,
        environment: BoldBI.Environment.Cloud,
        proxyUrl: 'http://localhost:4200/bi',
        token:
          'zCXB6pL2HYZXBu4KSq5zwD0XbWYfHDqEx5Z+94zttKzM61RuLeieUDpA3Jq5cqKv4uslNE4rCeFxys/SHiZ1dnVOHBftiGO11k/pc2nAQ/4=',
      };

      // if (!this.container?.nativeElement) {
      //   throw new Error('Dashboard container not found');
      // }

      await this.boldbiService.initializeDashboard(config);
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
