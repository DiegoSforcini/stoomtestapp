import {Component, OnInit} from '@angular/core';
import {Address} from "./address";
import {AddressService} from "./address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'frontend';

  public addresses: Address[] = [];
  // @ts-ignore
  public editAddress: Address;
  // @ts-ignore
  public deleteAddress: Address;

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

  public searchAddress(key: string): void {
    const results: Address[] = [];
    for (const address of this.addresses) {
      if ((address.streetName.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (address.city.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (address.neighbourhood.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
        (address.state.toLowerCase().indexOf(key.toLowerCase()) !== -1)) {
        results.push(address);
      }
    }
    this.addresses = results;
    if (!key) {
      this.getAllAddresses();
    }
  }

  public onOpenModal(mode: string, address?: Address): void {
    const content = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAddressModal');
    } else if (mode === 'edit') {
      // @ts-ignore
      this.editAddress = address;
      button.setAttribute('data-target', '#editAddressModal');
    } else if (mode === 'delete') {
      // @ts-ignore
      this.deleteAddress = address;
      button.setAttribute('data-target', '#deleteAddressModal');
    }
    // @ts-ignore
    content.appendChild(button);
    button.click();
  }

  public onAddAddress(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('closeAddModal').click();
    this.addressService.addAddress(addForm.value).subscribe(
      (response: Address) => {
        console.log(response);
        this.getAllAddresses();
        addForm.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onEditAddress(address: Address): void {
    this.addressService.updateAddress(address).subscribe(
      (response: Address) => {
        console.log(response);
        this.getAllAddresses();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteAddress(addressId: number): void {
    // @ts-ignore
    document.getElementById('closeDeleteModal').click();
    this.addressService.deleteAddress(addressId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllAddresses();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
