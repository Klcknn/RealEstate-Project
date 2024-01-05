import React from 'react';
import AdminUserDeleteAndSave from '../../../components/dashboard/admin/admin-user-edit/admin-user-delete-save';
import Spacer from '../../../components/common/spacer';
import { Fieldset } from 'primereact/fieldset';
import AdminUserAdvertsProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-adverts-property';
import AdminUserTourRequestProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-tour-request-property';
import AdminUserFavoritesProperty from '../../../components/dashboard/admin/admin-user-edit/admin-user-favorites-property';
import "../admin/field-set.scss"
import AdminUserLogs from '../../../components/dashboard/admin/admin-user-edit/admin-user-logs';
const AdminUserEditPage = () => {
  return (
    <>
    <AdminUserDeleteAndSave/>
    <Spacer minHeight={50}/>
    <Fieldset className="admin-user-edit-field-set"  legend="Adverts" toggleable>
    <AdminUserAdvertsProperty/>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset className="admin-user-edit-field-set" legend="Tour Request" toggleable>
    <AdminUserTourRequestProperty/>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset className="admin-user-edit-field-set" legend="Favorites" toggleable>
    <AdminUserFavoritesProperty/>
</Fieldset>
<Spacer minHeight={50}/>
<Fieldset className="admin-user-edit-field-set" legend="Logs" toggleable>
    <AdminUserLogs/>
</Fieldset>
<Spacer minHeight={50}/>
  
    </>
  )
}

export default AdminUserEditPage