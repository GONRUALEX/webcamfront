import { Errors } from '@shared/models/types/errors';

export interface Forms {
  nameString: string;
  validations: Errors[];
  name: string;
}
