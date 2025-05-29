import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request:', req.url);
    const authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhcmEuaEBvdXRsb29rLmNvbSIsIm5hbWVpZCI6IjE4NDciLCJ1bmlxdWVfbmFtZSI6IjM4NzYyOTExLWJlOGUtNDljNC1hM2UxLTQ1NDRmYmQwMzhhMyIsIklQIjoiMTAuMjQ0LjEuODYiLCJpc3N1ZWRfZGF0ZSI6IjE3NDgzNzIyNDIiLCJuYmYiOjE3NDgzNzIyNDIsImV4cCI6MTc1MjI3ODQwMCwiaWF0IjoxNzQ4MzcyMjQyLCJpc3MiOiJodHRwczovL2Nsb3VkLmJvbGRyZXBvcnRzLmNvbS9yZXBvcnRpbmcvc2l0ZS9iMzQxOTY4IiwiYXVkIjoiaHR0cHM6Ly9jbG91ZC5ib2xkcmVwb3J0cy5jb20vcmVwb3J0aW5nL3NpdGUvYjM0MTk2OCJ9.SmM9oJcqbPdt91Heqg4B8UvbgdGlzmBMsr1wzcRlmWg'
    // Modify the request if needed
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next.handle(modifiedReq);
  }
}