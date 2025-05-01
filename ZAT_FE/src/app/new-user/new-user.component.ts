import { Component } from '@angular/core';
import { Role } from '../interface/role';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import { showNotification } from '../lib/notification';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  /* Form data containers*/
  form: any = {
    nickname: null,
    name: null,
    surname: null,
    pwd: null,
    confirmPwd: null,
    email: null,
    telephone: null,
    selectedRole: 1
  }
  isAuthorizated = false;

  protected roles: Role[] = [];

  constructor(protected userService: UserService, 
    protected notificationService: NotificationService, protected router: Router,
    protected route: ActivatedRoute){}

  onCreateUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: () => {
        this.router.navigate([`/sprava_uzivatelu`]);
      },
      error: err => {
      }
    })
  }

  protected checkForCompleteness(): boolean {
    if (Number.isNaN(this.form.telephone)) {
      showNotification("Telefonní číslo musí obsahovat pouze číslice!", 'error', this.notificationService);
      return false;
    }

    if (this.form.telephone < 0) {
      showNotification('Telefonní číslo nemůže mít zápornou hodnotu!', 'error', this.notificationService);
      return false;
    }

    if (
      this.form.nickname == null ||
      this.form.name == null ||
      this.form.surname == null ||
      this.form.pwd == null ||
      this.form.confirmPwd == null ||
      this.form.email == null ||
      this.form.telephone == null
    ) {
      showNotification('Všechna pole musí být vyplněna!','error', this.notificationService);
      return false;
    }

    if (this.form.pwd != this.form.confirmPwd) {
      showNotification('Hesla nejsou shodná!', 'error', this.notificationService);
      return false;
    }

    return true;
  }

  /************* Buttons *************/
  handleClickSaveUser() {
    if (!this.checkForCompleteness()) {
      return;
    }
    
    let user = {
      pujcujici_id: 0,
      jmeno: this.form.name,
      prijmeni: this.form.surname,
      prezdivka: this.form.nickname,
      email: this.form.email,
      telefon: this.form.telephone,
    }

    this.onCreateUser(user);
  }
}
