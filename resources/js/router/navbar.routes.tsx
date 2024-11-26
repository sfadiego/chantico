const UserDashboardRoutes = [
    {
        icon: '',
        name: 'Ordenes',
        href: '/order-list',
        isAdmin: false,
        itemDisabled: false,
    },
    {
        icon: '',
        name: 'Abrir Caja',
        href: '/admin/open-sales',
        isAdmin: false,
        itemDisabled: true,
    }
];

const AdminDashboardRoutes = [
    {
        icon: '',
        name: 'Nuevo producto',
        href: '/admin/new-products',
        isAdmin: true,
        itemDisabled: false,
    },
    {
        icon: '',
        name: 'Abrir Caja',
        href: '/admin/open-sales',
        isAdmin: true,
        itemDisabled: false,
    },
];

const navbarRoutes = [
    ...UserDashboardRoutes,
    ...AdminDashboardRoutes,
];

export default navbarRoutes;