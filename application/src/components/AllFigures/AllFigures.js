import styles from './AllFigures.module.css';
import {getAllPosts} from "../../services/api";
import {useEffect, useState} from "react";

const AllFigures = () => {
    const [figures, setFigures] = useState(undefined);

    useEffect(() => {
        getAllPosts().then(result => result.json()).then(result => {
                setFigures(result);
            });
    }, []);

    return (
        <>
        <div className={styles.container}>
            {figures?.map((x) => (<p key={x._id}>{x.name}</p>))}
        </div>
        </>
    )
}

export default AllFigures;