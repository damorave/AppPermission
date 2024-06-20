import { useEffect, useState } from "react";
import { IPermissionType } from "../assets/interface/IPermissionType";
import { appsettings } from "../settings/appsettings";

export function GetTypePermissionService() {

    const [permissionTypes, setPermissionTypes] = useState<IPermissionType[]>([])

    const getPermissionType = async () => {
        const response = await fetch(`${appsettings.apiUrl}permissionTypes/getall`);
        if (response.ok) {
            const data = await response.json();
            setPermissionTypes(data);
        }
    }

    useEffect(() => {
        getPermissionType()
    }, [])

    return {
        permissionTypes,
        setPermissionTypes,
        getPermissionType
    }
}