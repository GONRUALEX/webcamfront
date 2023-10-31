import { MasterTable } from "@shared/models/master-table";

export interface User {
  id?: number;
  name?: string;
  imagePerfil?: string;
  nameUser?: string;
  email?: string;
  password?: string;
  tokenPassword?: string;
  roles?: MasterTable[];
  lastName1?: string;
  lastName2?: string;
  stateAccount?: boolean;
  language?: MasterTable;
  createdBy?: string;
  createdDate?: Date;
  lastMofifiedDate?: Date;
  modifiedBy?: string;
}

export class UserSearch{
  name?:string;
  nameUser?:string;
  email?:string;
  createdDate?:Date;

  constructor(
    name: string = null,
    nameUser: string = null,
    email: string = null,
    createdDate: Date = null,
  ){
    this.name = name;
    this.nameUser = nameUser;
    this.email = email;
    this.createdDate = createdDate;
  }
}
