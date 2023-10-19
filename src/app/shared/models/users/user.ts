import { MasterTable } from "../master-table";

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
}
