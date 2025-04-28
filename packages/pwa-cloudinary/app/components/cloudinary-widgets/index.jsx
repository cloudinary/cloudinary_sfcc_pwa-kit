import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { cloudinary } from '../../../config/default'

const RenderCloudinaryGalleryWidget = ({ cloudinaryImageGallery = {}, imageUrls, isProductSetOrBundle }) => {

    const renderGallery = async () => {
        const galleryOptions = imageUrls.galleryWidget.options
        galleryOptions.queryParam = cloudinary.CLD_PGW_TRACKING_PARAM
        if (typeof window !== 'undefined' && window.cloudinary && (window.cloudinary.galleryWidget || window.cldGalleryWidget)) {
            if (cloudinaryImageGallery.domain !== 'res.cloudinary.com') {
                galleryOptions.SecureDistribution = cloudinaryImageGallery.domain;
                galleryOptions.privateCdn = true;
            }
            if (window.cldGallery && !isProductSetOrBundle) {
                await window.cldGallery.update(galleryOptions)
            } else {
                window.cldGallery = window.cloudinary.galleryWidget ? window.cloudinary.galleryWidget(galleryOptions) : window.cldGalleryWidget.galleryWidget(galleryOptions)
                window.cldGallery.render()
            }
        }
    }

    useEffect(() => {
        if (cloudinaryImageGallery && cloudinaryImageGallery.galleryEnabled) {
            renderGallery()
        }
    }, [imageUrls, cloudinaryImageGallery])

    return <div id={`cld-gallery${cloudinaryImageGallery.cldPgwSuffix ? '-' + cloudinaryImageGallery.cldPgwSuffix : ''}`}></div>
}

RenderCloudinaryGalleryWidget.propTypes = {
    cloudinaryImageGallery: PropTypes.object,
    isProductSetOrBundle: PropTypes.bool
}

export default RenderCloudinaryGalleryWidget
