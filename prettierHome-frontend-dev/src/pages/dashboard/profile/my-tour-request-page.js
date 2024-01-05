import React from 'react'
import MyTourRequest from '../../../components/dashboard/profile/my-tour-request';
import Spacer from '../../../components/common/spacer';
import PageHeader from '../../../components/common/page-header';

const MyTourRequestPage = () => {
  return (
    <>
      <PageHeader title="MY TOUR REQUEST" />
      <Spacer minHeight={50} />
      <MyTourRequest/>
      <Spacer />
    </>
  )
}

export default MyTourRequestPage;