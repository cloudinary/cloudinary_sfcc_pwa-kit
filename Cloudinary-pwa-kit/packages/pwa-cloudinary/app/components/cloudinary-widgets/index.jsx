import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { cloudinary } from '../../../config/default'

const RenderCloudinaryGalleryWidget = ({ cloudinaryImageGallery = {} }) => {

    const renderGallery = async () => {
        const gallery = document.querySelector('#cld-gallery')
        const galleryOptions = cloudinaryImageGallery.cloudinaryImage.galleryWidget.options
        galleryOptions.queryParam = cloudinary.CLD_PGW_TRACKING_PARAM
        if (typeof window !== 'undefined' && window.cloudinary && window.cloudinary.galleryWidget) {
            if (window.cldGallery) {
                gallery.style.visibility = 'hidden'
                await cldGallery.update(galleryOptions)
                gallery.style.visibility = 'visible'
            } else {
                window.cldGallery = window.cloudinary.galleryWidget(galleryOptions)
                cldGallery.render()
            }
        }
    }
    
    useEffect(() => {
        if (cloudinaryImageGallery && cloudinaryImageGallery.galleryEnabled) {
            renderGallery()
        }
    }, [cloudinaryImageGallery])

    return <div id="cld-gallery"></div>
}

RenderCloudinaryGalleryWidget.propTypes = {
    cloudinaryImageGallery: PropTypes.object
}

export default RenderCloudinaryGalleryWidget
