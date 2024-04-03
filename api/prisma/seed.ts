import { prisma } from '../src/lib/prima'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'a2f8809f-a6b7-4ec4-a5d0-7f0e4558a0fc',
      title: 'Unite Summit',
      slug: 'united-summit',
      details: 'Um evento para quem é apaixonado por programação',
      maximumAttendees: 10,
    },
  })
  await prisma.attendee.createMany({
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        createdAt: '2024-04-03T16:48:37.072Z',
        eventId: 'a2f8809f-a6b7-4ec4-a5d0-7f0e4558a0fc',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@email.com',
        createdAt: '2024-04-03T16:48:52.555Z',
        eventId: 'a2f8809f-a6b7-4ec4-a5d0-7f0e4558a0fc',
      },
    ],
  })
  await prisma.checkIn.create({
    data: {
      id: 1,
      attendeeId: 1,
      createdAt: '2024-04-03T16:49:26.403Z',
    },
  })
  prisma.$disconnect()
}

seed().then(() => console.log('Database seeded!'))
