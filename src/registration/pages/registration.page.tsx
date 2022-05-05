import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, LinearProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field, FieldArray, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import BankSelector from '../../bank/components/bankSelector';
import { Select as SelectFormik } from 'formik-mui';
import { register } from '../services/registration.service';
import RegistrationSchema from '../schemas/registration.schema';
import { openNotification } from '../../notification/redux/notificationSlice';
import { CURRENCIES } from '../../common/constants/currency';

interface Values {
  companyName: string;
  internalCode: number;
  tributaryId: string;
  apiCalls: number;
  currency: string;
  banks: number[]
}

const Registration = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = async (values: Values, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    const body = {
      ...values,
      internalCode: parseInt(values.internalCode.toString()),
      apiCalls: parseInt(values.apiCalls.toString())
    } 
    try {
      await register(body);
      dispatch(
        openNotification({
          severity: "success",
          message: "User saved"
        })
      )
      setSubmitting(false)
      resetForm()
    } catch (error) {
      dispatch(
        openNotification({
          severity: "error",
          message: "An error has occurred"
        })
      )
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        companyName: '',
        internalCode: 0,
        tributaryId: '',
        apiCalls: 0,
        currency: '',
        banks: [],
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form>
          <Box marginBottom={3}>
            <Typography variant="h4" gutterBottom component="div">
              Registration
            </Typography>
          </Box>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Field
                component={TextField}
                name="companyName"
                type="text"
                label="Company Name"
              />
            </Grid>
            <Grid item>
              <Field
                component={TextField}
                name="internalCode"
                type="text"
                label="Internal code"
              />
            </Grid>
            <Grid item>
              <Field
                component={TextField}
                name="tributaryId"
                type="text"
                label="Tributary Id"
              />
            </Grid>
            <Grid item>
              <Field
                component={TextField}
                name="apiCalls"
                type="text"
                label="Api calls"
              />
            </Grid>
            <Grid item>
              <Field
                component={SelectFormik}
                formHelperText={{ children: 'What currency do you want to use?' }}
                id="currency"
                name="currency"
                labelId="currency-label"
                label="Currency"
              > 
                {
                  Object.keys(CURRENCIES).map(
                    key => (
                      <MenuItem
                        key={`currency-option-${CURRENCIES[key as CURRENCIES]}`}
                        value={CURRENCIES[key as CURRENCIES]}
                      >
                        {CURRENCIES[key as CURRENCIES]}
                      </MenuItem>
                    )
                  )
                }
              </Field>
            </Grid>
            <Grid item>
              <FieldArray
                name="banks"
                render={arrayHelper => (
                  <BankSelector
                    labelText='Banks'
                    name="banks"
                    banksSelected={values.banks}
                    arrayHelper={arrayHelper}
                  />
                )}
              />
            </Grid>
          </Grid>
          {isSubmitting && <LinearProgress />}
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Registration
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Registration