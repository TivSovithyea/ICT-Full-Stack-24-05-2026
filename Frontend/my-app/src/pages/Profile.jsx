import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';

export default function Profile() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="card">
      {user.name ? (
        <div className="profile-content">
          <h2>Welcome, {user.name}!</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <div className="profile-content">
          <p>Please log in to view your profile.</p>
          <button onClick={() => navigate('/')}>Go to Login</button>
        </div>
      )}
    </div>
  );
}
