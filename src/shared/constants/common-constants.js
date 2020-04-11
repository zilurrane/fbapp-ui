export const subjectParameters = [{ value: 'TH', label: 'Theory' }, { value: 'PR', label: 'Practical' }];

export const studentGenerationDefaults = {
  minRollNumber: 1,
  maxRollNumber: 60,
};

export const userRoles = [
  { value: 1, label: 'SuperAdmin' },
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Principal' },
  { value: 4, label: 'Teacher' },
  { value: 5, label: 'Student' },
];

export const userRolesMap = {
  1: 'SuperAdmin',
  2: 'Admin',
  3: 'Principal',
  4: 'Teacher',
  5: 'Student',
};

export const studentRoleValue = 5;

export const teacherRoleValue = 4;
