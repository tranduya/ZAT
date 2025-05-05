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
import { EditFormComponent } from '../components/edit-form/edit-form.component';

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
  editable: boolean = false;
  dialogOpened = false;
  selectedDilo: Dilo | undefined;
  editDialogOpened: boolean = false;
  editDialogTitle: string | undefined;

  constructor(private diloService: DiloService, private nosicTypService: NosicTypService, private stavService: StavService,
    private vypujckaService: VypujckaService, private notificationService: NotificationService, protected router: Router,){}

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
      this.stavy = data;
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
            dilo.stav_id = 4;
          } else {
            dilo.stav_id = data[0].stav_id;
            dilo.prezdivka = data[0].prezdivka;
            dilo.dat_vraceni_plan = data[0].dat_vraceni_plan;
          }
        },
        error: (err) => {
          // Pokud chyba, můžeš třeba nastavit stav_id jako neznámý nebo 4
          console.error(`Chyba při načítání výpůjčky pro dílo ${dilo.dilo_id}:`, err);
          dilo.stav_id = 4;
        }
      });
    }
  }


  // onDeleteDilo(user: User): void {
  //   this.userService.deleteUser(user.pujcujici_id).subscribe({
  //     next: () => {
  //       showNotification(`Uživatel ${user.jmeno} ${user.prijmeni} byl úspěšně smazán`, 'success', this.notificationService);
  //       this.users = this.users.filter(u => u.pujcujici_id !== user.pujcujici_id);
  //     },
  //     error: () => {
  //     }
  //   })
  // }
  
  /************* Buttons *************/
  handleClickDeleteDilo(dataItem: any): void{
    this.selectedDilo = dataItem;
    console.log(dataItem);
    this.dialogOpened = true;
  }

  editDiloHandler(dataItem: any): void {
    this.editDialogTitle = "Upravit dílo";
    this.editDialogOpened = true;
    const editForm = new EditFormComponent(this.diloService, this.nosicTypService, this.stavService, this.notificationService);
    editForm.editDilo(dataItem.dataItem);
  }
  
  addDiloHandler(): void {
    this.editDialogTitle = "Nové dílo";
    this.editDialogOpened = true;
    console.log("new");
  }

  /*Dilo dialog*/
  handleClickDialog(status: string): void {
    if (status == 'yes') {
      // this.onDeleteUser(this.selectedUser!);
    }

    this.dialogOpened = false;
  }

  /*Edit dialog*/
  handleClickCloseDialog(): void {
    this.editDialogOpened = false;
  }
}
