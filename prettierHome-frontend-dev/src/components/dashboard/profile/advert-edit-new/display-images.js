import React, { useRef, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { deleteImageByIds, updateImageById } from "../../../../api/image-service";
import { useToast } from "../../../../store/providers/toast-provider";
import "./display-images.scss";

const DisplayImages = ({ display, setDisplay, advertId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(null);
  const { showToast } = useToast();

  const toggleImageSelection = (image) => {
    // resim nesnesini al
    const isSelected = selectedImages.includes(image);

    if (isSelected) {
      setSelectedImages((prev) => prev.filter((item) => item !== image));
    } else {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteImageByIds(selectedImages.map((item) => item.id));
      setDisplay(display.filter((item) => !selectedImages.includes(item)));
      setSelectedImages([]);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };
  const updateFeatured = (resp) => {
    setDisplay((prev) => {
      return prev.map((item) => {
        if (item.featured) {
          item.featured = false;
        }
        if (item.id === resp.id) {
          item.featured = true;
        }
        return item;
      });
    });
  };

  const handlefeatured = async () => {
    const payload = {
      imgId: selectedImages[0].id,
      advertId: advertId,
    };
    try {
      const resp = await updateImageById(payload);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Featured image updated successfully",
        life: 3000,
        icon: "pi pi-check-circle",
      });

      updateFeatured(resp);
      setSelectedImages([]);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };
  return (
    <Container className="display-image">
      <div className="display-wrapper">
        <Row className="display-area row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
          {display.map((image, index) => (
            <Col key={index} className="image-col">
              <div className={`img-wrapper ${image.featured && "featured"}`}>
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image)}
                    onChange={() => toggleImageSelection(image)}
                  />
                  <span className="checkmark"></span>
                  <Image
                    fluid
                    src={`data:${image.type};base64, ${image.data}`}
                    onClick={() => setOpen(index + 1)}
                    draggable={false}
                  />
                </label>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="display-image-buttons">
        <div className="button-wrapper">
          <Button
            disabled={selectedImages.length !== 1}
            onClick={handlefeatured}
            variant="danger"
          >
            Set Featured
          </Button>

          <Button
            disabled={selectedImages.length === 0}
            onClick={handleDelete}
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default DisplayImages;
