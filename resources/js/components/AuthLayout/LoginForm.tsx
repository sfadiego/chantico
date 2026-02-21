import { Button } from "react-bootstrap";
import { ErrorMessage, Formik, Field, Form } from "formik";
import { ISignInForm } from "@/intefaces/IAuth";
import { useLoginForm } from "./useLoginForm";

const LoginForm = () => {
    const props = useLoginForm();
    return (
        <>
            <div className="p-5 pt-2">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-3">Bienvenido</h1>
                </div>
                <Formik<ISignInForm> enableReinitialize {...props}>
                    {(formik) => (
                        <Form>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="firstName"
                                >
                                    Correo
                                </label>
                                <Field
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage
                                    name="email"
                                    className="text-danger p-1"
                                    component="div"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Contraseña
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    className="text-danger p-1"
                                    component="div"
                                />
                            </div>
                            <Button
                                disabled={formik.isSubmitting}
                                variant="primary"
                                type="submit"
                            >
                                Iniciar Sesion
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default LoginForm;
