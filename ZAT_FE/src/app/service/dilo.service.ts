import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { Dilo } from '../interface/dilo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiloService {
  private apiUrl = enviroment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  getDila(): Observable<Dilo[]> {
    return this.http.get<Dilo[]>(`${this.apiUrl}/dila`);
  }
  
  getDilo(id: number): Observable<Dilo[]> {
    return this.http.get<Dilo[]>(`${this.apiUrl}/dila/${id}`);
  }

  createDilo(dilo: Dilo): Observable<Dilo> {
    return this.http.post<Dilo>(`${this.apiUrl}/dilo`, dilo);
  }

  updateDilo(dilo: Dilo, id: number): Observable<Dilo> {
    return this.http.put<Dilo>(`${this.apiUrl}/dilo/${id}`, dilo);
  }
  
  deleteUser(id: number): Observable<Dilo> {
    return this.http.delete<Dilo>(`${this.apiUrl}/dilo/${id}`);
  }
}
