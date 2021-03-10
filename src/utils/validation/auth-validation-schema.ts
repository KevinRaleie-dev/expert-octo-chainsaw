import * as yup from 'yup';

const authSchema = yup.object().shape({
  email: yup.string().email().max(255).required(),
  firstName: yup.string().max(100),
  lastName: yup.string().max(100),
  password: yup.string().min(6).max(100).required(),
});

export { authSchema };
