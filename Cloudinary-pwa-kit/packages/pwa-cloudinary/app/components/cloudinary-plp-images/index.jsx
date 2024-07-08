import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import DynamicImage from '@salesforce/retail-react-app/app/components/dynamic-image'
import { cloudinary } from '../../../config/default'

const CloudinaryPlpImage = ({ cloudinaryImage = {}, dynamicImageProps = {}, image = {} }) => {
    if (typeof window !== 'undefined' && cloudinaryImage.url) {
        useEffect(() => {
            const width = cloudinaryImage.c_autoResponsiveDimensions.replace(
                'auto',
                window.innerWidth
            )
            const replacedUrl = cloudinaryImage.url.replace(
                cloudinaryImage.c_autoResponsiveDimensions,
                width
            )
            cloudinaryImage.url = replacedUrl
        }, [])
    }
    return (
        <DynamicImage
            src={`${cloudinaryImage.url.lastIndexOf('?') > -1 ? cloudinaryImage.url.substring(0, cloudinaryImage.url.lastIndexOf('?')) + cloudinary?.CLD_TRACKING_PARAM : cloudinaryImage.url + cloudinary?.CLD_TRACKING_PARAM}`}
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
