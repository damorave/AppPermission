import { appsettings } from "../settings/appsettings";
import { ITipoPermisoSubmit } from "../assets/interface/IPermission";
import Swal from "sweetalert2";

/**
 * Service encargado de realizar la petición al back para la creación de un permiso
 */
export async function CreatePermissionService(permission: ITipoPermisoSubmit) {
    try {
        const response = await fetch(`${appsettings.apiUrl}permission/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(permission)
        });

        Swal.hideLoading();
        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Error al realizar la solicitud POST:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
    }
}