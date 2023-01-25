import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required!")
    .email("Please provide valid email address!"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  username: yup.string().required("This field is required!"),
});

export default loginSchema;
