import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  exists(element: string): boolean {
    return localStorage.getItem(element) != null;
  }

  set<T>(element: string, object: T): void {
    localStorage.setItem(element, JSON.stringify(object));
  }

  get<T>(element: string): T[] {
    return JSON.parse(localStorage.getItem(element)!);
  }

  clear(element): void {
    localStorage.removeItem(element);
  }
}
