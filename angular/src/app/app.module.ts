import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './../app/common/api.interceptor';

import './../globals';

import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BoldReportViewerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
