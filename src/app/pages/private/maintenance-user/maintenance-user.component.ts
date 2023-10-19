import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../shared/models/users/user';
import { Column } from '../../../shared/models/table/column';
@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  styleUrls: ['./maintenance-user.component.scss']
})
export class MaintenanceUserComponent implements OnInit{
  selectedSize: any =  { name: 'Normal', class: '' };
  /*this.sizes = [
            { name: 'Small', class: 'p-datatable-sm' },
            { name: 'Normal', class: '' },
            { name: 'Large',  class: 'p-datatable-lg' }
        ];
        */
  users: User[];
  cols!: Column[];
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.list().subscribe(data=>{
      console.log(data)
      this.users = data;
    })

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'nameUser', header: 'nameUser' },
      { field: 'email', header: 'email' },
      { field: 'createdDate', header: 'createdDate' }
  ];
  }

}
