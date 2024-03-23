import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKeyHeader = environment.xApiKey;
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-api-key': apiKeyHeader
      }
    });
    return next.handle(modifiedRequest);
  }
}
