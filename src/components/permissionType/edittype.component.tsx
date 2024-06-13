import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap";
import { IPermissionType } from "../../assets/interface/IPermissionType";


const initialPermissionType = {
    id: "",
    descripcion: ""
}

export function EditPermissionTypeComponent() {
    const { id } = useParams<{ id: string }>();
    const [permissionType, setPermissionType] = useState<IPermissionType>(initialPermissionType);
    const navigate = useNavigate();


    // Lógica para obtener la data del tipo de permiso a editar
    useEffect(() => {
        const getPermissionType = async () => {
            const response = await fetch(`${appsettings.apiUrl}permissionTypes/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPermissionType(data);
            }
        }
        getPermissionType()
    }, [])


    const inputChangeValueType = (event: ChangeEvent<HTMLInputElement>) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setPermissionType({ ...permissionType, [inputName]: inputValue })
    }


    const save = async () => {
        const response = await fetch(`${appsettings.apiUrl}permissionTypes/update/${id}`);

        if (response.ok) {
            navigate("/")
        } else {
            Swal.fire({
                title: "Error!",
                text: "No se pudo editar el tipo de permiso",
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
                            <Label>Descripción del permiso</Label>
                            <Input type="text" name="descripcion" onChange={inputChangeValueType} value={permissionType.descripcion}></Input>
                        </FormGroup>
                    </Form>

                    <Button color="primary" className="me-4" onClick={save}>Guardar</Button>
                    <Button color="secundary" onClick={retornar}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}