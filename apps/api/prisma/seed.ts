import { prisma } from '../src/lib/prisma'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

const MAXIMUM_ATTENDEES = 123

async function seed() {
  await prisma.event.deleteMany()
  const eventId = 'a2f8809f-a6b7-4ec4-a5d0-7f0e4558a0fc'
  await prisma.event.create({
    data: {
      id: eventId,
      title: 'Unite Summit',
      slug: 'united-summit',
      details: 'Um evento para quem é apaixonado por programação',
      maximumAttendees: MAXIMUM_ATTENDEES,
    },
  })
  await prisma.attendee.deleteMany()
  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = []
  for (let i = 0; i < MAXIMUM_ATTENDEES; i++) {
    attendeesToInsert.push({
      id: 10000 + i,
      name: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      eventId,
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate(),
      }),
      checkIn: faker.helpers.arrayElement<
        Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
      >([
        undefined,
        {
          create: {
            createdAt: faker.date.recent({ days: 7 }),
          },
        },
      ]),
    })
  }
  await Promise.all(
    attendeesToInsert.map((data) => {
      return prisma.attendee.create({
        data,
      })
    })
  )
  prisma.$disconnect
}

seed().then(() => console.log('Database seeded!'))
