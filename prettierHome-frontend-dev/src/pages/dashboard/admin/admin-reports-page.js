import React from 'react';
import Spacer from '../../../components/common/spacer';
import AdminAdvertsReport from '../../../components/dashboard/admin/reports/admin-adverts-report';
import AdminMostPopularProperties from '../../../components/dashboard/admin/reports/admin-most-popular-properties';
import AdminUsersReport from '../../../components/dashboard/admin/reports/admin-users-report';
import AdminTourRequestsReport from '../../../components/dashboard/admin/reports/admin-tour-requests-report';




const AdminReportsPage = () => {
  return (
    <>
    <Spacer minHeight={50}/>
    <AdminAdvertsReport/>
    <Spacer minHeight={50}/>
    <AdminMostPopularProperties/>
    <Spacer minHeight={50}/>
    <AdminUsersReport/>
    <Spacer minHeight={50}/>
    <AdminTourRequestsReport/>
    <Spacer />
  
    </>
  )
}

export default AdminReportsPage