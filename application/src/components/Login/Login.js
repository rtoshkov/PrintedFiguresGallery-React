import styles from './Login.module.css';
import {useContext, useState} from "react";
import {login} from "../../services/api";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Login = () => {
    const [errors, setErrors] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {userLogin} = useContext(AuthContext);


    function usernameHandler(e){
        setUsername(e.target.value);
    }

   async function loginHandler(e){
        e.preventDefault();
        const data = {
            username,
            password,
        }

        try{
            const response = await login(data);
            const record = await response.json();
            userLogin(record);
            navigate('/')

        }catch(error){
            setErrors(error.message);
        }

    }

    function passwordHandler(e){
        setPassword(e.target.value);
    }

    function validate(e) {
            e.target.value.length >= 3
                ?
                setErrors('')
                :
                setErrors(`${e.target.id} should be at least 3 characters`);
    }

    return (
        <section className={styles.loginContainer}>


            {errors ?
                <div className={styles.error}><p>{errors}</p></div>
                : undefined
            }

            <form onSubmit={loginHandler}>
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

                <button type="submit">Submit</button>

            </form>

        </section>
    )
}

export default Login;