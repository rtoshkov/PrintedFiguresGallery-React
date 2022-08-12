import styles from './Details.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getPost, deletePost} from "../../services/api";
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


    function onEdit(){
        navigate(`/edit/${id}`)
    }

    function onDelete(){
        const confirmation = window.confirm('Delete?')
        if(confirmation) {
            deletePost(id, user?.accessToken);
            navigate('/all-figures');
        }

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
                   undefined }

           </article>

       </section>
    )
}

export default Details;