import { useEffect, useState } from "react";
import Spacer from "../../../components/common/spacer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonComponent from "../../../components/common/button-component";
import { useToast } from "../../../store/providers/toast-provider";
import { useSelector } from "react-redux";
import AdminCategoryEditCommon from "../../../components/dashboard/admin/categories/admin-category-edit";
import { deleteCategory, updateCategory } from "../../../api/categories-service";
import { useNavigate } from "react-router-dom";
import PropertyKeyList from "../../../components/dashboard/admin/categories/property-key-list";
import PropertyKeyNewPage from "../../../components/dashboard/admin/categories/property-key-new-page";
import { Fieldset } from "primereact/fieldset";
import PropertyKeyEditPage from "../../../components/dashboard/admin/categories/property-key-edit-page";
import "./admin-category-edit-page.scss"
import { MdEditNote } from "react-icons/md";

const AdminCategoryEditPage = () => {
  // State
  const { currentRecord, componentMode } = useSelector(state => state.misc);

  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const { showToast } = useToast();
  const [isAddedOrEdited, setIsAddedOrEdited] = useState(false);
  const navigate = useNavigate();


  const handleParentStateChange = () => {
    setIsAddedOrEdited(!isAddedOrEdited);
  };

  // Formik
  const initialValues = {
    ...currentRecord
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter a title")
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title can be at most 150 characters"),
    icon: Yup.string()
      .required("Enter an icon")
      .max(50, "İcon can be at most 50 characters"),
    seq: Yup.number()
      .required("Enter a sequence")
      .positive("Sequence must be positive")
  });

  const onSubmit = async (values) => {

    setLoading(true);
    const payload = {
      ...values
    };

    try {
      await updateCategory(currentRecord.id, payload);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Category updated successfully",
        life: 3000,
      });
      navigate("/dashboard/categories");
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];

      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(currentRecord.id);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Category is deleted successfully",
        life: 3000,
      });
      navigate("/dashboard/categories");
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error!",
        detail: Object.values(err.response.data),
        life: 3000,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    setFlag(true); // No need to fetch category data, just set the flag to true
    if (!currentRecord) {
      setFlag(false);
      navigate("/dashboard/categories");
    }
  }, []);

  return (
    <>
      {flag && (
        <Container className="category-edit-page-container">
          <Row className="g-3 category-edit-page-row1 m-0">
            <Col xl={7} className="col-bir">
              <Form noValidate onSubmit={formik.handleSubmit} className="col-bir-form">
                <AdminCategoryEditCommon formik={formik} />
                <Spacer minHeight={5} />
                <Container className="button-component" >
                  <ButtonComponent 
                    className="btn-component"
                    formik={formik}
                    loading={loading}
                    type="submit"
                    text="UPDATE"
                    style={{ borderRadius: "10px", padding: "5px 45px" }}
                  >
                  <MdEditNote style={{marginTop:"-2px", fontSize:"1.3rem"}} />
                  </ButtonComponent>
                  <Button
                    onClick={handleDelete}
                    style={{ borderRadius: "10px", padding: "10px 55px", marginLeft: "10px", backgroundColor:"#8cb1c8", border:"none" }}
                  >
                    DELETE
                  </Button>
                </Container>
              </Form>
            </Col>
            <Col xl={5}>
           
              <Container>
                <PropertyKeyList id={currentRecord.id} isAddedOrEdited={isAddedOrEdited}/>
              </Container>
            
            </Col>
          </Row>
          <Spacer minHeight={25} />
          <Row className="category-edit-page-row2 m-0">
            <Container className="new-edit-fielset">
              {componentMode === "new" &&
                (<Fieldset legend="Property Key Add" toggleable collapsed={false}>
                    <PropertyKeyNewPage isAddedOrEdited={isAddedOrEdited} onStateChange={handleParentStateChange}/>
                </Fieldset>)
              }
            </Container>
            <Container className="new-edit-fielset">
              {componentMode === "edit" &&
                (<Fieldset legend="Property Key Edit" toggleable collapsed={false}>
                    <PropertyKeyEditPage  isAddedOrEdited={isAddedOrEdited} onStateChange={handleParentStateChange}/>
                </Fieldset>)
              }
            </Container>
          </Row>
          <Spacer minHeight={50} />
        </Container>
      )}
    </>
  );
};

export default AdminCategoryEditPage;
