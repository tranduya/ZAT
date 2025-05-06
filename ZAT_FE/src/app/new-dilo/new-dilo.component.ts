import { Component } from '@angular/core';
import { DiloService } from '../service/dilo.service';
import { NosicTypService } from '../service/nosic-typ.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Dilo } from '../interface/dilo';
import { showNotification } from '../lib/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { NosicTyp } from '../interface/nosic-typ';
import { StavService } from '../service/stav.service';

@Component({
  selector: 'app-new-dilo',
  templateUrl: './new-dilo.component.html',
  styleUrls: ['./new-dilo.component.css']
})
export class NewDiloComponent {
  nosicTypy: NosicTyp[] = [];

  /* Form data container*/
  form: any = {
    nazev: null,
    autor: null,
    dat_porizeni: null,
    delka: null,
    popis: null
  };


  constructor(protected diloService: DiloService, protected nosicTypService: NosicTypService, protected stavService: StavService,
    protected notificationService: NotificationService, protected router: Router, protected route: ActivatedRoute){}

  ngOnInit(): void {
    this.onGetTypNosice();
  }
  
  protected onGetTypNosice() {
    this.nosicTypService.getNosicTypes().subscribe(data => {
      this.nosicTypy = data;
    })
  }

  onCreateDilo(dilo: Dilo): void {
    this.diloService.createDilo(dilo).subscribe({
      next: () => {
        this.router.navigate([`..`]);
        showNotification("Dílo bylo úspěšně uloženo v knihovně.", 'success', this.notificationService);
      },
      error: err => {
        showNotification("Dílo se nepovedlo uložit.", 'error', this.notificationService);
      }
    })
  }

  protected checkForCompleteness(): boolean {
    if (
      (this.form.nazev == null ||
        this.form.autor == null ||
        this.form.nosic_id == null ||
        this.form.dat_porizeni == null ||
        this.form.delka == null ||
        this.form.popis == null)
      ||
      (this.form.nazev == "" ||
        this.form.autor == "" ||
        this.form.nosic_id == "" ||
        this.form.dat_porizeni == "" ||
        this.form.delka == "" ||
        this.form.popis == "")
    ) {
      showNotification('Všechna pole musí být vyplněna!','error', this.notificationService);
      return false;
    }

    return true;
  }

  /************* Buttons *************/
  handleClickSaveDilo(): void {
    if (!this.checkForCompleteness()) {
      return;
    }
    
    let dilo = {
      dilo_id: 0,
      nosic_id: this.form.nosic_id,
      nazev: this.form.nazev,
      autor: this.form.autor,
      dat_porizeni: this.form.dat_porizeni,
      delka: this.form.delka,
      popis: this.form.popis,
      stav_id: 3,
      prezdivka: null,
      dat_vraceni_plan: null
    }

    this.onCreateDilo(dilo);
  }
}

