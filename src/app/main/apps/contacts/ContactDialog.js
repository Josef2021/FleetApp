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
  // name: yup.string().required("You must enter a name"),
  plateNumber: yup.string().required('You must enter a plate number'),
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

  const id = watch('id');
  const plateNumber = watch('plateNumber');
  // const name = watch("name");
  // const avatar = watch("avatar");

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
        <div className='flex flex-col items-center justify-center pb-24'>
          {/* <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} /> */}
          {contactDialog.type === 'edit' && (
            <Typography variant='h6' color='inherit' className='pt-8'>
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
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div> */}
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

          <div className='flex'>
            {/* <div className="min-w-48 pt-20" /> */}

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

          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div> */}
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

          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div> */}
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

          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div> */}
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
          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div> */}
            <Controller
              control={control}
              name='totalCost'
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-24'
                  label='Total cost'
                  id='totalCost'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </div>

          <div className='flex'>
            {/* <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div> */}
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

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Job title"
                  id="jobTitle"
                  name="jobTitle"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Address"
                  id="address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
          </div> */}
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
