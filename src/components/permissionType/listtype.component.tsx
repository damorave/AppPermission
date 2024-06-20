import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { GetTypePermissionService } from "../../service/getTypePermissionService";


export function ListPermissionTypeComponent() {
    
    const { permissionTypes, getPermissionType } = GetTypePermissionService();

    useEffect(() => {
        getPermissionType()
    }, [])

    const DetelePermissionType = (id: string) => {
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
                <Col sm={{ size: 6, offset: 2 }}>
                    <h4>Lista de tipos de permiso</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-success mb-3" to="/">Lista de tipos de permiso</Link>

                        <Link className="btn btn-success mb-3" to="listpermission">Lista de Permisos</Link>
                    </div>

                    <hr />
                    <Link className="btn btn-success mb-3" to="createpermissiontype">Nuevo tipo de permiso</Link>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Descripcion</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                permissionTypes.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.descripcion}</td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <Link className="btn btn-primary me-1" to={`editpermissiontype/${item.id}`}>
                                                    Editar
                                                </Link>
                                                <Button color="danger" onClick={() => { DetelePermissionType(item.id!) }}>
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