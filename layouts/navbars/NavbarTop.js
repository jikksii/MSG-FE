// import node module libraries
import { Menu } from 'react-feather';
import Link from 'next/link';
import {
	Nav,
	Navbar,
	Form
} from 'react-bootstrap';

// import sub components
import QuickMenu from 'layouts/QuickMenu';
import useHttp from 'hooks/useHttp';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { deleteCookie } from 'cookies-next';


const NavbarTop = (props) => {

	const router = useRouter()
	const handleSuccessAuth = useCallback(data => {
		deleteCookie('token');
		router.push('/authentication/sign-in');
	}, []);

	const handleError = (error) => {
		console.log(error);
		if (error.response?.status === 401) {
			deleteCookie('token');
			router.push('/authentication/sign-in');
		}
	}


	const { sendRequest: logout } = useHttp(handleSuccessAuth, handleError)

	const signOutHandler = () => {
		logout({
			method: 'PATCH',
			url: "/logout",
		});
	}
	return (
		<Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg">
			<div className='d-flex justify-content-between w-100'>
				<div className="d-flex align-items-center">
					<Link
						href="#"
						id="nav-toggle"
						className="nav-icon me-2 icon-xs"
						onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
						<Menu size="18px" />
					</Link>
					<div className="ms-lg-3 d-none d-md-none d-lg-block">
						{/* Search Form */}
						<Form className="d-flex align-items-center">
							<Form.Control type="search" placeholder="Search" />
						</Form>
					</div>
				</div>
				{/* Quick Menu */}
				<Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
					<QuickMenu handleSignOut={signOutHandler} />
				</Nav>
			</div>
		</Navbar>
	);
};

export default NavbarTop;
