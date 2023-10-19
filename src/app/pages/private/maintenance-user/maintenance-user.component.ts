import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../shared/models/users/user';
@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  styleUrls: ['./maintenance-user.component.scss']
})
export class MaintenanceUserComponent implements OnInit{
  users: User[];
  cols: any[];
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.list().subscribe(data=>{
      this.users = data;
    })

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  }

}
