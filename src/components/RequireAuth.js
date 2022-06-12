import LoginSession from '../stores/LoginSession';
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {

  return LoginSession.current ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
