// Import necessary modules
import React, { useEffect, useState } from 'react';
import styles from './TermsCondition.module.css';

// Create a functional component named TermsCondition
export default function TermsCondition() {
    // Use state hook to manage the visibility of the terms and conditions window
    const [show, setShow] = useState(false);

    // Retrieve value of "term_condition" key from localStorage, default to "NotAccepted" if not found
    let gt = localStorage.getItem("term_condition") || "NotAccepted";

    // Handle click event when user accepts the terms and conditions
    const handleAccept = () => {
        setShow(false);
        localStorage.setItem("term_condition", "Accepted");
    };

    // Handle click event when user cancels the terms and conditions
    const handleCancel = () => {
        setShow(false);
        localStorage.setItem("term_condition", "NotAccepted");
    };

    // Use effect hook to check if the terms and conditions have been accepted or not, and show the window accordingly
    useEffect(() => {
        if (gt != "Accepted") {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [])

    // Render the terms and conditions window only if "show" is true
    return (
        show && (
            <div className={styles.window}>
                <div className={styles.child_window}>
                    <h1>Terms & Condition</h1>
                    <p className={styles.conditins}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate,
                        molestiae, veniam eius illum, fugit facere corrupti in blanditiis iure
                        ea enim? Id magnam delectus esse accusantium velit vitae nisi!
                        Officia?
                    </p>
                    <p className={styles.conditins}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam
                        id beatae deleniti laudantium quam, dolorum, numquam nobis asperiores
                        quisquam, nihil iure eum ipsam at iusto eveniet delectus rem a.
                    </p>
                    <p className={styles.conditins}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam
                        id beatae deleniti laudantium quam, dolorum, numquam nobis asperiores
                        quisquam, nihil iure eum ipsam at iusto eveniet delectus rem a.
                    </p>
                </div>
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={styles.btn} onClick={handleAccept}>
                        Accept
                    </button>
                </div>
            </div>
        )
    );
}