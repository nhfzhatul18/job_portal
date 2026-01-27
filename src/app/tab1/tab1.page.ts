import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LowonganService } from '../services/lowongan.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(
    private router: Router,
    private lowonganService: LowonganService
  ) {}

  lamar(lowongan: any) {
    this.lowonganService.setLowongan(lowongan);
    this.router.navigate(['/tabs/tab2']);
  }
}
