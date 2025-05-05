import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';
import { NosicTyp } from '../interface/nosic-typ';

@Injectable({
  providedIn: 'root'
})
export class NosicTypService {
  private apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getNosicTypes(): Observable<NosicTyp[]> {
    return this.http.get<NosicTyp[]>(`${this.apiUrl}/typNosice`);
  }
}
