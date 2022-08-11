import styles from './Register.module.css';
import {useState} from "react";
import register from '../../services/api'
const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    const pattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/

    const VALIDATION = {
        'EMAIL': 'email',
        'USERNAME': 'username',
        'PASSWORD': 'password',
        'CONFIRMPASSWORD': 'confirmPassword'
    }

    function registerHandler(e){
        e.preventDefault();
        const data = {
            username,
            email,
            password,
        }

        register(data).then(data => data.json()).catch(error => {
            setErrors(error.message);
            console.log(errors)
        })
    }

    function usernameHandler(e){
        setUsername(e.target.value);
    }

    function passwordHandler(e){
        setPassword(e.target.value);
    }

    function emailHandler(e){
        setEmail(e.target.value);
    }

    function confirmPasswordHandler(e){
        setConfirmPassword(e.target.value);
    }

    function validate(e) {
        if (e.target.id === VALIDATION.EMAIL) {
            pattern.test(e.target.value)
                ?
                setErrors('')
                :
                setErrors('EMAIL not valid');
        }else if(e.target.id === VALIDATION.USERNAME || e.target.id === VALIDATION.PASSWORD){
            e.target.value.length >= 3
                ?
                setErrors('')
                :
                setErrors(`${e.target.id} should be at least 3 characters`);
        }else if (e.target.id === VALIDATION.CONFIRMPASSWORD){
            e.target.value === password
                ?
                setErrors('')
                :
                setErrors('Passwords do not match');
        }
    }

    return (
        <section className={styles.registerContainer}>


            {errors ?
                <div className={styles.error}><p>{errors}</p></div>
                : undefined
            }

            <form onSubmit={registerHandler}>
                <label htmlFor='username'>Username:</label>
                <input type="text"
                       value={username}
                       onChange={usernameHandler}
                       id="username"
                       name="username"
                       onBlur={validate}
                />

                <label htmlFor='password'>Password:</label>
                <input type="password"
                       value={password}
                       onChange={passwordHandler}
                       id="password"
                       name="password"
                       onBlur={validate}
                />

                <label htmlFor='email'>Email:</label>
                <input type="email"
                       value={email}
                       onChange={emailHandler}
                       id="email"
                       name="email"
                       onBlur={validate}
                />


                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input type="password"
                       value={confirmPassword}
                       onChange={confirmPasswordHandler}
                       id="confirmPassword"
                       name="confirmPassword"
                       onBlur={validate}
                />

                <button type="submit">Submit</button>

            </form>

        </section>
    )
}

export default Register;