import logoSrc2x from '../assets/img/game-logo2.jpeg';
import logoSrc1x from '../assets/img/game-logo2.jpeg';
import logoSrcSmall1x from '../assets/img/game-logo2.jpeg';
import logoSrcSmall2x from '../assets/img/game-logo2.jpeg';

const Footer = () => {
	return (
		<footer className='footer' id='footer'>
		

			<div className='row'>
				<div className='col-1-of-2'>
					<div className='footer__navigation'>
						<ul className='footer__list'>
							<li className='footer__item'>
								<a href='#123' className='footer__link'>
									Company
								</a>
							</li>
							<li className='footer__item'>
								<a href='#123' className='footer__link'>
									Contact us
								</a>
							</li>
							<li className='footer__item'>
								<a href='#123' className='footer__link'>
									Careers
								</a>
							</li>
							<li className='footer__item'>
								<a href='#123' className='footer__link'>
									Privacy policy
								</a>
							</li>
							<li className='footer__item'>
								<a href='#123' className='footer__link'>
									Terms
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-1-of-2'>
					<p className='footer__copyright'>
						Built by{' '}
						<a href='asd' className='footer__link'>
							Zelalem Mekonnen, 2022.
						</a>{' '}
						Copyright &copy; by Abyssinia Tour. Lorem ipsum dolor, sit amet
						consectetur adipisicing elit. Harum dicta odio sunt. Cumque hic
						
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
