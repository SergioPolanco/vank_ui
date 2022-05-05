import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  companyName: Yup.string().required(),
  internalCode: Yup.number().required(),
  tributaryId: Yup.string().required(),
  apiCalls: Yup.number().required(),
  currency: Yup.string().required(),
  banks: Yup.array().of(Yup.number()).min(1),
});

export default RegistrationSchema;
