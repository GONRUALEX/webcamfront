import { Component, OnInit, ViewChildren } from '@angular/core';
import { UserService } from '@pages/private/user.service';
import { Page } from '@shared/models/pagination/page';
import { Direction, PageRequest } from '@shared/models/pagination/page-request';
import { User, UserSearch } from '@shared/models/users/user';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { ColumnFilter } from 'primeng/table';

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
  pageRequest: PageRequest<UserSearch>;
  data: Page<User>;

  totalRecords!: number;

  loading: boolean = false;

  selectAll: boolean = false;

  selectedCustomers!: User[];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loading = true;
    console.log(this.pageRequest);
  }

  onRowSelect(event: any) {
    console.log(event, 'event');
  }

  onRowUnselect(event: any) {
    console.log(event);
  }

  printFilteredUsers(event: any) {
    console.log(event, 'lkjdfslksjdfkjdf');
  }

  onRowEditInit(user: User) {
    console.log('usuario nuevo', user);
    // this.clonedUser[user.id as string] = { ...product };
  }

  onRowEditSave(user: User) {
    console.log('save', user);
  }

  onRowEditCancel(user: User, index: number) {
    console.log('cancelado', user, index);
  }

  load(event?: PageRequest<UserSearch>, selectAll?: boolean) {
    this.userService
      .list(event ? event : this.pageRequest)
      .subscribe((data: Page<User>) => {
        console.log(data);
        this.totalRecords = data.totalElements;
        this.users = data.content;
        this.data = data;
        this.loading = false;
        selectAll ? (this.selectAll = true) : '';
      });
  }

  loadUsers(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event, 'event');
    setTimeout(() => {
      console.log(this.mapperPageRequest(event), 'que tal que tal');
      this.load(this.mapperPageRequest(event));
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;
    console.log('holholahohhola');
    if (checked) {
      this.load(this.mapperPageRequest(event), true);
    } else {
      this.selectedCustomers = [];
      this.selectAll = false;
    }
  }

  mapperPageRequest(lazyLoad: LazyLoadEvent): PageRequest<UserSearch> {
    const pageNumber: number = Math.floor(lazyLoad.first / lazyLoad.rows);
    const pageSize: number = lazyLoad.rows;
    const sortField: string = lazyLoad.sortField
      ? lazyLoad.sortField
      : 'createdDate';
    const userSearch: UserSearch = {
      name: lazyLoad.filters['name'].value,
      nameUser: lazyLoad.filters['nameUser'].value,
      email: lazyLoad.filters['email'].value,
      createdDate: lazyLoad.filters['createdDate'].value,
    };
    const pageRequest: PageRequest<UserSearch> = new PageRequest<UserSearch>(
      pageNumber,
      pageSize,
      sortField === 'createdDate' ? 'createdDate' : sortField,
      lazyLoad.sortOrder == 1 ? false : true,
      userSearch
    );
    return pageRequest;
  }
}
