import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllImagesByAdvertId } from "../../../../api/adverts-service";
import "./advert-image.scss";
import { Galleria } from 'primereact/galleria';
import {Container } from "react-bootstrap";
import { useToast } from "../../../../store/providers/toast-provider";
import { TbFaceIdError } from "react-icons/tb";

const AdvertImage = () => {
  const { advertsCurrentRecord } = useSelector((state) => state.misc);
  const id = advertsCurrentRecord?.id;
  const [images, setImages] = useState([]);
  const { showToast } = useToast();

  const fetchData = async (id) => {
    try {
      const images = await getAllImagesByAdvertId(id);
      setImages(images);
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError  size={50} />,
      });
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const responsiveOptions = [
    {

      breakpoint: '1245px',
      numVisible: 4
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: '415px',
      numVisible: 2
    }

  ];

  const itemTemplate = (item) => {
    return (
      <img
        className="item-template-image"
        src={`data:${item.type};base64, ${item.data}`}
        alt={item.name}
        
      />
    );
  };
  const thumbnailTemplate = (item) => {
    return (
      <img
        className="thumbnail-image"
        src={`data:${item.type};base64, ${item.data}`}
        alt={`Thumbnail ${item.name}`}

       

      />
    );
  };

  return (
    <Container className="advert-images-container">
      <Galleria
        className="galleria"
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </Container>
  );
};

export default AdvertImage;
