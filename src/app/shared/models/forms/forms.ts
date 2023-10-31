import { Errors } from '@shared/models/types/errors';
import { TypeForms } from '../types/type-forms';
import { MasterTable } from '../master-table';

export interface Forms {
  nameString: string;
  validations: Errors[];
  name: string;
  type?: TypeForms;
  elements?: any[];
  readonly?:boolean;
  multi?: boolean;
}

