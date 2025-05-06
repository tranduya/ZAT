import { Component } from '@angular/core';
import { NewVypujckaComponent } from '../new-vypujcka/new-vypujcka.component';
import { Stav } from '../interface/stav';
import { Vypujcka } from '../interface/vypujcka';
import { showNotification } from '../lib/notification';

@Component({
  selector: 'app-edit-vypujcka',
  templateUrl: './edit-vypujcka.component.html',
  styleUrls: ['./edit-vypujcka.component.css']
})
export class EditVypujckaComponent extends NewVypujckaComponent{
  stavy: Stav[] = [];
  vypujcka: Vypujcka | undefined;

  /* Form data containers*/
  override form: any = {
    dilo_id: null,
    pujcujici_id: null,
    stav_id: null,
    dat_zapujceni: null,
    dat_vraceni_plan: null,
    dat_vraceni: null
  };

  override ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id != null) {
        this.onGetVypujcka(parseInt(id));
      }
    })
  }
  
  onGetVypujcka(id: number) {
    this.vypujckaService.getVypujcka(id).subscribe(data => {
      this.vypujcka = data[id-1];
      this.onGetDila();
      this.onGetUsers();
      this.onGetStav();
    });
  }

  onGetStav() {
    this.stavService.getStavy().subscribe(data => {
      this.stavy = data;
      this.stavy.pop();
      this.fillDataContainers();
    })
  }

  fillDataContainers() {
    this.form.dilo_id = this.vypujcka?.dilo_id;
    this.form.pujcujici_id = this.vypujcka?.pujcujici_id;
    this.form.stav_id = this.vypujcka?.stav_id;
    this.form.dat_zapujceni = this.vypujcka?.dat_zapujceni;
    this.form.dat_vraceni_plan = this.vypujcka?.dat_vraceni_plan;
    this.form.dat_vraceni = this.vypujcka?.dat_vraceni;
  }

  onUpdateVypujcka(vypujcka: Vypujcka): void {
    this.vypujckaService.updateVypujcka(vypujcka, vypujcka.vypujcka_id).subscribe({
      next: () => {
        this.router.navigate([`/prehled_vypujcek`]);
        showNotification("Výpůjčka byla úspěšně aktualizována.", 'success', this.notificationService);
      },
      error: err => {
        showNotification("Výpůjčka se nepovedla aktualizovat.", 'error', this.notificationService);
      }
    })
  }


  /************* Buttons *************/
  override handleClickSaveVypujcka(): void {
    if (!this.checkForCompleteness()) {
      return;
    }
    
    let vypujcka = {
      vypujcka_id: this.vypujcka?.vypujcka_id!,
      dilo_id: this.form.dilo_id,
      nosic_id: 0,
      pujcujici_id: this.form.pujcujici_id,
      stav_id: this.form.stav_id,
      dat_zapujceni: this.form.dat_zapujceni,
      dat_vraceni_plan: this.form.dat_vraceni_plan,
      dat_vraceni: this.form.dat_vraceni,
      nazev: undefined,
      prezdivka: undefined
    }

    this.onUpdateVypujcka(vypujcka);
  }

  handleClickRefreshPage() {
    window.location.reload()
  }
}
