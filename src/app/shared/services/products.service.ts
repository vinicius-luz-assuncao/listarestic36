import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  
  
  getAllByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?userId=${userId}`);
  }
  
  // aqui a rota esta privada
  private apiUrl = 'api/products';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUserProducts(): Observable<Product[]> {
    return this.auth.user$.pipe(
      switchMap(user => this.http.get<Product[]>(`${this.apiUrl}?userId=${user?.sub}`))
    );
  }
// fim da rota privada, refatorar 

  httpClient = inject(HttpClient);
    

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  get(id: string) {
    return this.httpClient.get<Product>(`/api/products/${id}`);
      
  }

  post(payload: ProductPayload) { 
    return this.httpClient.post('/api/products', payload);
  }
  
  put(id: string, payload: ProductPayload) { 
    return this.httpClient.put(`/api/products/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/products/${id}`);
  }

}
