import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "./address";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/address/all`)
  }

  public addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/address/new`, address);
  }

  public updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/address/update`, address);
  }

  public deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/address/delete/${id}`);
  }
}
