import {Component, OnInit} from '@angular/core';
import {Address} from "./address";
import {AddressService} from "./address.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'frontend';

  public addresses: Address[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.getAllAddresses();
  }

  public getAllAddresses(): void {
    this.addressService.getAllAddresses().subscribe(
      (response: Address[]) => {
        this.addresses = response;
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
}
