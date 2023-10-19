import { Component, OnInit } from '@angular/core';
import { UserService } from '@pages/private/user.service';
import { User } from '@shared/models/users/user';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  styleUrls: ['./maintenance-user.component.scss'],
})
export class MaintenanceUserComponent implements OnInit {
  selectedSize: any = { name: 'Normal', class: '' };
  selectedUser!: User;
  users: User[];
  clonedUsers: { [s: string]: User } = {};
  statuses!: SelectItem[];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.list().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  onRowSelect(event: any) {
    console.log(event, "event")

}

onRowUnselect(event: any) {
    console.log(event)
}

onRowEditInit(user: User) {
  console.log("usuario nuevo", user)
 // this.clonedUser[user.id as string] = { ...product };
}

onRowEditSave(user: User) {
  console.log("save",user)
}

onRowEditCancel(user: User, index: number) {
  console.log("cancelado", user, index)
}
}
