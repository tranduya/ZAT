import { Component } from '@angular/core';
import { NewUserComponent } from '../new-user/new-user.component';
import { User } from '../interface/user';
import { showNotification } from '../lib/notification';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends NewUserComponent{
  user: User | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id != null) {
        this.onGetUser(parseInt(id));
      }
    })
  }
  
  onGetUser(id: number) {
    this.userService.getUser(id).subscribe(data => {
      this.user = data[0];
      this.fillDataContainers();
    });
  }

  onUpdateUser(user: User, id: number): void {
    this.userService.updateUser(user, id).subscribe({
      next: () => {
        this.router.navigate([`/sprava_uzivatelu`]);
        showNotification("Uživatel byl úspěšně aktualizován.", 'success', this.notificationService);
      },
      error: err => {
        showNotification("Uživatel se nepovedl aktualizovat.", 'error', this.notificationService);
      }
    })
  }
  
  private fillDataContainers() {
    this.form.nickname = this.user?.prezdivka!
    this.form.name = this.user?.jmeno!
    this.form.surname = this.user?.prijmeni
    this.form.email = this.user?.email
    this.form.telephone = this.user?.telefon
  }

  /************* Buttons *************/
  override handleClickSaveUser() {
    if (!this.checkForCompleteness()) {
      return;
    }
    
    let user = {
      pujcujici_id: this.user?.pujcujici_id!,
      jmeno: this.form.name,
      prijmeni: this.form.surname,
      prezdivka: this.form.nickname,
      email: this.form.email,
      telefon: this.form.telephone,
    }

    this.onUpdateUser(user, user.pujcujici_id);
  }

  
  handleClickRefreshPage() {
    window.location.reload()
  }
}
