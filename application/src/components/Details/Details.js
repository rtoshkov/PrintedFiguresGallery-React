import styles from './Details.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getPost, deletePost, postComment} from "../../services/api";
import {AuthContext} from "../../context/AuthContext";

const Details = () => {
    const [post, setPost] = useState(undefined);
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        getPost(id).then(result => result.json()).then(result => {
            setPost(result);
        });
    }, []);


    function onEdit() {
        navigate(`/edit/${id}`)
    }

    function onDelete() {
        const confirmation = window.confirm('Delete?')
        if (confirmation) {
            deletePost(id, user?.accessToken);
            navigate('/all-figures');
        }

    }

    function onComment(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const text = formData.get('text');

        if (text.length < 1) {
            return null;
        }

        const data = {
            text,
        }

        postComment(id, data, user?.accessToken).then( data => {
            form.reset();
            window.location.reload();
        })


    }


    return (
        <section className={styles.DetailsSection}>
            <article className={styles.ImageContainer}>
                <img src={post?.image} alt={post?.name}/>
            </article>

            <article className={styles.info}>
                <h2>{post?.name}</h2>
                <h4>Owner: {post?.owner.username}</h4>
                <p className={styles.description}>Description: {post?.description}</p>
                <p>Resin: {post?.resin}</p>

                {user._id === post?.owner._id
                    ?
                    <div className={styles.controls}>
                        <button onClick={onEdit}>Edit</button>
                        <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
                    </div>
                    :
                    undefined}

                {post?.comments.length > 0
                    ?
                    <>
                        <h5>Comments: </h5>
                        {post?.comments.map((x) => (<p key={x._id} className={styles.comment}>{x.text}</p>))}
                    </>
                    :
                    undefined}

                {user._id
                    ?
                    <form onSubmit={onComment} className={styles.commentForm}>
                        <label htmlFor="text">Comment:</label>
                        <textarea type="text" name="text" cols="30"/>
                        <button>Submit</button>
                    </form>
                    :
                    undefined}

            </article>

        </section>
    )
}

export default Details;