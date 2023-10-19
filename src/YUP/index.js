/* eslint-disable */ 
import * as yup from 'yup';

const formErrors = {
    notValidPassword: 'The password must contain one special character, one uppercase character, one number!'
}
export const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: 
    yup.string()
    .min(6)
    .max(40)
    .required(),
    // .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,40}/, formErrors.notValidPassword)
});

export const SignUpSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string()
        .min(6)
        .max(40)
        .required(),
        // .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,40}/, formErrors.notValidPassword ), ru
    password2: yup.string()
        .min(6)
        .max(40)
        .required(),
        // .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,40}/, formErrors.notValidPassword )
});

export const CreateArticleSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    body: yup.string(),
     
    tags: yup.string()
        
});

export const EditProfileSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),

    image: yup.string().required(),
});


