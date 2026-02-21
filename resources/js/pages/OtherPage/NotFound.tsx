import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <>
            <div>404 - Not Found</div>
            <Link to="/" className="">
                Regresar a la pagina principal
            </Link>
        </>
    );
}
