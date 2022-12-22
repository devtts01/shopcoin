import React, { useEffect } from 'react';

export default function LiveChatUser() {
    useEffect(() => {
        document.title = `Live Chat | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return <></>;
}
