import React from "react"
import PropTypes from "prop-types"
import { Link } from "@reach/router"

import Icon from "components/icon"
import "components/styles/listing.scss"

const ListingExcerpt = ({id, data, image}) => {
    const { listingName = '', location = '', listingType = '', excerpt = '', amenities = [] } = data
    return (
        <div className="listing-excerpt">
            <Link to={`/listing/${id}`}>
                <img src={image} alt={listingName} />
            </Link>
            <div>
                <div className="header">
                    <div>
                        <h1>{listingName}</h1>
                        <p>{location} • {listingType}</p>
                    </div>
                    <ul className="amenity-icons">
                        {amenities.map((amenity, index) => {
                            return <li key={index}>
                                <Icon name={amenity} />
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    <p>{excerpt}</p>
                    <p><Link to={`/listing/${id}`} aria-label={`Read more about ${listingName}`}>Read more</Link></p>
                </div>
            </div>
        </div>    
    )
}

ListingExcerpt.propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
        listingName: PropTypes.string,
        location: PropTypes.string,
        listingType: PropTypes.string,
        imageSrc: PropTypes.string,
        excerpt: PropTypes.string,
        amenities: PropTypes.array
    }),
    image: PropTypes.string
}

export default ListingExcerpt