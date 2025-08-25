export interface Field {
  id: string;
  label: string;
  type: string;
  isValueRequired: boolean;
  defaultValue?: string;
  options?: string[];
  orderType?: string;
  selectType?: string;
  placeholder?: string;
  createdAt: string;
  updatedAt: string;
}
