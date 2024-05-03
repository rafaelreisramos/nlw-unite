import { prisma } from '../src/lib/prisma'

const MAXIMUM_ATTENDEES = 123

async function seed() {
  await prisma.event.deleteMany()
  const eventId = 'a2f8809f-a6b7-4ec4-a5d0-7f0e4558a0fc'
  await prisma.event.create({
    data: {
      id: eventId,
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para quem é apaixonado por programação',
      maximumAttendees: MAXIMUM_ATTENDEES,
    },
  })
  prisma.$disconnect
}

seed().then(() => console.log('Event Unite Summit seeded!'))
