import React from 'react';
import Header from '../../layouts/Header';
import { useSelector } from 'react-redux';
import { currentUser } from '../authentication/authSlice';
import UpdateUserForm from './UpdateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import ProfileSideBar from './ProfileSideBar';

const Profile = () => {
	const user = useSelector(currentUser)?.user;
	const userName = user?.name;
	const userEmail = user?.email;
	const userPhoto = user?.photo;
	console.log('user', user);

	return (
		<>
			<Header />

			<div className='user-view'>
				<ProfileSideBar />
				<div className='user-view__content'>
					<div className='user-view__form-container'>
						<h2 className='heading-secondary ma-bt-md'>
							Your account settings
						</h2>

						<UpdateUserForm
							name={userName}
							email={userEmail}
							photo={userPhoto}
						/>
					</div>
					<div className='line'>&nbsp;</div>
					<UpdatePasswordForm />
				</div>
			</div>
		</>
	);
};

export default Profile;
