import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@pages/private/user.service';
import { Forms } from '@shared/models/forms/forms';
import { MasterTable } from '@shared/models/master-table';
import { Page } from '@shared/models/pagination/page';
import { PageRequest } from '@shared/models/pagination/page-request';
import { Errors } from '@shared/models/types/errors';
import { TypeForms } from '@shared/models/types/type-forms';
import { User, UserSearch } from '@shared/models/users/user';
import { MasterDataService } from '@shared/services/master-data.service';
import { UtilsService } from '@shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { forkJoin, map, take } from 'rxjs';

@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  styleUrls: ['./maintenance-user.component.scss'],
})
export class MaintenanceUserComponent implements OnInit {
  @ViewChild('targetElement', { static: false }) targetElement: ElementRef;
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  newUser: User;
  optionsForm: Forms[];
  errMsj?: string;

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

  user: User;

  rolesItems: Array<MasterTable> = [];
  languagesItems: Array<MasterTable> = [];

  showForm:boolean = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private masterDataService: MasterDataService,
    private utilsService: UtilsService
  ) {}
  ngOnInit(): void {
    this.generateDropDownOptions();
    this.newUser = this.resetUser();
    this.loading = true;
    this.myForm = this.getFormGroup(null);
  }

  showEditForm(){
    this.showForm = true;
    this.scrollForm();
  }

  loadDataForm() {
    this.optionsForm = [
      {
        nameString: 'id',
        validations: [],
        name: 'Id',
        readonly: true,
      },
      {
        nameString: 'name',
        validations: [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        name: 'Nombre',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'imagePerfil',
        validations: [],
        name: 'Imagen de perfil',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'nameUser',
        validations: [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        name: 'Nombre Usuario',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'email',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.EMAIL,
        ],
        name: 'Email',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'password',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.PATTERN,
        ],
        name: 'Password',
        type: TypeForms.PASSWORD,
      },
      {
        nameString: 'roles',
        validations: [],
        name: 'Roles',
        type: TypeForms.DROPDOWN,
        multi: true,
        elements: this.rolesItems?this.utilsService.mapperMasterTableToDropdown(this.rolesItems):[],
      },
      {
        nameString: 'lastName1',
        validations: [],
        name: 'Apellido 1',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'lastName2',
        validations: [],
        name: 'Apellido 2',
        type: TypeForms.TEXT,
      },
      {
        nameString: 'stateAccount',
        validations: [],
        name: 'Estado de la cuenta',
        type: TypeForms.CHECKBOX,
      },
      {
        nameString: 'language',
        validations: [],
        name: 'Idioma',
        type: TypeForms.DROPDOWN,
        multi:false,
        elements: this.languagesItems?this.utilsService.mapperMasterTableToDropdown(this.languagesItems):[],
      },
    ];
  }

  resetUser(): User {
    return {
      id: null,
      imagePerfil: '',
      nameUser: '',
      email: '',
      password: '',
      tokenPassword: '',
      roles: null,
      lastName1: '',
      lastName2: '',
      stateAccount: false,
      language: null,
      createdBy: '',
      createdDate: null,
      lastMofifiedDate: null,
      modifiedBy: '',
    };
  }

  getFormGroup(user: User) {

    user && user.roles ? console.log(user.roles, "edlemelkej oles elementos") : '';
    return this.fb.group({
      id: [user && user.id ? user.id : null, []],
      name: [user && user.name ? user.name : '', []],
      imagePerfil: [user && user.imagePerfil ? user.imagePerfil : '', []],
      nameUser: [user && user.nameUser ? user.nameUser : '', []],
      email: [user && user.email ? user.email : '', []],
      password: [user && user.password ? user.password : '', []],
      roles: [user && user.roles ? this.utilsService.mapperMasterTableToDropdown(user.roles) : [], []],
      lastName1: [user && user.lastName1 ? user.lastName1 : '', []],
      lastName2: [user && user.lastName2 ? user.lastName2 : '', []],
      stateAccount: [user && user.stateAccount ? user.stateAccount : false, []],
      language: [user && user.language ? this.utilsService.mapperMasterTableToDropdown( [user.language])[0] : [], []],
    });
  }

  onRowSelect(event: any) {

    this.myForm = this.getFormGroup(event.data as User);
    console.log(event, 'event');
    this.scrollForm();
  }

  scrollForm(){
    setTimeout(()=>{
    const element = this.targetElement.nativeElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }},500)
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
    });
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

  getResult(event: FormGroup): void {
    console.log('getResult', event);
    this.onRegister(event);
  }

  onRegister(form: FormGroup) {
    this.newUser.id = form.value.id!=null?Number(form.value.id):null;
    this.newUser.name = form.value.name;
    this.newUser.imagePerfil = form.value.imagePerfil;
    this.newUser.nameUser = form.value.nameUser;
    this.newUser.email = form.value.email;
    this.newUser.password = form.value.password;
    this.newUser.roles = this.utilsService.mapperDropdownToMasterTable(form.value.roles);
    this.newUser.lastName1 = form.value.lastName1;
    this.newUser.lastName2 = form.value.lastName2;
    this.newUser.stateAccount = form.value.stateAccount;
    this.newUser.language = this.utilsService.mapperDropdownToMasterTable(form.value.language)[0];
    console.log('holaa ue tal', this.newUser);
    this.userService.newOrUpdate(this.newUser).subscribe({
      next: (data) => {
        this.toastr.success('Nuevo usario creado ' + data.nameUser, '😀', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.close.emit(true);
        this.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errMsj =
          err.error != null
            ? err.error.mensaje
            : 'Algo a ocurrido, vuelve a intentarlo';
        this.toastr.error(this.errMsj + ' 😒', 'Error en el registro', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  reset() {
    this.myForm.reset();
  }

  public getRoles(): void {
    this.masterDataService.getRoles().subscribe((data) => {
      console.log('reoroe roles oerlkerj', data);
      this.rolesItems = data;
      this.loadDataForm();
    });
  }


  public generateDropDownOptions(): void {
    console.log("lkjdslfkldskjfñldsjflkjquet tall lllll")
    forkJoin([
      this.masterDataService.getRoles(),
      this.masterDataService.getLanguages(),

  ])
  .pipe(take(1))
  .subscribe(
        ([roles, languages]) => {
          console.log("roleslanguages",roles, languages )
          this.rolesItems = roles;
          this.languagesItems = languages;
          this.loadDataForm();
        }
      );
  }
}
