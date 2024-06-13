
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ListPermissionTypeComponent } from './components/permissionType/listtype.component'
import { CreatePermissionTypeComponent } from './components/permissionType/createtype.component'
import { EditPermissionTypeComponent } from './components/permissionType/edittype.component'
import { ListPermissionComponent } from './components/permission/list.component'
import { EditPermissionComponent } from './components/permission/edit.componente'
import { CreatePermissionComponent } from './components/permission/create.componente'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListPermissionTypeComponent />} />
        <Route path='/createpermissiontype' element={<CreatePermissionTypeComponent />} />
        <Route path='/editpermissiontype/:id' element={<EditPermissionTypeComponent />} />
        <Route path='/listpermission' element={<ListPermissionComponent />} />
        <Route path='/editpermission/:id' element={<EditPermissionComponent />} />
        <Route path='/createpermission' element={<CreatePermissionComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
