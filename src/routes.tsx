import { SlHome } from "react-icons/sl";
import { MdProductionQuantityLimits } from "react-icons/md";
interface SidebarLink {
	key: string;
	label: string;
	path: string;
	icon: JSX.Element;
}

export const DASHBOARD_SIDEBAR_LINKS: SidebarLink[] = [
	{
		key: 'home',
		label: 'Home',
		path: '/home',
		icon: <SlHome />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <MdProductionQuantityLimits />
	},
];


