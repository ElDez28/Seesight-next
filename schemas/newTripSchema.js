import * as yup from "yup";

const newTripSchema = yup.object().shape({
  imageCover: yup.mixed().required("You have to provide images"),
  imageOne: yup.mixed().required("You have to provide images"),
  imageTwo: yup.mixed().required("You have to provide images"),
  imageThree: yup.mixed().required("You have to provide images"),
  imageFour: yup.mixed().required("You have to provide images"),
});

export default newTripSchema;
