import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LowonganService {

  private lowonganDipilih: any = null;

  setLowongan(data: any) {
    this.lowonganDipilih = data;
  }

  getLowongan() {
    return this.lowonganDipilih;
  }

  clear() {
    this.lowonganDipilih = null;
  }
}
