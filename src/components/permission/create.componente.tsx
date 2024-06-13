import { ChangeEvent, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IPermission } from "../../assets/interface/IPermission";
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap";

/**
 * Inicialización de propiedades
 */
const initialPermission = {
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: "",
    fechaPermiso: new Date()
}

/**
 * Clase que contiene el formulario para la creación de un permiso
 * @returns 
 */
export function CreatePermissionComponent() {

    const [permission, setPermission] = useState<IPermission>(initialPermission);
    const navidate = useNavigate();


    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setPermission({ ...permission, [inputName]: inputValue })
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}></Col>
                <h4>Nuevo Permiso</h4>
                <hr />
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input type="text" name="nombreEmpleado" onChange={inputChangeValue} value={permission.nombreEmpleado}></Input>
                    </FormGroup>
                </Form>
            </Row>
        </Container>
    )
}