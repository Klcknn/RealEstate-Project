import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./admin-reset.scss";
import { resetDatabase } from "../../../../api/settings-service";
import { prettyDialog } from '../../../../helpers/function/toast-confirm';  // Import prettyDialog
import { PiHandPalmDuotone } from 'react-icons/pi';
import { TbFaceIdError } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from '../../../../store/providers/toast-provider';

const AdminReset = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleDelete = () => {
    prettyDialog({
      message: 'Once you reset a database, there is no going back.Are you sure to reset the database?',
      icon: <PiHandPalmDuotone size={50} />,
      handleAccept: () => handleConfirmDelete(),
      handleReject: () => {
        showToast({
          severity: 'warn',
          summary: 'Canceled',
          detail: 'Database not reset',
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const resp = await resetDatabase();
      showToast({
        severity: 'success',
        summary: 'Reset database',
        detail: 'Database reset successfully',
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
    } catch (err) {
      const errMsg = err.response.message;
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="admin-reset-container">
      <Row className="admin-reset-title-row">
        <h6 className="h4">Reset Database</h6>
      </Row>
      <Row className="admin-reset-description-row mb-3">
        <div className="span">
          You are about to delete all records except those whose built-in fields are true. Please be certain.
        </div>
      </Row>
      <Row className="admin-reset-button-row">
        <Button className="admin-reset-button" onClick={handleDelete}>
          Reset Database
        </Button>
      </Row>
    </Container>
  );
};

export default AdminReset;
