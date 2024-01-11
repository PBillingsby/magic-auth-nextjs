"use client"
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation'
import Loading from '../components/Loading';

const Profile = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  console.log(user)
  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user?.issuer && router.push('/login');
  }, [user, history]);

  return (
    <>
      {!user?.issuer || user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div className="text-center">
            <div className='label'>Email</div>
            <div className='profile-info'>{user.email}</div>
            <div className="label">Phone Number</div>
            <div className="profile-info">{user?.phoneNumber || "Not added"}</div>
            <div className='label'>Public Address</div>
            <div className='profile-info'>{user.publicAddress}</div>
            <div className='label'>User Id</div>
            <div className='profile-info'>{user.issuer}</div>
            <div className="label">isMfaEnabled</div>
            <div className="profile-info">{user?.isMfaEnabled?.toString()}</div>
          </div>
        )
      )}
      <style>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Profile;
