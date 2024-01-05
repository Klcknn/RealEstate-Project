import React from 'react'
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import MyAdverts from '../../../components/dashboard/profile/my-adverts';

const MyAdvertsPage = () => {
  return (
    <>
      <PageHeader title="MY ADVERTS" />
      <Spacer minHeight={50} />
      <MyAdverts/>
      <Spacer />
    </>
  );
}

export default MyAdvertsPage; 