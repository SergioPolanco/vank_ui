import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, LinearProgress } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import { Select } from 'formik-mui';
import { updateUser, fetchUser } from '../services/user.service';
import UpdateUserSchema from '../schemas/update-user.schema';
import { openNotification } from '../../notification/redux/notificationSlice';
import { CURRENCIES } from '../../common/constants/currency';

interface Values {
  tributaryId: string;
  currency: string;
}

interface UserInfo extends Values {
  companyName: string;
}

const UserDetail = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    tributaryId: '',
    currency: '',
    companyName: '',
  });
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleOnSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const { tributaryId, currency } = values;
    const body = {
      ...(tributaryId && { tributaryId }),
      ...(currency && { currency }),
    };

    try {
      await updateUser(id as string, body);
      dispatch(
        openNotification({
          severity: 'success',
          message: 'Updated',
        }),
      );
      setSubmitting(false);
    } catch (error) {
      dispatch(
        openNotification({
          severity: 'error',
          message: 'An error has occurred',
        }),
      );
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUserWrapper = async () => {
      try {
        const response = await fetchUser(id as string);
        setUserInfo({
          tributaryId: response.data.tributaryId,
          currency: response.data.currency,
          companyName: response.data.companyName,
        });
      } catch (error) {
        openNotification({
          severity: 'error',
          message: 'Error retrieving user information',
        });
      }
    };
    fetchUserWrapper();
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        tributaryId: userInfo.tributaryId,
        currency: userInfo.currency,
      }}
      validationSchema={UpdateUserSchema}
      onSubmit={handleOnSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Box marginBottom={3}>
            <Typography variant="h4" gutterBottom component="div">
              {userInfo.companyName.toUpperCase()}
            </Typography>
          </Box>
          <Grid container direction="column" spacing={2}>
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
                component={Select}
                formHelperText={{
                  children: 'What currency do you want to use?',
                }}
                id="currency"
                name="currency"
                labelId="currency-label"
                label="Currency"
              >
                {Object.keys(CURRENCIES).map((key) => (
                  <MenuItem
                    key={`currency-option-${CURRENCIES[key as CURRENCIES]}`}
                    value={CURRENCIES[key as CURRENCIES]}
                  >
                    {CURRENCIES[key as CURRENCIES]}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          </Grid>
          {isSubmitting && <LinearProgress />}
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserDetail;
