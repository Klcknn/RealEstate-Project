import React from 'react'
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import MyFavorites from '../../../components/dashboard/profile/my-favorites'

const MyFavoritesPage = () => {
  return (
    <>
    <PageHeader title="MY FAVORITES" />
    <Spacer minHeight={50} />
    <MyFavorites/>
    <Spacer />
  </>
  )
}

export default MyFavoritesPage