import { MasterTable } from "@shared/models/master-table";

export interface User {
  id?:number;
  name?:string;
  lastName1?:string;
  password?:string;
  lastName2?:string;
  stateAccount?:boolean;
  language?:string;
  imagePerfil?:Blob;
  nameUser?:string;
  email?:string;
  tokenPassword?:string;
  roles?: MasterTable[];
  createdDate?:Date;
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
