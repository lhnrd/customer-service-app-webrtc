import { schema } from 'normalizr';

export const customer = new schema.Entity('customers');
export const serviceCall = new schema.Entity('serviceCalls', {
  customer,
});
