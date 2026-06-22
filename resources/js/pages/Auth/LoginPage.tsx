import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Coffee, ShoppingBag, BarChart2 } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import { useServiceLogin } from "@/services/auth/useServiceAuth";
import { ISignInForm, IAuthResponse } from "@/intefaces/IAuth";

const validationSchema = Yup.object<ISignInForm>({
    email: Yup.string()
        .email("Ingresa un correo válido")
        .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
});

const features = [
    { icon: Coffee, label: "Gestión de pedidos" },
    { icon: ShoppingBag, label: "Control de ventas" },
    { icon: BarChart2, label: "Estadísticas" },
];

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { saveAuth } = useAxios();
    const navigate = useNavigate();
    const loginMutation = useServiceLogin();

    const formik = useFormik<ISignInForm>({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginMutation.mutateAsync(values);
                const { access_token, user } = response.data as IAuthResponse;
                saveAuth(access_token, user);
                navigate("/");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const msg =
                        error.response?.data?.message ?? "Credenciales incorrectas";
                    toast.error(msg);
                } else {
                    toast.error("Error al iniciar sesión");
                }
            }
        },
    });

    const fieldError = (field: keyof ISignInForm) =>
        formik.touched[field] && formik.errors[field]
            ? formik.errors[field]
            : null;

    return (
        <div className="min-h-screen flex">
            {/* Panel de marca */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 flex-col items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full" />
                    <div className="absolute bottom-16 right-12 w-72 h-72 bg-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
                    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-7 mb-8 shadow-xl">
                        <Coffee size={56} className="text-white" />
                    </div>
                    <h1 className="text-white text-4xl font-bold tracking-tight mb-3">
                        Chantico POS
                    </h1>
                    <p className="text-amber-100 text-base leading-relaxed mb-12">
                        Sistema de punto de venta para tu cafetería
                    </p>

                    <div className="grid grid-cols-3 gap-5 w-full">
                        {features.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-2.5">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <Icon size={22} className="text-white" />
                                </div>
                                <span className="text-amber-100 text-xs font-medium leading-tight text-center">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="flex-1 flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="bg-amber-500 rounded-2xl p-4 shadow-lg">
                            <Coffee size={36} className="text-white" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-stone-900">Bienvenido</h2>
                        <p className="text-stone-500 text-sm mt-1">
                            Inicia sesión para continuar
                        </p>
                    </div>

                    <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-stone-700 mb-1.5"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                {...formik.getFieldProps("email")}
                                className={`w-full px-4 py-3 border rounded-xl text-sm text-stone-900 placeholder-stone-400
                                    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow
                                    ${fieldError("email") ? "border-red-400 bg-red-50" : "border-stone-300"}`}
                            />
                            {fieldError("email") && (
                                <p className="text-red-500 text-xs mt-1">{fieldError("email")}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-stone-700 mb-1.5"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...formik.getFieldProps("password")}
                                    className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm text-stone-900 placeholder-stone-400
                                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow
                                        ${fieldError("password") ? "border-red-400 bg-red-50" : "border-stone-300"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {fieldError("password") && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldError("password")}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || loginMutation.isPending}
                            className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600
                                disabled:bg-amber-300 disabled:cursor-not-allowed
                                text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-150 text-sm mt-2"
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Ingresando...
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-stone-400 text-xs mt-10">
                        Chantico POS &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
