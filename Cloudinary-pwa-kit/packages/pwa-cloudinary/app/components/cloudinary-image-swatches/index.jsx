import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'

/**
 * The swatch images displays The Swatch Images Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryImageSwatches = ({ cloudinaryImageGallery = {}, image = {}, value }) => {
    cloudinaryImageGallery.cldSwatchs.map((cldSwatch) => {
        const { variationAttrValueID, cldUrl } = cldSwatch
        if (value === variationAttrValueID) {
            image.disBaseLink = cldUrl.lastIndexOf('?') > -1 ? cldUrl.substring(0, cldUrl.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldUrl + cloudinary.CLD_TRACKING_PARAM
        }
    })
    return (
        <Box
            height="100%"
            width="100%"
            minWidth="32px"
            style={{
                backgroundImage: `url(${image.disBaseLink || image.link})`
            }}
        />
    )
}

CloudinaryImageSwatches.propTypes = {
    /**
     * The images array to be rendered
     */
    cloudinaryImageGallery: PropTypes.object,
    /**
     * The swatch image to be rendered
     */
    image: PropTypes.object,
    /**
     * The swatch image value to be rendered
     */
    value: PropTypes.string
}

export default CloudinaryImageSwatches
