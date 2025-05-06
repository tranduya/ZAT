import { Component } from '@angular/core';
import { NewDiloComponent } from '../new-dilo/new-dilo.component';
import { Dilo } from '../interface/dilo';
import { showNotification } from '../lib/notification';

@Component({
  selector: 'app-edit-dilo',
  templateUrl: './edit-dilo.component.html',
  styleUrls: ['./edit-dilo.component.css']
})
export class EditDiloComponent extends NewDiloComponent{
  dilo: Dilo | undefined;

  override ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id != null) {
        this.onGetDilo(parseInt(id));
        this.onGetTypNosice();
      }
    })
  }

  onGetDilo(id: number) {
    this.diloService.getDilo(id).subscribe(data => {
      this.dilo = data[id-1];
      // this.dilo = data[0];
      this.fillDataContainers();
    });
  }

  fillDataContainers() {
    this.form.nazev = this.dilo?.nazev!
    this.form.autor = this.dilo?.autor
    this.form.nosic_id = this.dilo?.nosic_id
    this.form.dat_porizeni = this.dilo?.dat_porizeni
    this.form.delka = this.dilo?.delka
    this.form.popis = this.dilo?.popis
  }

  onUpdateDilo(dilo: Dilo): void {
    this.diloService.updateDilo(dilo, dilo.dilo_id).subscribe({
      next: () => {
        this.router.navigate([``]);
        showNotification("Dílo bylo úspěšně aktualizováno.", 'success', this.notificationService);
      },
      error: err => {
        showNotification("Dílo se nepovedlo aktualizovat.", 'error', this.notificationService);
      }
    })
  }

  /************* Buttons *************/
  override handleClickSaveDilo(): void {
    if (!this.checkForCompleteness()) {
      return;
    }
    
    let editedDilo = {
      dilo_id: this.dilo?.dilo_id!,
      nosic_id: this.form.nosic_id,
      nazev: this.form.nazev,
      autor: this.form.autor,
      dat_porizeni: this.form.dat_porizeni,
      delka: this.form.delka,
      popis: this.form.popis,
      stav_id: 0,
      prezdivka: null,
      dat_vraceni_plan: null
    }

    this.onUpdateDilo(editedDilo);
  }

  handleClickRefreshPage() {
    window.location.reload()
  }

}
