import { useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { IPermission } from "../../assets/interface/IPermission";

export function ListPermissionComponent() {
    // const [permission, setPermission] = useState<IPermission[]>([])
    const [permission, setPermission] = useState<IPermission[]>([]);
    const [permissionTypes, setPermissionTypes] = useState<Map<string, string>>(new Map());

    const getPermission = async () => {
        const response = await fetch(`${appsettings.apiUrl}permission/getall`);
        if (response.ok) {
            const data = await response.json();
            setPermission(data);

            // Fetch permission types descriptions
            const permissionTypeMap = new Map();
            for (const item of data) {
                if (!permissionTypeMap.has(item.tipoPermiso)) {
                    const typeResponse = await fetch(`${appsettings.apiUrl}permissionTypes/${item.tipoPermiso}`);
                    if (typeResponse.ok) {
                        const typeData = await typeResponse.json();
                        permissionTypeMap.set(item.tipoPermiso, typeData.descripcion);
                    }
                }
            }
            setPermissionTypes(permissionTypeMap);
        }
    };


    useEffect(() => {
        getPermission()
    }, [])

    const DetelePermission = (id: string) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "Eliminar tipo de permiso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
            }
        });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <h4>Lista de tipos de permiso</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-success mb-3" to="/">Lista de tipos de permiso</Link>

                        <Link className="btn btn-success mb-3" to="/listpermission">Lista de Permisos</Link>
                    </div>

                    <hr />
                    <Link className="btn btn-success mb-3" to="/createpermission">Nuevo permiso</Link>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Nombres empleado</th>
                                <th className="text-center">Apellidos empleado</th>
                                <th className="text-center">Tipo de permiso</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                permission.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nombreEmpleado}</td>
                                        <td>{item.apellidoEmpleado}</td>
                                        <td>{permissionTypes.get(item.tipoPermiso)}</td>
                                        <td>{item.fechaPermiso.toString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <Link className="btn btn-primary me-1" to={`/editpermission/${item.id}`}>
                                                    Editar
                                                </Link>
                                                <Button color="danger" onClick={() => { DetelePermission(item.id!) }}>
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}