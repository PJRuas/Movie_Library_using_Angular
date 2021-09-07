import { GenericField } from './generic-field';

export interface ConfigPrams {
  page?: number;
  limit?: number;
  search?: string;
  field?: GenericField;
}
