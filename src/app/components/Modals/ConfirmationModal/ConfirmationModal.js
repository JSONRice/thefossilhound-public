import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../Modal";
import { ModalBottomButtonGroup } from "../ModalBottomButtonGroup";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  max-width: 400px;
`;

const StyledModalBottomButtonGroup = styled(ModalBottomButtonGroup)`
  display: flex;
  justify-content: flex-end;
`;

const Children = styled.div`
  padding: 20px;
`;

export const ConfirmationModal = ({
  heading,

  disabledConfirmButton,
  disabledCancelButton,

  confirmButtonText,
  cancelButtonText,

  confirmButtonLoading,
  confirmButtonLoadingLabel,

  onConfirm,
  onCancel,

  confirmButtonQAHook,
  cancelButtonQAHook,

  children
}) => {
  return (
    <StyledModal heading={heading} onClose={onCancel}>
      <Children>{children}</Children>
      <StyledModalBottomButtonGroup>
        <SecondaryButton disabled={disabledCancelButton} onClick={onCancel} autoFocus data-qa={cancelButtonQAHook}>
          {cancelButtonText}
        </SecondaryButton>
        <PrimaryButton
          disabled={disabledConfirmButton}
          loading={confirmButtonLoading}
          loadingLabel={confirmButtonLoadingLabel}
          onClick={onConfirm}
          data-qa={confirmButtonQAHook}
        >
          {confirmButtonText}
        </PrimaryButton>
      </StyledModalBottomButtonGroup>
    </StyledModal>
  );
};

ConfirmationModal.propTypes = {
  heading: PropTypes.string,

  disabledConfirmButton: PropTypes.bool,
  disabledCancelButton: PropTypes.bool,

  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,

  onConfirm: PropTypes.func,
  onCancel: Modal.propTypes.onClose,

  confirmButtonQAHook: PropTypes.string,
  cancelButtonQAHook: PropTypes.string
};

ConfirmationModal.defaultProps = {
  cancelButtonText: "Cancel",
  confirmButtonText: "Save",
  heading: "Are you sure?"
};
