import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiwayatService {

  private riwayat: any[] = [];

  tambahLamaran(data: any) {
    this.riwayat.unshift(data);
  }

  getRiwayat() {
    return this.riwayat;
  }
}
