import { Component } from '@angular/core';
import { Dilo } from '../interface/dilo';
import { DiloService } from '../service/dilo.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { NosicTypService } from '../service/nosic-typ.service';
import { NosicTyp } from '../interface/nosic-typ';
import { StavService } from '../service/stav.service';
import { Stav } from '../interface/stav';
import { VypujckaBasicInfo } from '../interface/vypujcka';
import { VypujckaService } from '../service/vypujcka.service';
import { showNotification } from '../lib/notification';

@Component({
  selector: 'app-dila',
  templateUrl: './dila.component.html',
  styleUrls: ['./dila.component.css']
})
export class DilaComponent {
  dila: Dilo[] = [];
  nosicTyp: NosicTyp[] = [];
  stavy: Stav[] = [];
  vypujcka: VypujckaBasicInfo | undefined;
  dialogOpened = false;
  selectedDilo: Dilo | undefined;

  constructor(private diloService: DiloService, private nosicTypService: NosicTypService, private stavService: StavService,
    private vypujckaService: VypujckaService, private notificationService: NotificationService, protected router: Router){}

  ngOnInit(){
    this.onGetNosicTypes();
  }

  onGetDila(): void {
    this.diloService.getDila().subscribe(data => {
      this.dila = data;
      this.onGetStav();
    })
  }
  
  onGetNosicTypes(): void {
    this.nosicTypService.getNosicTypes().subscribe(data => {
      this.nosicTyp = data;
      this.onGetDila();
    })
  }

  onGetStav() {
    this.stavService.getStavy().subscribe(data => {
      this.stavy.push(data[0]);
      this.stavy.push(data[2]);
      this.addVypujckyData();
    })
  }
  
  addVypujckyData() {
    for (let i = 0; i < this.dila.length; i++) {
      const dilo = this.dila[i];
      
      
      this.vypujckaService.getVypujckaBasicInfo(dilo.dilo_id).subscribe({
        next: (data) => {
          if (!data || data.length === 0) {
            // Simuluje "HTTP 204 No Content"
            dilo.stav_id = 3;
          } else {
            dilo.stav_id = data[0].stav_id;
            dilo.prezdivka = data[0].prezdivka;
            dilo.dat_vraceni_plan = data[0].dat_vraceni_plan;
          }
        },
        error: (err) => {
          console.error(`Chyba při načítání výpůjčky pro dílo ${dilo.dilo_id}:`, err);
          dilo.stav_id = 4;
        }
      });
    }
  }

  onDeleteDilo(dilo: Dilo): void {
    this.diloService.deleteUser(dilo.dilo_id).subscribe({
      next: () => {
        showNotification(`Dílo ${dilo.nazev} bylo úspěšně smazáno`, 'success', this.notificationService);
        this.dila = this.dila.filter(d => d.dilo_id !== dilo.dilo_id);
      },
      error: () => {
      }
    })
  }
  
  /************* Buttons *************/
  handleClickDeleteDilo(dataItem: any): void{
    this.selectedDilo = dataItem;
    this.dialogOpened = true;
  }

  handleClickEditDilo(dataItem: any): void {
    const kodDila = dataItem.dilo_id;
    window.location.href = `/edit_dilo/${kodDila}`;
  }
  
  /*Dilo dialog*/
  handleClickDialog(status: string): void {
    if (status == 'yes') {
      this.onDeleteDilo(this.selectedDilo!);
    }

    this.dialogOpened = false;
  }
}
