import styles from './Edit.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getPost, editPost} from "../../services/api";
import {AuthContext} from "../../context/AuthContext";

const Edit = () => {
    const {id} = useParams();
    const [post, setPost] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [resin, setResin] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        getPost(id).then(result => result.json()).then(result => {
            setPost(result);
            setName(result.name);
            setImage(result.image);
            setResin(result.resin);
            setDescription(result.description);
        });
    }, []);



    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const VALIDATION = {
        'NAME': 'name',
        'IMAGE': 'image',
        'DESCRIPTION': 'description',
    }

    let pattern = /^https?:\/\//;

    function nameHandler(e) {
        setName(e.target.value);
    }

    function imageHandler(e) {
        setImage(e.target.value);
    }

    function resinHandler(e) {
        setResin(e.target.value);
    }

    function descriptionHandler(e) {
        setDescription(e.target.value);
    }

    function validate(e) {
        if (e.target.id === VALIDATION.IMAGE) {
            pattern.test(e.target.value)
                ?
                setErrors('')
                :
                setErrors('IMAGE link not valid');
        } else if (e.target.id === VALIDATION.NAME) {
            e.target.value.length >= 3
                ?
                setErrors('')
                :
                setErrors(`The Name should be at least 3 characters'`);
        } else if (e.target.id === VALIDATION.DESCRIPTION) {
            e.target.value.length > 9
                ?
                setErrors('')
                :
                setErrors('Description must be at least 10 characters long');
        }
    }


    async function editHandler(e){
        e.preventDefault();
        const data = {
            name,
            image,
            resin,
            description,
            owner: user,
        }

        try{
            const response = await editPost(id, data, user?.accessToken);
            const record = await response.json();
            navigate(`/details/${id}`)
        }catch(error){
            setErrors(error.message);
        }
    }

    return (
        <section className={styles.EditSection}>

            {errors ?
                <div className={styles.error}><p>{errors}</p></div>
                : undefined
            }

            <form onSubmit={editHandler}>
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

export default Edit;