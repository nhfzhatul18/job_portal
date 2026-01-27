import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiwayatService } from '../services/riwayat.service';
import { LowonganService } from '../services/lowongan.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab2Page {

  // ===== FORM =====
  nama = "";
  alamat = "";
  nohp = "";
  email = "";
  jk = "Perempuan";
  pendidikan = "SMA";

  // ===== LOWONGAN (DINAMIS) =====
  posisi_lamaran = "";
  perusahaan = "";
  lokasi = "";

  cvFile: File | null = null;
  cvName: string | null = null;

  constructor(
    private riwayatService: RiwayatService,
    private lowonganService: LowonganService
  ) {}

  ionViewWillEnter() {
    const lowongan = this.lowonganService.getLowongan();
    if (lowongan) {
      this.posisi_lamaran = lowongan.posisi_lamaran;
      this.perusahaan = lowongan.perusahaan;
      this.lokasi = lowongan.lokasi;
    }
  }

  uploadCv(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFile = file;
      this.cvName = file.name;
    }
  }

  async submitForm() {

    if (!this.nama || !this.alamat || !this.nohp || !this.email || !this.cvFile) {
      alert("Semua field harus diisi dan CV harus diupload!");
      return;
    }

    const formData = new FormData();
    formData.append("nama", this.nama);
    formData.append("alamat", this.alamat);
    formData.append("nohp", this.nohp);
    formData.append("email", this.email);
    formData.append("jenis_kelamin", this.jk);
    formData.append("pendidikan", this.pendidikan);
    formData.append("posisi_lamaran", this.posisi_lamaran);

    formData.append("cv", this.cvFile, this.cvFile.name);

    const res = await fetch("http://localhost/api/action.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status === "success") {

      this.riwayatService.tambahLamaran({
        nama: this.nama,
        pendidikan: this.pendidikan,
        posisi_lamaran: this.posisi_lamaran,
        perusahaan: this.perusahaan,
        lokasi: this.lokasi,
        cv: this.cvName,
        tanggal: new Date().toLocaleString()
      });

      this.lowonganService.clear();
      alert("Lamaran berhasil dikirim!");
    }
  }
}
