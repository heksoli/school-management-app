import { faker } from '@faker-js/faker';
import { Day, PrismaClient, SexType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      username: faker.internet.userName().toLowerCase()
    }
  });
  await prisma.admin.create({
    data: {
      username: faker.internet.userName().toLowerCase()
    }
  });

  // GRADE
  for (let i = 1; i <= 10; i++) {
    await prisma.grade.create({
      data: {
        level: i
      }
    });
  }
  const grades = await prisma.grade.findMany();

  // CLASS
  for (let i = 1; i <= 12; i++) {
    for (const j of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
      await prisma.class.create({
        data: {
          name: `${i}${j}`,
          gradeId: grades[i % grades.length].id,
          capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15
        }
      });
    }
  }
  const classes = await prisma.class.findMany();

  // SUBJECT
  const subjectData = [
    { name: 'Mathematics' },
    { name: 'Science' },
    { name: 'English' },
    { name: 'History' },
    { name: 'Geography' },
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Biology' },
    { name: 'Computer Science' },
    { name: 'Art' }
  ];
  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }
  const subjects = await prisma.subject.findMany();

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    const sex = i % 2 === 0 ? SexType.male : SexType.female;

    const name = faker.person.firstName(sex);
    const surname = faker.person.lastName(sex);

    await prisma.teacher.create({
      data: {
        username: faker.internet.userName({ firstName: name, lastName: surname }).toLowerCase(),
        name,
        surname,
        email: faker.internet
          .email({
            firstName: name,
            lastName: surname,
            provider: 'gmail.com'
          })
          .toLowerCase(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true),
        bloodType: 'A+',
        sex,
        subjects: { connect: [{ id: subjects[i % subjects.length].id }] },
        classes: { connect: [{ id: classes[i % classes.length].id }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30))
      }
    });
  }
  const teachers = await prisma.teacher.findMany();

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[
          Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: subjects[i % subjects.length].id,
        classId: classes[i % classes.length].id,
        teacherId: teachers[i % 15].id
      }
    });
  }
  const lessons = await prisma.lesson.findMany();

  // PARENT
  for (let i = 1; i <= 25; i++) {
    const sex = i % 2 === 0 ? SexType.male : SexType.female;
    const name = faker.person.firstName(sex);
    const surname = faker.person.lastName(sex);

    await prisma.parent.create({
      data: {
        username: faker.internet.userName({ firstName: name, lastName: surname }).toLowerCase(),
        name,
        surname,
        sex,
        email: faker.internet
          .email({
            firstName: name,
            lastName: surname,
            provider: 'gmail.com'
          })
          .toLowerCase(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true)
      }
    });
  }
  const parents = await prisma.parent.findMany();

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    const sex = i % 2 === 0 ? SexType.male : SexType.female;
    const name = faker.person.firstName(sex);
    const surname = faker.person.lastName(sex);

    await prisma.student.create({
      data: {
        username: faker.internet.userName({ firstName: name, lastName: surname }).toLowerCase(),
        name,
        surname,
        email: faker.internet
          .email({
            firstName: name,
            lastName: surname,
            provider: 'gmail.com'
          })
          .toLowerCase(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true),
        bloodType: 'O-',
        sex,
        parentId: parents[Math.ceil(i / 2) % 25 || 24].id,
        gradeId: grades[i % grades.length].id,
        classId: classes[i % classes.length].id,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10))
      }
    });
  }
  const students = await prisma.student.findMany();

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: lessons[i % 30].id
      }
    });
  }
  const exams = await prisma.exam.findMany();

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `${faker.science.chemicalElement().name} ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: lessons[i % lessons.length].id
      }
    });
  }
  const assignments = await prisma.assignment.findMany();

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: students[i - 1].id,
        ...(i <= 5
          ? { examId: exams[i].id }
          : { assignmentId: assignments[i % assignments.length].id })
      }
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: students[i % students.length].id,
        lessonId: lessons[i % lessons.length].id
      }
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${faker.lorem.words(5)}`,
        description: faker.lorem.paragraph(3),
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        endDate: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: classes[i % classes.length].id
      }
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${faker.lorem.words(5)}`,
        description: faker.lorem.paragraph(3),
        date: new Date(),
        classId: classes[i % classes.length].id
      }
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
