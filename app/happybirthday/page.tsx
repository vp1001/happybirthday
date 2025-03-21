"use client";

import { useState, useRef, useEffect } from 'react';
import { FaHandPointer } from 'react-icons/fa';
import styles from './page.module.css';

export default function HappyBirthday() {
    const slides = [
        { img: '/photo13.jpeg', text: "Look at that cute kiddo 🥰" },
        { img: '/photo14.jpeg', text: "As pretty as anyone can get 😍💯" },
        { img: '/photo11.jpeg', text: "To the the times that will always bring a smile to my face 💫" },
        { img: '/photo12.jpeg', text: "And to the PERSON who'll always bring a smile to my face 😁" },
        { img: '/photo15.jpeg', text: "Wish you a very Happy Birthday 🎂 Thanks for always staying by me ❤️" },
        { img: '/photo16.jpeg', text: "You're an amazing friend 💖 Love you loads!" }
    ];

    const [current, setCurrent] = useState(0);
    const [started, setStarted] = useState(false);
    const [flipping, setFlipping] = useState(false);
    const [showIndicator, setShowIndicator] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (started) {
            audioRef.current?.play().catch(e => console.log("Interaction needed:", e));
        }
    }, [started]);

    const nextSlide = () => {
        if (showIndicator) setShowIndicator(false); // hide indicator after first click

        setFlipping(true);
        setTimeout(() => {
            setCurrent(prev => (prev + 1) % slides.length);
            setFlipping(false);
        }, 600);
    };

    if (!started) {
        return (
            <div className={styles.landingContainer}>
                <h1 className={styles.landingText}>🎉 Whose Birthday is it today? 🎈</h1>
                <button className={styles.startButton} onClick={() => setStarted(true)}>
                    Anvi's ✨
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <audio ref={audioRef} src="/music.mp4" loop />
            <div className={styles.bookContainer} onClick={nextSlide}>
                <div className={`${styles.book} ${flipping ? styles.flip : ''}`}>
                    <img src={slides[current].img} alt={`Slide ${current + 1}`} />
                </div>

                {showIndicator && (
                    <div className={styles.clickIndicator}>
                        <FaHandPointer />
                    </div>
                )}
            </div>
            <div className={styles.text}>
                <h2>{slides[current].text}</h2>
            </div>
        </div>
    );
}
