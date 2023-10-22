import { UserSearch } from "../users/user";

export interface Sort {
  direction: string;
  properties: string[];
}

export enum Direction {
  ASC,
  DESC,
}

export class PageRequest<T> {
  page: number;
	size: number;
	order: string;
	asc: boolean;
  search: T;

  constructor(
    page: number =0,
    size: number = 5,
    order: string = "name",
    asc: boolean = true,
    search: T
  ) {
    this.page = page;
    this.size = size;
    this.order = order;
    this.asc = asc;
    this.search = search;
  }

  setSearch(search: T){
    this.search = search;
  }

  getSearch():T{
    return this.search;
  }

  setPage(page:number){
    this.page = page;
  }

  getPage():number{
    return this.page;
  }

  setSize(size: number){
    this.size = size;
  }

  getSize(): number{
    return this.page;
  }

  setOrder(order:string){
    this.order = order;
  }

  getOrder(): string{
    return this.order;
  }

  setAsc(asc:boolean){
    this.asc = asc;
  }

  getAsc():boolean{
    return this.asc;
  }

}
