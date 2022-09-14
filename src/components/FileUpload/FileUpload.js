import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { useAppContext } from '../../utils';
import styles from './FileUpload.module.css';

const cx = className.bind(styles);

const FileUpload = forwardRef(
    ({ className, onChange, onRejected, onRemove, fileRejections }, ref) => {
        const { state } = useAppContext();
        const { logo } = state.set.form;
        const classed = cx('file-upload-container', className);
        const pathImage = '/images/';
        return (
            <div className={classed}>
                <Pane minWidth='100%'>
                    <FileUploader
                        maxSizeInBytes={50 * 1024 ** 2}
                        maxFiles={1}
                        onChange={onChange}
                        onRejected={onRejected}
                        renderFile={(file) => {
                            const { name, size, type } = file;
                            const fileRejection = fileRejections.find(
                                (fileRejection) => fileRejection.file === file
                            );
                            const { message } = fileRejection || {};
                            return (
                                <FileCard
                                    key={name}
                                    isInvalid={fileRejection != null}
                                    name={
                                        name || logo[0].replace(pathImage, '')
                                    }
                                    onRemove={onRemove}
                                    sizeInBytes={size || 20000}
                                    type={type}
                                    validationMessage={message}
                                />
                            );
                        }}
                        values={logo}
                        ref={ref}
                    />
                </Pane>
            </div>
        );
    }
);

FileUpload.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    onRejected: PropTypes.func,
    onRemove: PropTypes.func,
    fileRejections: PropTypes.array,
};

export default FileUpload;
