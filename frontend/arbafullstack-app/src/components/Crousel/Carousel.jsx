import React, { useState } from "react";
import styles from "./Carousel.module.css"; // import CSS module for styling

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0); // define state for the active image index
    const images = [ // define array of image URLs
        "https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNaJWbqd7lkr7_luRbF_RXNFo8DjgkxUvuBXIFrviT6FSbJk8Slcoa--8bN0GwtP8ZIU&usqp=CAU",
        "https://i0.wp.com/communiquer-digital-et-local.fr/wp-content/uploads/2022/02/conseils-optimiser-parcours-achat-e-commerce.jpg?resize=730%2C401&ssl=1",
    ];

    const handleNext = () => { // define function to handle next button click
        setActiveIndex((activeIndex + 1) % images.length); // increment active index by 1, wrapping around to 0 if necessary
    };

    const handlePrev = () => { // define function to handle previous button click
        setActiveIndex((activeIndex - 1 + images.length) % images.length); // decrement active index by 1, wrapping around to the last index if necessary
    };

    return (
        <div className={styles.carousel}> {/* render carousel container */}
            <div className={styles.imageContainer}> {/* render image container */}
                <img src={images[activeIndex]} alt="carousel" className={styles.image} /> {/* render active image */}
                <div className={styles.overlay}></div> {/* render overlay */}
                <button className={styles.prevButton} onClick={handlePrev}> {/* render previous button */}
                    &#8249; {/* render left arrow */}
                </button>
                <button className={styles.nextButton} onClick={handleNext}> {/* render next button */}
                    &#8250; {/* render right arrow */}
                </button>
            </div>
        </div>
    );
}
