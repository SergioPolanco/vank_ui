import * as Yup from 'yup';

const UpdateUserSchema = Yup.object().shape({
  tributaryId: Yup.string(),
  currency: Yup.string()
})

export default UpdateUserSchema