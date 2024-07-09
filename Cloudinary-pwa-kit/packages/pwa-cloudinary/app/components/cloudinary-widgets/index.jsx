import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { cloudinary } from '../../../config/default'

const RenderCloudinaryGalleryWidget = ({ cloudinaryImageGallery = {} }) => {

    useEffect(() => {
        const cloudinaryObj = cloudinaryImageGallery
        const gallery = document.querySelector('#cld-gallery');
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild)
        }
        if (cloudinaryObj && cloudinaryObj.galleryEnabled) {
            let galleryOptions = cloudinaryObj.cloudinaryImage.galleryWidget.options
            galleryOptions.queryParam = cloudinary.CLD_PGW_TRACKING_PARAM
            if (typeof window !== 'undefined' && window.cloudinary && window.cloudinary.galleryWidget) {
                const cldGallery = window.cloudinary.galleryWidget(galleryOptions)
                cldGallery.render()
            }
        }
    }, [cloudinaryImageGallery])

    return <div id="cld-gallery"></div>
}

RenderCloudinaryGalleryWidget.propTypes = {
    cloudinaryImageGallery: PropTypes.object
}

export default RenderCloudinaryGalleryWidget
