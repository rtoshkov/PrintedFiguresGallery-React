import styles from './Home.module.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllPosts} from "../../services/api";
import Cards from "../Cards/Cards";

const Home = () => {
    const [figures, setFigures] = useState(undefined);

    useEffect(() => {
        getAllPosts().then(result => result.json()).then(result => {
            setFigures(result.slice(-3));
        });
    }, []);

    return (
        <>
            <section className={styles.container}>
                <img src="/printer.png" alt="Printer image" className={styles.logoImage}/>
                <div className={styles.containerText}>
                    <h1>Tagline</h1>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum
                        has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                        was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and
                        more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                        Ipsum.
                    </p>
                    <Link to="/all-figures" className={styles.homePageButton}>All figures</Link>
                </div>
            </section>


            <section className={styles.taglineBorder}>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </section>

            <section className={styles.cardsHomePage}>
                {figures?.map((x) => (<Cards card={x}/>))}
            </section>

        </>
    )
}

export default Home;