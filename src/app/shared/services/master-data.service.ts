import { Injectable } from '@angular/core';
import { MasterTable } from '@shared/models/master-table';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private url = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  public getRoles(): Observable<Array<MasterTable>>{
    console.log("se llama al getROles")
    const url = this.url+ '/mastertable/roles';
    return this.http.get<Array<MasterTable>>(url);
  }

  public getLanguages(): Observable<Array<MasterTable>>{
    console.log("se llama al languages")
    const url = this.url + '/mastertable/languages';
    return this.http.get<Array<MasterTable>>(url);

  }

}
