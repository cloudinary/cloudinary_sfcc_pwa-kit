import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import DynamicImage from '../dynamic-image'
import $ from 'jquery'

const CloudinaryPlpImage = ({cloudinaryImage = {}, dynamicImageProps = {}, image = {}}) => {
    if (typeof window !== 'undefined' && cloudinaryImage.url) {
        useEffect(() => {
            var width = cloudinaryImage.c_autoResponsiveDimensions.replace(
                'auto',
                window.innerWidth
            )
            var replacedUrl = cloudinaryImage.url.replace(
                cloudinaryImage.c_autoResponsiveDimensions,
                width
            )
            cloudinaryImage.url = replacedUrl
        })
    }
    return (
        <DynamicImage
            src={`${cloudinaryImage.url}[?sw={width}&q=60]`}
            widths={dynamicImageProps?.widths}
            imageProps={{
                alt: image.alt,
                ...dynamicImageProps?.imageProps,
            }}
        />
    )
}

CloudinaryPlpImage.propTypes = {
    cloudinaryImage: PropTypes.object,
    dynamicImageProps: PropTypes.object,
    image: PropTypes.object
}

export default CloudinaryPlpImage
