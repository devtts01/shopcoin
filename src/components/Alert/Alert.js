import Alert from '@mui/material/Alert';
import React from 'react';
import { actions } from '../../app/';
import { alertUtils, useAppContext } from '../../utils';

export default function AlertCp() {
    const { state, dispatch } = useAppContext();
    const { del, upd, cre, error } = state.set.message;
    const { alertModal } = state.toggle;
    const closeAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    return (
        <>
            {(del || upd || cre || error) && alertModal && (
                <Alert
                    severity={error ? 'error' : 'success'}
                    className='mb8'
                    onClose={closeAlert}
                >
                    {del ? del : upd ? upd : cre ? cre : error}
                </Alert>
            )}
        </>
    );
}
