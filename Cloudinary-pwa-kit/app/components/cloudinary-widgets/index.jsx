'use strict'

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'


const RenderCloudinaryGalleryWidget = ({ cloudinaryImageGallery = {} }) => {

    useEffect(() => {
        var cloudinaryObj = cloudinaryImageGallery
        if (cloudinaryObj) {
            if (cloudinaryObj.galleryEnabled) {
                $('.cld-gallery').empty()
                var galleryOptions = cloudinaryObj.cloudinaryImage.galleryWidget.options
                if (
                    typeof window !== 'undefined' &&
                    window.cloudinary &&
                    window.cloudinary &&
                    cloudinary.galleryWidget
                ) {
                    window.cldGallery = cloudinary.galleryWidget(galleryOptions) // eslint-disable-line no-undef
                    cldGallery ? cldGallery.render() : null // eslint-disable-line no-undef
                }
            }
        }
    })
    return <div id="cld-gallery"></div>
}

RenderCloudinaryGalleryWidget.propTypes = {
    cloudinaryImageGallery: PropTypes.object,
}

export default RenderCloudinaryGalleryWidget
