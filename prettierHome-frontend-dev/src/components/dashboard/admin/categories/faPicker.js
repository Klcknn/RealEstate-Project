import * as React from 'react';
import IconPicker from './piker';

const icons = [
  'fas fa-home',
  'fas fa-building',
  'fas fa-city',
  'fas fa-industry',
  'fas fa-store',
  'fas fa-hotel',
  'fas fa-landmark',
  'fas fa-warehouse',
  'fas fa-store-alt',
  'fas fa-house-user',
  'fas fa-archway',
  'fas fa-car',
  'fas fa-coffee',
  'fas fa-tree',
  'fas fa-mountain',
  'fas fa-sun',
  'fas fa-moon',
  'fas fa-plane',
  'fas fa-train',
  'fas fa-bus',
  'fas fa-bicycle',
  'fas fa-ship',
  'fas fa-umbrella',
  'fas fa-heart',
  'fas fa-font-awesome',
];


const FaPicker = ({formik, defaultValue}) => {


  return (<>
    <IconPicker 
      icons={icons} 
      defaultValue= {defaultValue || "fas fa-camera" }
      onChange={(icon) => {
        formik.setFieldValue('icon', icon);
      }}
    />
  </>);
}
export default FaPicker;