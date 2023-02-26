import React from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const Home = () => {
	return (
		<>
			<Header />

			<main>
				<div className='home'>
					<div className='home__container'>
						<div className='home__content'>
							<h1 className='home__title'>Welcome to the best game ever!</h1>
							<p className='home__text'>Play the game and win the game!</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Home;
