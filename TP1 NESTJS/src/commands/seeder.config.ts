const users = 5;
const cvsPerUser = 3;
const skillsPerCv = 3;

export const cfg = {
  users,
  cvsPerUser,
  skillsPerCv,
  skills: users * cvsPerUser * skillsPerCv,
};
