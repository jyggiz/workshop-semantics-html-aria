import React, {useState, useRef, useEffect} from "react"
import PropTypes from "prop-types"
import LoadedImageUrl from "components/utils/loaded-image-url"

import "components/slideshow/slideshow.scss"

const Slideshow = ({images = [], imageURLs}) => {
    let [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    let [fullScreenMode, setFullScreenMode] = useState(false)
    
    const btnFullScreenRef = useRef(null)
    const btnCloseRef = useRef(null)
    const slideshowRef = useRef(null)

    const decrementSlide = () => {
        setCurrentSlideIndex((prevSlideIndex) => prevSlideIndex > 0 ? prevSlideIndex - 1 : images.length - 1);
    }
    const incrementSlide = () => {
        setCurrentSlideIndex((prevSlideIndex) => prevSlideIndex < images.length - 1
            ? prevSlideIndex + 1
            : 0);
    }
    const changeSlide = (index) => {
        setCurrentSlideIndex(index)
    }
    const enterFullScreen = () => {
        setFullScreenMode(true);
        slideshowRef.current.focus();
        document.querySelector('main').style.zIndex = 2;
    }
    const closeFullScreen = () => {
        setFullScreenMode(false);
        btnFullScreenRef.current.focus();
        document.querySelector('main').style.zIndex = 0;
    }
    const handleScreenClick = (event) => {
        if (!slideshowRef.current.contains(event.target) && !event.target.hasAttribute('data-bullet')) {
            setFullScreenMode(false)
        }
    }

    const handleKeyUp = (event) => {
        event.preventDefault();

        if (event.key === 'Escape') {
            closeFullScreen();
        }

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            incrementSlide();
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            decrementSlide();
        }
    };

    const addKeyboardListeners = (hasFullScreen) => {
        if (hasFullScreen) {
            window.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            if (!hasFullScreen) {
                return;
            }

            window.removeEventListener('keyup', handleKeyUp);
        }
    };

    useEffect(() => {
        const dispose = addKeyboardListeners(fullScreenMode);

        return () => {
            dispose();
        }
    }, [fullScreenMode]);

    return (
        <>
            <button
                aria-label="Enter Full Screen"
                className="btn-slideshow-fullscreen" 
                onClick={enterFullScreen}
                ref={btnFullScreenRef}
                title="Enter Full Screen"
            >
                <span className="icon"></span>
            </button>
            <div
                className={`inspiration-slideshow ${fullScreenMode ? 'fullscreen' : ''}`}
                onClick={(event)=>handleScreenClick(event)}
            >
                <div
                    className="slideshow-container"
                    ref={slideshowRef}
                    role={fullScreenMode ? 'application' : 'region'}
                    aria-live="polite"
                    aria-roledescription="Image Gallery"
                    tabIndex="-1"
                    aria-relevant="all"
                >
                    <button
                        aria-label="Close Full Screen mode"
                        className="btn-slideshow-close"
                        onClick={closeFullScreen}
                        ref={btnCloseRef}
                    >
                        <span aria-hidden="true" className="icon"></span>
                    </button>
                    {images.map((image, index) => {
                        const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src
                        return (
                            <figure
                                aria-describedby={`count-${index}`}
                                aria-labelledby={`img-${index} caption-${index}`}
                                className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`}
                                key={index}
                            >
                                <p className="numbertext" id={`count-${index}`}>
                                    {index + 1} of {images.length}
                                </p>
                                <img 
                                    src={imageUrl} 
                                    alt={image.alt} 
                                    style={{width: "100%"}} 
                                    id={`img-${index}`} 
                                />
                                <figcaption 
                                    className="text" 
                                    id={`caption-${index}`}
                                >
                                    {image.caption}
                                </figcaption>
                            </figure>
                        )
                    })}

                    <button
                        aria-label="Previous slide"
                        className="prev"
                        onClick={decrementSlide}>
                        &#10094;
                    </button>
                    <button
                        aria-label="Next slide"
                        className="next"
                        onClick={incrementSlide}
                    >
                        &#10095;
                    </button>
                </div>
                <br />

                <ul className="dots">
                    {images.map((image, index) => (
                    <li key={index}>
                        <button
                            aria-label={`Go to slide ${index + 1}`}
                            className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
                            onClick={() => changeSlide(index)}
                            data-bullet
                        ></button>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

Slideshow.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        caption: PropTypes.string
    })),
    imageURLs: PropTypes.object
}

export default Slideshow