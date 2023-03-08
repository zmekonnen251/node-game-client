import React from 'react';

import UpdateUserForm from './UpdateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import ProfileSideBar from './ProfileSideBar';
import useAuth from '../../hooks/useAuth';
import UpdatePhoneNumber from './UpdatePhoneNumber';

const Profile = () => {
	const user = useAuth();
	const userName = user?.name;
	const userEmail = user?.email;
	const userPhoto = user?.photo;

	return (
		<>
			<div className='user-view'>
				<ProfileSideBar />
				<div className='user-view__content'>
					<div className='user-view__form-container'>
						<h2 className='heading-secondary ma-bt-md'>
							Your account settings
						</h2>

						{!user?.verified && (
							<p style={{ fontSize: '18px', color: 'red' }}>
								Please Update your phone number to verify your account
							</p>
						)}

						<UpdateUserForm
							name={userName}
							email={userEmail}
							photo={userPhoto}
						/>
					</div>
					<div className='line'>&nbsp;</div>
					<UpdatePhoneNumber
						phoneNumber={user?.phone}
						verified={user?.verified}
					/>
					<div className='line'>&nbsp;</div>

					<UpdatePasswordForm />
				</div>
			</div>
		</>
	);
};

export default Profile;
