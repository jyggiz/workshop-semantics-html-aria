import React from "react"
import BodyClassName from "react-body-classname"
import sanitizeHtml from "sanitize-html"
import {Helmet} from "react-helmet"
import LoadedImageUrl from "components/utils/loaded-image-url"
import HeaderPortal from "./header-portal"

import "components/styles/page-listings.scss"

import Icon from "components/icon"
import ListingsData from "data/listings.json"
import DatePicker from "components/date-picker/date-picker"

import * as imageURLs from "../images/listings/*.{png,jpg}"

const Listing = props => {
    const data = ListingsData.listings[props.id]
    const headerImageUrl = LoadedImageUrl(imageURLs, data.detailHeaderImageSrc)
    return (
        <BodyClassName className="header-overlap page-listing-detail">
            <>
                <article aria-label={data.listingName}>
                    <header
                        className="page-header"
                        style={{backgroundImage: `url(${headerImageUrl}`}}
                    >
                        <HeaderPortal>
                            <h1 className="visually-hidden">Campspots - {data.listingName}</h1>
                        </HeaderPortal>
                        <div className="page-header-content wide-layout">
                            <h2 className="listing-name">{data.listingName}</h2>
                            <p className="location">{data.location}</p>
                        </div>
                    </header>
                    <section className="wide-layout two-parts-70-30" aria-label={`${data.listingName} Description`}>
                        <div>
                            <h3 class="h4-style">Description</h3>
                            <div className="description-text" dangerouslySetInnerHTML={{__html: sanitizeHtml(data.description)}} />

                            <h3 className="h4-style">Amenities</h3>
                            <div className="amenity-icons grid">
                            {data.amenities.map((amenity, index) => {
                                return <div key={index}>
                                    <Icon name={amenity} showText={true} />
                                </div>
                            })}
                            </div>
                        </div>
                        <div>
                            <h3 className="h4-style">Calendar</h3>
                            <DatePicker />
                        </div>
                    </section>
                    <section className="wide-layout">
                        <h3 className="h4-style">Image Gallery</h3>
                        <div className="detail-images">
                            {data.detailImages.map((image, index) => {
                                let detailImageUrl = LoadedImageUrl(imageURLs, image.imageSrc)
                                return <img
                                    key={index}
                                    src={detailImageUrl}
                                    alt={image.imageAlt}
                                />
                            })}
                        </div>
                    </section>
                </article>
            </>
        </BodyClassName>
    )
}

export default Listing