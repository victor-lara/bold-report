// boldbi.service.ts
import { Injectable } from '@angular/core';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

@Injectable({ providedIn: 'root' })
export class BoldBIService {
  private dashboard: any;

  initializeDashboard(config: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Verify container exists
        // if (!container) {
        //   throw new Error('Container element not found');
        // }

        // Create dashboard instance
        this.dashboard = BoldBI.create({
          ...config,
        });

        // Load dashboard
        this.dashboard.loadDashboard();
      } catch (error) {
        reject(error);
      }
    });
  }

  destroyDashboard() {
    if (this.dashboard) {
      this.dashboard.destroy();
      this.dashboard = null;
    }
  }
}
