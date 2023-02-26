import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logoSrc from '../assets/img/game-logo1.png';
import { useSelector, useDispatch } from 'react-redux';
import {
	currentUser,
	logout,
	getUser,
} from '../features/authentication/authSlice';
import { useEffect } from 'react';

const Header = () => {
	const user = useSelector(currentUser);
	const status = useSelector((state) => state.auth.status);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!user) dispatch(getUser());
	}, [location, user, dispatch]);

	const handleLogout = () => {
		dispatch(logout());
	};

	if (status === 'loggedOut') {
		navigate('/login');
	}

	return (
		<header className='header-wrapper'>
			<div className='header'>
				<div className='header-left'>
					<div className='logo'>
						<Link to='/'>
							<img src={logoSrc} className='logo-img' alt='Natours logo' />
						</Link>
					</div>
				</div>

				<nav className='nav'>
					<ul className='nav--user'>
						<li>
							<Link to='/game' className='nav-el'>
								Games
							</Link>
						</li>
						{user && (
							<>
								<li>
									<button onClick={handleLogout} className='nav-el'>
										Log Out
									</button>
								</li>
								<li>
									<Link
										to={user.user?.role === 'admin' ? '/admin' : '/profile'}
										className='nav-el'
									>
										<img
											src={`${process.env.REACT_APP_PUBLIC_URL}/img/users/${user.user?.photo}`}
											className='nav__user-img'
											alt={user.user?.name}
										/>
									</Link>
								</li>
								<li>
									<NavLink to={'/profile'} className='nav-el'>
										{user.user?.name?.split(' ')[0]}
									</NavLink>
								</li>
								{user.user?.role === 'admin' && (
									<li>
										<NavLink to='/dashboard' className='nav-el'>
											Dashboard
										</NavLink>
									</li>
								)}
							</>
						)}
						{!user && (
							<>
								<li>
									<NavLink to='/login' className='nav-el'>
										Log IN
									</NavLink>
								</li>
								<li>
									<NavLink to='/signup' className='nav-el signup'>
										Sign Up
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
