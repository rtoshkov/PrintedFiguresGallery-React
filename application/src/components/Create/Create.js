import styles from './Create.module.css';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {createPost} from "../../services/api";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [resin, setResin] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const VALIDATION = {
        'NAME': 'name',
        'IMAGE': 'image',
        'DESCRIPTION': 'description',
    }


    let pattern = /^https?:\/\//;

    function nameHandler(e){
        setName(e.target.value);
    }
    function imageHandler(e){
        setImage(e.target.value);
    }
    function resinHandler(e){
        setResin(e.target.value);
    }
    function descriptionHandler(e){
        setDescription(e.target.value);
    }


    function validate(e) {
        if (e.target.id === VALIDATION.IMAGE) {
            pattern.test(e.target.value)
                ?
                setErrors('')
                :
                setErrors('IMAGE link not valid');
        }else if(e.target.id === VALIDATION.NAME){
            e.target.value.length >= 3
                ?
                setErrors('')
                :
                setErrors(`The Name should be at least 3 characters'`);
        }else if (e.target.id === VALIDATION.DESCRIPTION){
            e.target.value.length > 9
                ?
                setErrors('')
                :
                setErrors('Description must be at least 10 characters long');
        }
    }

    async function createHandler(e){
        e.preventDefault();
        const data = {
            name,
            image,
            resin,
            description,
            owner: user,
        }

        try{
            const response = await createPost(data, user?.accessToken);
            const record = await response.json();
            navigate('/all-figures')

        }catch(error){
            setErrors(error.message);
        }
    }


    return (
        <section className={styles.createContainer}>


            {errors ?
                <div className={styles.error}><p>{errors}</p></div>
                : undefined
            }

            <form onSubmit={createHandler}>
                <label htmlFor='name'>Name:</label>
                <input type="text"
                       value={name}
                       onChange={nameHandler}
                       id="name"
                       name="name"
                       onBlur={validate}
                />

                <label htmlFor='image'>Link to Image:</label>
                <input type="text"
                       value={image}
                       onChange={imageHandler}
                       id="image"
                       name="image"
                       onBlur={validate}
                />

                <label htmlFor='resin'>Resin:</label>
                <input type="text"
                       value={resin}
                       onChange={resinHandler}
                       id="resin"
                       name="resin"
                       onBlur={validate}
                />

                <label htmlFor='description'>Description:</label>
                <input type="text"
                       value={description}
                       onChange={descriptionHandler}
                       id="description"
                       name="description"
                       onBlur={validate}
                />


                <button type="submit">Submit</button>

            </form>

        </section>
    )
}

export default Create;