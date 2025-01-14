import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Img } from '@chakra-ui/react'
import { updateTrackingParam, updateCloudinarySource } from '../../utils/imageSrcset'

const CloudinaryPlpImage = ({ cloudinaryImage = {}, image = {} }) => {
    if (typeof window !== 'undefined' && cloudinaryImage.url) {
        useEffect(() => {
            const replacedUrl = cloudinaryImage.url.replace('w_auto,c_scale', 'w_auto,c_limit')
            cloudinaryImage.url = replacedUrl

            if (cloudinaryImage?.isResponsive) {
                window.cldObj = window.cldObj || window.cloudinary.default.Cloudinary.new({cloud_name: cloudinaryImage.cloudName || cloudinaryImage})
                window.cldObj?.responsive()
            }
        }, [])
    }
    return (
        <>
            {cloudinaryImage?.isResponsive ? (
                <Img 
                    className={'cld-responsive'}
                    alt={image.alt}
                    data-src={updateCloudinarySource(cloudinaryImage.url)}
                />
            ) : (
                <Img
                    src={updateCloudinarySource(cloudinaryImage.url)}
                    alt={image.alt}
                    srcSet={cloudinaryImage.srcset && updateTrackingParam(cloudinaryImage.srcset)}
                    sizes={cloudinaryImage.sizes && cloudinaryImage.sizes}
                />
            )}
        </>
    )
}

CloudinaryPlpImage.propTypes = {
    cloudinaryImage: PropTypes.object,
    image: PropTypes.object
}

export default CloudinaryPlpImage
