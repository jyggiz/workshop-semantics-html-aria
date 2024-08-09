import React, { useState, useRef } from "react"
import BodyClassName from "react-body-classname"
import {Helmet} from "react-helmet"
import HeaderPortal from "components/header-portal"

import "components/styles/page-submit-listing.scss"

const SubmitListingPage = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [errorAnnouncement, setErrorAnnouncement] = useState(false);
    const inputRefs = useRef([]);

    const [formState, setFormState] = useState({
       sitename: '',
       location: '',
       fee: 0,
       legalToCamp: true,
       submitterName: '',
       email: '',
       notes: '', 
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        setIsDirty(true);
        setFormState((previousState) => ({
            ...previousState,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        let firstEmptyElementIndex = null;
        const formElements = Array.from(event.target.elements);

        formElements.forEach((element, index) => {
            switch (element.type) {
                case "submit":
                    return;

                default:
                    setIsDirty(false);

                    const hasError = element.type !== 'checkbox'
                        ? element.value.trim().length === 0
                        : !element.checked;

                    if (hasError) {
                        if (firstEmptyElementIndex === null) {
                            firstEmptyElementIndex = index;
                            inputRefs.current[index].focus();
                        } 
                        
                        setErrorAnnouncement('Required fields cannot be empty');
                    }
                break;
            }
        })
    };

    return (
        <BodyClassName className="header-overlap page-submit-listing">
            <>
                <HeaderPortal>
                    <h1 className="visually-hidden">CampSpots</h1>
                </HeaderPortal>
                <section aria-labelledby="heading-1">
                    <header className="page-header">
                        <div className="page-header-content layout">
                            <h2 className="primary-heading h1-style" id="heading-1">Submit Your Spot</h2>
                        </div>
                    </header>
                    <article className="form-wrap">
                        <div className="layout">
                            <h3>Got a camping spot our community would enjoy? Tell us about it!</h3>
                            <form
                                action=""
                                onSubmit={handleSubmit}
                                className={isDirty ? 'dirty' : ''}
                            >
                                <p className="error" role="alert" aria-relevant="all">{errorAnnouncement}</p>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="submitterName">Your name <span className="asterisk" abbr="required" aria-hidden="true">*</span></label>
                                        <input
                                            type="text"
                                            id="submitterName"
                                            onChange={handleChange}
                                            aria-invalid={isFormSubmitted &&
                                                formState.submitterName.length === 0 ? 'true' : null
                                            }
                                            ref={(inputRef) => {
                                                inputRefs.current.push(inputRef);
                                            }}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">Your email address <span className="asterisk" abbr="required">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                            onChange={handleChange}
                                            aria-invalid={isFormSubmitted &&
                                                formState.email.length === 0 ? 'true' : null
                                            }
                                            ref={(inputRef) => {
                                                inputRefs.current.push(inputRef);
                                            }}/>
                                    </div>
                                </div>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="sitename">Site Name <span className="asterisk" abbr="required">*</span></label>
                                        <input type="text" id="sitename" onChange={handleChange}
                                            aria-invalid={isFormSubmitted &&
                                                formState.sitename.length === 0 ? 'true' : null
                                            }
                                            ref={(inputRef) => {
                                                inputRefs.current.push(inputRef);
                                            }}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="location">Location <span className="asterisk" abbr="required">*</span></label>
                                        <input type="text" id="location" onChange={handleChange} 
                                        
                                        aria-invalid={isFormSubmitted &&
                                            formState.location.length === 0 ? 'true' : null
                                        }
                                        ref={(inputRef) => {
                                            inputRefs.current.push(inputRef);
                                        }}
                                        />
                                    </div>
                                </div>
                                <div className="two-parts-50-50">
                                    <div className="form-field">
                                        <label htmlFor="fee">Nightly fee</label>
                                        <input type="number" id="fee" placeholder="$" onChange={handleChange}
                                            aria-invalid={isFormSubmitted &&
                                                formState.fee === 0 ? 'true' : null
                                            }
                                            ref={(inputRef) => {
                                                inputRefs.current.push(inputRef);
                                            }}
                                            />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="ownership">
                                            Can the public legally camp here? <span className="asterisk" abbr="required">*</span>
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="legalToCamp"
                                            name="ownership"
                                            value="Owned"
                                            onChange={handleChange}
                                            aria-invalid={isFormSubmitted &&
                                                formState.legalToCamp ? 'true' : null}
                                                ref={(inputRef) => {
                                                    inputRefs.current.push(inputRef);
                                                }}
                                            />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="notes">Notes</label>
                                    <textarea id="notes" onChange={handleChange}
                                        aria-invalid={isFormSubmitted &&
                                            formState.notes.length === 0 ? 'true' : null
                                        }
                                        ref={(inputRef) => {
                                            inputRefs.current.push(inputRef);
                                        }}
                                        ></textarea>
                                </div>
                                <p id="key" className="asterisk">* Fields are required.</p>
                                <div className="form-submit">
                                    <button className="btn-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </>
        </BodyClassName>
    )
}

export default SubmitListingPage