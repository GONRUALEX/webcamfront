import { Injectable } from '@angular/core';
import { MasterTable } from '@shared/models/master-table';

interface Dropdown {
  name: string,
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  mapperMasterTableToDropdown(originalArray: MasterTable[]): Dropdown[] {
    console.log("mappermastertodropdoen", originalArray)
    return originalArray.map((item) => ({
      name: item.description || '',
      code: item.id ? item.id.toString() : '',
    }));
  }

  mapperDropdownToMasterTable(transformedArray: Dropdown[]): MasterTable[] {
    return transformedArray.map((item) => ({
      id: parseInt(item.code) || undefined,
      description: item.name || undefined,
      valor: item.name || undefined,
      valid: true,
    }));
  }
}
