import React from 'react';
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { BsPersonVcard } from 'react-icons/bs';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { AiOutlineDelete } from 'react-icons/ai';
import ProfileForm from '../../../components/dashboard/profile/password-profile/profile-form';
import ChangePasswordForm from '../../../components/dashboard/profile/password-profile/change-password-form';
import DeleteAccount from '../../../components/dashboard/profile/password-profile/delete-account';
import ProfilePhoto from '../../../components/dashboard/profile/password-profile/profile-photo';
import './my-profile-page.scss';

const MyProfilePage = () => {
  return (
    <>
      <PageHeader title="MY PROFILE" />
      <Spacer minHeight={30} />
      <Container className='profile-page-container'>
        <Tabs
          defaultActiveKey='profile'
          className='p-p-tabs mb-3'
          justify={true}
        >
          <Tab eventKey='profile' title={<><BsPersonVcard /> <p>Profile</p></>}>
            <ProfileForm />
          </Tab>
          <Tab
            eventKey='change-password'
            title={<><LiaExchangeAltSolid /> <p>Change Password</p></>}
          >
            <ChangePasswordForm />
          </Tab>
          <Tab
            eventKey='profile-photo'
            title={<><MdOutlineAddAPhoto /> <p>Profile Photo</p></>}
          >
            <ProfilePhoto />
          </Tab>
          <Tab
            eventKey='delete-account'
            title={<><AiOutlineDelete /> <p>Delete Account</p></>}
          >
            <DeleteAccount />
          </Tab>
        </Tabs>
      </Container>
      <Spacer minHeight={30} />
    </>
  );
};

export default MyProfilePage;
