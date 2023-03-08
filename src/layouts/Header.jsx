import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import logoSrc from '../assets/img/game-logo1.png';
import useAuth from '../hooks/useAuth';
import { useSendLogoutMutation } from '../features/authentication/authApiSlice';

const Header = () => {
	const user = useAuth();
	const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) navigate('/login');
	}, [isSuccess, navigate]);

	return (
		<header className='header-wrapper'>
			<div className='header'>
				<div className='header-left'>
					<div className='logo'>
						<Link to='/games'>
							<img src={logoSrc} className='logo-img' alt='Natours logo' />
						</Link>
					</div>
				</div>

				<nav className='nav'>
					<ul className='nav--user'>
						<li>
							<Link to='/games' className='nav-el'>
								Games
							</Link>
						</li>
						{user.isLoggedIn && (
							<>
								<li>
									<button onClick={sendLogout} className='nav-el'>
										{isLoading ? <PulseLoader color={'#55c57a'} /> : 'Log Out'}
									</button>
								</li>
								<li>
									<Link
										to={user?.isAdmin ? '/admin' : '/profile'}
										className='nav-el'
									>
										<img
											src={`${process.env.REACT_APP_PUBLIC_API_URL}/img/users/${user?.photo}`}
											className='nav__user-img'
											alt={user?.name}
										/>
									</Link>
								</li>
								<li>
									<NavLink to={'/profile'} className='nav-el'>
										{user?.name?.split(' ')[0]}
									</NavLink>
								</li>
								{user.isAdmin && (
									<li>
										<NavLink to='/dashboard' className='nav-el'>
											Dashboard
										</NavLink>
									</li>
								)}
							</>
						)}
						{!user.isLoggedIn && (
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
