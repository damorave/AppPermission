export interface IPermission {
    id?: string;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    tipoPermiso: string;
    fechaPermiso: Date;
}
export interface ITipoPermisoSubmit {
    id?: string;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    tipoPermiso: TipoPermiso;
    fechaPermiso: Date;
}

interface TipoPermiso {
    value: string
}