import faker from 'faker';

export const generateUsers = () => {
  const users = [];
  for (let i = 0; i < 160; i++) {
    const user = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      dateOfBirth: faker.date.between('1950-01-01', '2003-12-31'),
      startDate: faker.date.between('2010-01-01', '2023-05-04'),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      department: faker.commerce.department()
    };
    users.push(user);
  }
  return users;
};

export const users = generateUsers();
console.log(users);
