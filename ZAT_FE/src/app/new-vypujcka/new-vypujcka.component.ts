import { Component } from '@angular/core';
import { VypujckaService } from '../service/vypujcka.service';
import { UserService } from '../service/user.service';
import { DiloService } from '../service/dilo.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interface/user';
import { Dilo } from '../interface/dilo';
import { showNotification } from '../lib/notification';
import { Vypujcka } from '../interface/vypujcka';
import { StavService } from '../service/stav.service';


@Component({
  selector: 'app-new-vypujcka',
  templateUrl: './new-vypujcka.component.html',
  styleUrls: ['./new-vypujcka.component.css']
})
export class NewVypujckaComponent {
  dila: Dilo[] = [];
  users: User[] = [];

  /* Form data container*/
  form: any = {
    dilo_id: null,
    pujcujici_id: null,
    dat_zapujceni: null,
    dat_vraceni_plan: null
  };

  constructor(protected diloService: DiloService, protected vypujckaService: VypujckaService, protected userService: UserService,
      protected notificationService: NotificationService, protected stavService: StavService, protected router: Router,
      protected route: ActivatedRoute){}

  ngOnInit(): void {
    this.onGetDila();
  }

  onGetDila(): void {
    this.diloService.getDila().subscribe(data => {
      this.dila = data;
      this.onGetUsers();
    })
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  onCreateVypujcka(vypujcka: Vypujcka): void {
    this.vypujckaService.createVypujcka(vypujcka).subscribe({
      next: () => {
        this.router.navigate([`/prehled_vypujcek`]);
        showNotification("Byla úspěšně vytvořena nová výpůjčka.", 'success', this.notificationService);
      },
      error: err => {
        showNotification("Nepodařilo se vytvořit novou výpůjčku.", 'error', this.notificationService);
      }
    })
  }

  protected checkForCompleteness(): boolean {
    if (
      (this.form.dilo_id == null ||
        this.form.pujcujici_id == null ||
        this.form.dat_zapujceni == null ||
        this.form.dat_vraceni_plan == null)
      ||
      (this.form.dilo_id == "" ||
        this.form.pujcujici_id == "" ||
        this.form.dat_zapujceni == "" ||
        this.form.dat_vraceni_plan == "")
    ) {
      showNotification('Všechna pole musí být vyplněna!','error', this.notificationService);
      return false;
    }

    return true;
  }

  /************* Buttons *************/
  handleClickSaveVypujcka(): void {
    if (!this.checkForCompleteness()) {
      return;
    }
    

    let vypujcka = {
      vypujcka_id: 0,
      dilo_id: this.form.dilo_id,
      nosic_id: 0,
      pujcujici_id: this.form.pujcujici_id,
      stav_id: 1,
      dat_zapujceni: this.form.dat_zapujceni,
      dat_vraceni_plan: this.form.dat_vraceni_plan,
      dat_vraceni: undefined,
      nazev: undefined,
      prezdivka: undefined
    }

    this.onCreateVypujcka(vypujcka);
  }
}
