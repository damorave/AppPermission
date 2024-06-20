import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPermission, ITipoPermisoSubmit } from "../../assets/interface/IPermission";
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap";
import { GetTypePermissionService } from "../../service/getTypePermissionService";
import { CreatePermissionService } from "../../service/createPermissionService";
import { DateHelper } from "../../Helpers/helper";
import Swal from "sweetalert2";

/**
 * Componente que contiene el formulario para la creación de un permiso
 * @returns 
 */
export function CreatePermissionComponent() {

    const [permission, setPermission] = useState<IPermission>({
        nombreEmpleado: '',
        apellidoEmpleado: '',
        tipoPermiso: '',
        fechaPermiso: new Date
    });
    const { getPermissionType, permissionTypes } = GetTypePermissionService();


    useEffect(() => {
        getPermissionType();
    }, [])


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPermission(prevPermission => ({
            ...prevPermission,
            [name]: value,
        }));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPermission({
            ...permission,
            fechaPermiso: new Date(event.target.value),
        });
    };

    const handleSubmit = async () => {
        try {
            Swal.showLoading()
            const selectedPermissionType = permissionTypes.find(type => type.id === permission.tipoPermiso);

            const formattedDate = DateHelper(permission.fechaPermiso);

            if (!selectedPermissionType) {
                console.error('Tipo de permiso no encontrado.');
                return;
            }

            const permissionToSend: ITipoPermisoSubmit = {
                tipoPermiso: {
                    value: selectedPermissionType?.id ?? ''
                },
                nombreEmpleado: permission.nombreEmpleado,
                apellidoEmpleado: permission.apellidoEmpleado,
                fechaPermiso: formattedDate,
            };

            await CreatePermissionService(permissionToSend);

        } catch (error) {
            console.error('Error al enviar el permiso:', error);
        }
    };


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Nuevo Permiso</h4>
                    <hr />
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="fechaPermiso">Fecha del permiso</Label>
                                    <Input
                                        type="date"
                                        name="fechaPermiso"
                                        id="fechaPermiso"
                                        onChange={handleDateChange}
                                        value={permission.fechaPermiso.toISOString().split('T')[0]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="tipoPermiso">Tipo permiso a asociar</Label>
                                    <Input
                                        type="select"
                                        name="tipoPermiso"
                                        id="tipoPermiso"
                                        value={permission.tipoPermiso}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona un tipo de permiso</option>
                                        {permissionTypes.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.descripcion}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="nombreEmpleado">Nombre del Empleado</Label>
                                    <Input
                                        type="text"
                                        name="nombreEmpleado"
                                        id="nombreEmpleado"
                                        onChange={handleChange}
                                        value={permission.nombreEmpleado}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="apellidoEmpleado">Apellido del Empleado</Label>
                                    <Input
                                        type="text"
                                        name="apellidoEmpleado"
                                        id="apellidoEmpleado"
                                        onChange={handleChange}
                                        value={permission.apellidoEmpleado}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Link className="btn btn-primary me-1" to="/listpermission">
                                    Cancelar
                                </Link>
                            </Col>
                            <Col md={6}>
                                <Button color="success" onClick={handleSubmit}>
                                    Crear
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}