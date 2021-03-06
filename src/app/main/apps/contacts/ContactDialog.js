import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from './store/contactsSlice';

const defaultValues = {
  id: '',
  brand: '',
  model: '',
  plateNumber: '',
  assignedStatus: '',
  vehicleStatus: '',
  totalCost: '',
  mileage: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  plateNumber: yup.string().required("You must enter a plate number"),
});

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(
    ({ contactsApp }) => contactsApp.contacts.contactDialog
  );

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const id = watch("id");
  const plateNumber = watch("plateNumber");
  
  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit'
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }
  const assignedStatusOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const vehicleStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'inShop', label: 'In shop' },
  ];

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={0}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {contactDialog.type === 'new'
              ? 'New Vehicle'
              : 'Edit Vehicle Information'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {contactDialog.type === "edit" && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {plateNumber}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:overflow-hidden'
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <Controller
              control={control}
              name='brand'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Brand'
                  id='brand'
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant='outlined'
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name='model'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Model'
                  id='model'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name='plateNumber'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Plate number'
                  id='plateNumber'
                  variant='outlined'
                  error={!!errors.plateNumber}
                  helperText={errors?.plateNumber?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name='assignedStatus'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Assigned Status'
                  id='assignedStatus'
                  variant='outlined'
                  fullWidth
                  select
                >
                  {assignedStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name='vehicleStatus'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Vehicle Status'
                  id='vehicleStatus'
                  variant='outlined'
                  fullWidth
                  select
                >
                  {vehicleStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className="flex">
            <Controller
              control={control}
              name='serviceCost'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Service cost'
                  id='serviceCost'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </div>
          <div className="flex">
            <Controller
              control={control}
              name='fuelCost'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Fuel cost'
                  id='fuelCost'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name='mileage'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Mileage'
                  id='mileage'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className='justify-between p-4 pb-16'>
            <div className='px-16'>
              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className='justify-between p-4 pb-16'>
            <div className='px-16'>
              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove} size='large'>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ContactDialog;
