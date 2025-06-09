import RegisterForm from '../components/RegisterForm';
import '../assets/css/register-styles.css'
function RegisterPage() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;