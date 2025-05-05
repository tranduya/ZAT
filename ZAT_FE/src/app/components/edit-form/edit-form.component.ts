import { Component } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Dilo } from 'src/app/interface/dilo';
import { DiloService } from 'src/app/service/dilo.service';
import { NosicTypService } from 'src/app/service/nosic-typ.service';
import { StavService } from 'src/app/service/stav.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  editedDilo: Dilo | undefined;

  constructor(private diloService: DiloService, private nosicTypService: NosicTypService, private stavService: StavService,
    private notificationService: NotificationService){}

  form: any = {
    nazev: null,
    autor: null,
    nosic_id: null,
    dat_porizeni: null,
    delka: null,
    popis: null
  };

  onGetDilo(dilo_id: number): void {
    this.diloService.getDilo(dilo_id).subscribe(data => {
      this.editedDilo = data[0];
      console.log(this.editedDilo);
    })
  }

  public editDilo(dilo: any): void {
    // this.onGetDilo(dilo.dilo_id);
    this.editedDilo = dilo;

    this.form.nazev = dilo.nazev;
    this.form.autor = dilo.autor;
    this.form.nosic_id = dilo.nosic_id;
    this.form.dat_porizeni = dilo.dat_porizeni;
    this.form.delka = dilo.delka;
    this.form.popis = dilo.popis;

    console.log(this.editDilo);
  }

}
