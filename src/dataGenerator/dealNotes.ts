import { Db } from './types';
import { randomDate } from './utils';

const type = ['Email', 'Call', 'Call', 'Call', 'Call', 'Meeting', 'Reminder'];

import {faker} from '@faker-js/faker/locale/en_GB'

export const generateDealNotes = (db: Db) => {
    return Array.from(Array(300).keys()).map(id => {
        const deal = faker.helpers.arrayElement(db.deals);
        deal.nb_notes++;
        return {
            id,
            deal_id: deal.id,
            type: faker.helpers.arrayElement(type),
            text: faker.lorem.paragraphs(faker.helpers.rangeToNumber({ min: 1, max: 2 })),
            date: randomDate(
                new Date(db.companies[deal.company_id as number].created_at)
            ).toISOString(),
            sales_id: deal.sales_id,
        };
    });
};
