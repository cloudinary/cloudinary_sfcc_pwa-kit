import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Img } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'
import { updateTrackingParam } from '../../utils/imageSrcset'

const CloudinaryPlpImage = ({ cloudinaryImage = {}, image = {} }) => {
    if (typeof window !== 'undefined' && cloudinaryImage.url) {
        useEffect(() => {
            const replacedUrl = cloudinaryImage.url.replace('w_auto,c_scale', 'w_auto,c_limit')
            cloudinaryImage.url = replacedUrl
        }, [])
    }
    return (
        <Img className={cloudinaryImage?.isResponsive && 'cld-responsive'}
            src={`${cloudinaryImage.url.lastIndexOf('?') > -1 ? cloudinaryImage.url.substring(0, cloudinaryImage.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cloudinaryImage.url + cloudinary.CLD_TRACKING_PARAM}`}
            alt={image?.alt}
            srcSet={!cloudinaryImage?.isResponsive && cloudinaryImage.srcset && updateTrackingParam(cloudinaryImage.srcset)}
            sizes={!cloudinaryImage?.isResponsive && cloudinaryImage?.sizes}
        />
    )
}

CloudinaryPlpImage.propTypes = {
    cloudinaryImage: PropTypes.object,
    dynamicImageProps: PropTypes.object,
    image: PropTypes.object
}

export default CloudinaryPlpImage
