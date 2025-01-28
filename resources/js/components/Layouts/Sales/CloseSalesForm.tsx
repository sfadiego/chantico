import { Button, Card, CardBody, CardHeader, CardText } from 'react-bootstrap'
import { useHandleCloseSales } from './hooks/useHandleCloseSales';
import { useCloseSales } from '@/services/useOpenSalesService';
import moment from 'moment';
import { IMainOrderReport } from '@/intefaces/IMainOrderReport';
import LoadingComponent from '../LoadingComponent';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoutesAdmin } from '@/router/modules/admin.routes';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const CloseSalesForm = ({ sistemaId, systemInfo }: {
    sistemaId: number,
    systemInfo: IMainOrderReport
}) => {
    if (!systemInfo.user) {
        return <LoadingComponent />
    }
    const navigate = useNavigate();
    const mutate = useCloseSales(sistemaId);
    const { onSubmit } = useHandleCloseSales({
        mutateAsync: mutate.mutateAsync,
        onSuccess: ({ data: { id } }) => {
            navigate(`/admin/sales-summary/${id}`);
        }
    });
    const confirmCloseSales = () => {
        Swal.fire({
            icon: "warning",
            title: "Estas seguro que quieres cerrar ventas?",
            showDenyButton: true,
            confirmButtonText: "Continuar",
            denyButtonText: `Cancelar`
        }).then(({ isConfirmed }) => isConfirmed && handleCloseSales());
    }

    const handleCloseSales = () => {
        onSubmit({}, {
            setErrors: (errors: any) => {
                console.log("error:", errors)
                toast.error("Error al cerrar ventas");
            }
        })
    }
    const { created_at, observaciones, efectivo_caja_inicio, user } = systemInfo;
    const date = created_at ? moment(created_at).format("MMMM Do YYYY") : ' -- ';
    return (
        <div className="col-md-12 mt-2 mb-2">
            <Card>
                <CardHeader>
                    Cerrar ventas
                </CardHeader>
                <CardBody>
                    <CardText>
                        Sistema abierto por <b>{user.nombre} {user.apellido_paterno}</b> con la fecha <b> {date}</b>
                    </CardText>
                    <CardText>
                        Efectivo inicial: $<b>{efectivo_caja_inicio}</b>
                    </CardText>
                    <CardText>
                        Observaciones: {observaciones}
                    </CardText>
                    <Button
                        onClick={confirmCloseSales}
                        variant='primary'
                    >
                        <i className="bi bi-coin"></i> Cerrar Ventas
                    </Button>
                    <NavLink className={`btn btn-light ms-2`}
                        to={RoutesAdmin.Dashboard} end> Regresar
                    </NavLink>

                </CardBody>
            </Card>
        </div>
    )
}
