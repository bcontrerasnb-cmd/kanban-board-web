import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getBoards(): Observable<any> {
    return this.http.get(`${this.apiUrl}/boards`);
  }

  getListsByBoard(boardId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lists/${boardId}`);
  }

  getCardsByList(listId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cards/${listId}`);
  }

  updateCard(cardId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cards/${cardId}`, data);
  }
}