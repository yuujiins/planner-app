import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export const showAlert = (title, message, yesCallback, noCallback) => {
    const options = {
        title: title,
        message: message,
        buttons: [
            {
                label: 'Yes',
                onClick: yesCallback
            },
            {
                label: 'No',
                onClick: noCallback
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options)
}