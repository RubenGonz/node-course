
export const getAge = (birthdate:Date) => {
    
  return new Date().getFullYear() - birthdate.getFullYear();
}