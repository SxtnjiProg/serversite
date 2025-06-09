import LoginForm from '../components/LoginForm';
import '../assets/css/login-styles.css'
function LoginPage() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <LoginForm />
        </div>
    );
}

export default LoginPage;