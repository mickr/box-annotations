import React from 'react';
import { getFormattedCommentText } from 'box-ui-elements/es/components/form-elements/draft-js-mention-selector';
import { KEYS } from 'box-ui-elements/es/constants';
import { EditorState } from 'draft-js';
import { Form, FormikProps } from 'formik';
import { useIntl } from 'react-intl';
import messages from '../Popups/messages';
import ReplyField from '../ReplyField';
import { FormValues, PropsFromState as ContainerProps } from './ReplyFormContainer';

export type ReplyFormProps = {
    isPending: boolean;
    onCancel: (text: string) => void;
    onChange: (text: string) => void;
    onSubmit: (text: string) => void;
    value?: string;
};

export type Props = ReplyFormProps &
    ContainerProps &
    Pick<FormikProps<FormValues>, 'errors' | 'setFieldValue' | 'values'>;

const ReplyForm = ({ isPending, onCancel, onChange, setFieldValue, values }: Props): JSX.Element => {
    const intl = useIntl();
    const { editorState } = values;

    // Instead of deferring to the Formik handleChange helper, we need to use the setFieldValue helper
    // method in order for DraftJS to work correctly by setting back the whole editorState
    const handleChange = (nextEditorState: EditorState): void => {
        onChange(getFormattedCommentText(nextEditorState).text);
        setFieldValue('editorState', nextEditorState);
    };
    const handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key !== KEYS.escape) {
            return;
        }

        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        onCancel(getFormattedCommentText(editorState).text);
    };

    return (
        <Form className="ba-ReplyForm" data-testid="ba-ReplyForm" onKeyDown={handleKeyDown}>
            <div className="ba-Popup-main">
                <ReplyField
                    className="ba-Popup-field"
                    data-testid="ba-Popup-field"
                    editorState={editorState}
                    isDisabled={isPending}
                    onChange={handleChange}
                    placeholder={intl.formatMessage(messages.fieldPlaceholder)}
                />
            </div>
            <div className="ba-Popup-footer" />
        </Form>
    );
};

export default ReplyForm;
