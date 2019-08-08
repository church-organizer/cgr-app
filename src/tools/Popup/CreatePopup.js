import React from 'react';
import './popup.css'
import {useSnackbar} from 'notistack';


const CreatePopup = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = variant => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a warning message!', { variant });
    };

    handleClick();
    return <br/>;
};

export default CreatePopup;
