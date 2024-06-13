import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './permission.css';
import Swal from "sweetalert2";
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap";
import { IPermission } from "../../assets/interface/IPermission";

const initialPermission = {
    id: "",
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: "",
    fechaPermiso: new Date(),
}
/**
 * Queda pendiente el formulario para los permisos, se creó el esqueño con el fin de obtener la información
 * @export
 * @return {*} 
 */
export function EditPermissionComponent() {
    const { id } = useParams<{ id: string }>();
    const [permission, setPermission] = useState<IPermission>(initialPermission);
    const [selectedDate, setSelectedDate] = useState(new Date(permission.fechaPermiso));
    const [permissionTypes, setPermissionTypes] = useState('');
    const navigate = useNavigate();


    // Lógica para obtener la data del permiso a editar
    useEffect(() => {
        const getPermission = async () => {
            const response = await fetch(`${appsettings.apiUrl}permission/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPermission(data);

                const typeResponse = await fetch(`${appsettings.apiUrl}permissionTypes/${id}`);
                    if (typeResponse.ok) {
                        const typeData = await typeResponse.json();
                        setPermissionTypes(typeData.descripcion);
                    }
                } else {
                    console.error('Error al obtener el permiso:', response.statusText);
                }
            
        }
        getPermission()
    }, [])

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const inputChangeValueType = (event: ChangeEvent<HTMLInputElement>) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setPermission({ ...permission, [inputName]: inputValue })
    }

    const save = async () => {
        const response = await fetch(`${appsettings.apiUrl}permission/update/${id}`);

        if (response.ok) {
            navigate("/")
        } else {
            Swal.fire({
                title: "Error!",
                text: "No se pudo editar el permiso",
                icon: "warning"
            });
        }
    }

    const retornar = () => {
        navigate("/")
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Editar tipo de permiso</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre del empleado</Label>
                            <Input type="text" name="nombreEmpleado" onChange={inputChangeValueType} value={permission.nombreEmpleado}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Apellido del empleado</Label>
                            <Input type="text" name="apellidoEmpleado" onChange={inputChangeValueType} value={permission.apellidoEmpleado}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo de permiso</Label>
                            <Input type="text" name="tipoPermiso" onChange={inputChangeValueType} value={permissionTypes}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha del permiso</Label>
                            <br />
                            <DatePicker className="custom-datepicker-container" name="fechaPermiso" calendarClassName="custom-datepicker-calendar" selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
                        </FormGroup>
                    </Form>

                    <Button color="primary" className="me-4" onClick={save}>Guardar</Button>
                    <Button color="secundary" onClick={retornar}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}