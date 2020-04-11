import { userRoles, teacherRoleValue } from '../constants/common-constants';

export const getAccessibleUserRoles = currentUserRole => userRoles.filter(userRole => (userRole.value < teacherRoleValue) && userRole.value > currentUserRole);
