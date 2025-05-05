import { Component } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';
import { showNotification } from '../lib/notification';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [];
  dialogOpened = false;
  selectedUser: User | undefined;
  isAuthorizated = false;

  constructor(private userService: UserService, private notificationService: NotificationService, protected router: Router,){}

  ngOnInit(){
    this.onGetUsers();
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }


  onDeleteUser(user: User): void {
    this.userService.deleteUser(user.pujcujici_id).subscribe({
      next: () => {
        showNotification(`Uživatel ${user.jmeno} ${user.prijmeni} byl úspěšně smazán`, 'success', this.notificationService);
        this.users = this.users.filter(u => u.pujcujici_id !== user.pujcujici_id);
      },
      error: () => {
      }
    })
  }
  
  /************* Buttons *************/
  handleClickDeleteUser(dataItem: any): void{
    this.selectedUser = dataItem;
    this.dialogOpened = true;
  }

  handleClickEditUser(dataItem: any): void {
    const kodUzivatele = dataItem.pujcujici_id;
    window.location.href = `${window.location.pathname}/${kodUzivatele}`;
  }

  /* Dialog*/
  handleClickDialog(status: string): void {
    if (status == 'yes') {
      this.onDeleteUser(this.selectedUser!);
    }

    this.dialogOpened = false;
  }
}
