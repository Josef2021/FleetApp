import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
    email: '',
};

function ForgotPasswordTab() {

    const { control, formState, handleSubmit, reset, setError } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit(model) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, model.email).then(() => {
            alert("Plese check your email and enter a new password")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        reset(defaultValues);
    }

    return (
        <div className="w-full">
            <form
                name="recoverForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-16"
                            label="Email"
                            autoFocus
                            type="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />

                <Button
                    variant="contained"
                    color="primary"
                    className="w-224 mx-auto mt-16"
                    aria-label="Reset"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                >
                    Send reset link
                </Button>
            </form>

        </div>
    );
}

export default ForgotPasswordTab;
