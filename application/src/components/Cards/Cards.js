import styles from './Cards.module.css';
import {useNavigate} from "react-router-dom";

const Cards = (props) => {
    const navigate = useNavigate();

    function onDetails() {
        navigate('/');
    }

    return (
        <>
            <article className={styles.card}>
                <div className={styles.profileImg}>
                    <img src={props.card.image} alt="Image of Figurine"/>
                </div>

                <div className={styles.info}>
                    <h3>{props.card.name}</h3>
                    <p>{props.card.description}</p>
                </div>
                <button onClick={onDetails}>Details</button>
            </article>
        </>
    )
}

export default Cards;