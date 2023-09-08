import { Db } from './types';
import {faker} from '@faker-js/faker/locale/en_GB'

export const generateSales = (db: Db) => {
    const randomSales = Array.from(Array(10).keys()).map(id => {
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const email = faker.internet.email(first_name, last_name);

        return {
            id: id + 1,
            first_name,
            last_name,
            email,
        };
    });
    return [
        {
            id: 0,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'janedoe@twilio.com',
        },
        ...randomSales,
    ];
};
