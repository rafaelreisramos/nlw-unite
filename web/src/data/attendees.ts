import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export const attendees = Array.from({ length: 200 }).map(() => ({
  id: faker.number.int({ min: 10000, max: 20000 }),
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  createdAt: faker.date.recent({
    days: 30,
    refDate: dayjs().subtract(8, 'days').toDate(),
  }),
  checkInAt: faker.helpers.arrayElement([
    undefined,
    faker.date.recent({ days: 7 }),
  ]),
}))
