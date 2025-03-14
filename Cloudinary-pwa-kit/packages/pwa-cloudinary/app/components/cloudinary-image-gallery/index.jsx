/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Img, Flex, ListItem, List, useMultiStyleConfig } from '@chakra-ui/react'
import RenderCloudinaryGalleryWidget from '../../components/cloudinary-widgets'
import RenderCloudinaryVideoPlayer from '../../components/cloudinary-product-video'
import { cloudinary } from '../../../config/default'
import { updateTrackingParam } from '../../utils/imageSrcset'

const EnterKeyNumber = 13

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryImageGallery = ({ size, cloudinaryImageGallery = {}, selectedVariationAttributes, isProductSetOrBundle }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    let imageUrls

    useEffect(() => {
        if (
            document.querySelector(
                `script[src="${`https://product-gallery.cloudinary.com/all.js`}"]`
            ) !== null && !isProductSetOrBundle
        ) {
            setIsScriptLoaded(true)
        } else if (cloudinaryImageGallery?.galleryEnabled) {
            const script = document.createElement('script')
            script.src = `https://product-gallery.cloudinary.com/all.js`
            script.onload = () => {
                setIsScriptLoaded(true)
                window.cldGalleryWidget = window.cloudinary
            }
            document.head.appendChild(script)
        }
    }, [cloudinaryImageGallery])

    const styles = useMultiStyleConfig('ImageGallery', { size })
    const selectedVariant = cloudinaryImageGallery?.pdpImages?.find(data => {
        if (data.color && data.color === selectedVariationAttributes?.color) {
            return data
        }
    })
    if (selectedVariant) {
        imageUrls = cloudinaryImageGallery.galleryEnabled ? selectedVariant.images : selectedVariant?.images.imageURLs
    } else {
        imageUrls = cloudinaryImageGallery.galleryEnabled ? cloudinaryImageGallery.pdpImages[0].images : cloudinaryImageGallery.pdpImages[0].images?.imageURLs
    }
    const imageUrl = !cloudinaryImageGallery.galleryEnabled ? imageUrls[selectedIndex] : null
    return (
        <Flex direction="column">
            {cloudinaryImageGallery.galleryEnabled && isScriptLoaded ? (
                <>
                    <RenderCloudinaryGalleryWidget
                        cloudinaryImageGallery={cloudinaryImageGallery}
                        imageUrls={imageUrls}
                        selectedVariationAttributes={selectedVariationAttributes}
                        isProductSetOrBundle={isProductSetOrBundle}
                    />
                </>
            ) : (
                <>
                    {imageUrls?.length > 0 && (
                        <>
                            <Box {...styles.heroImageGroup}>
                                <AspectRatio {...styles.heroImage} ratio={1}>
                                    <Img className={imageUrl?.isResponsive && 'cld-responsive'}
                                        src={`${imageUrl.url.lastIndexOf('?') > -1 ? imageUrl.url.substring(0, imageUrl.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : imageUrl.url + cloudinary.CLD_TRACKING_PARAM}`}
                                        srcSet={!imageUrl?.isResponsive && imageUrl?.srcset && updateTrackingParam(imageUrl?.srcset)}
                                        sizes={!imageUrl?.isResponsive && imageUrl?.sizes}
                                    />
                                </AspectRatio>
                            </Box>
                            <List display={'flex'} flexWrap={'wrap'}>
                                {imageUrls.map((image, index) => {
                                    const selected = index === selectedIndex
                                    return (
                                        <ListItem
                                            {...styles.thumbnailImageItem}
                                            tabIndex={0}
                                            key={index}
                                            data-testid="image-gallery-thumbnails"
                                            onKeyDown={(e) => {
                                                if (e.keyCode === EnterKeyNumber) {
                                                    return setSelectedIndex(index)
                                                }
                                            }}
                                            onClick={() => setSelectedIndex(index)}
                                            borderColor={`${selected ? 'black' : ''}`}
                                            borderWidth={`${selected ? '1px' : 0}`}
                                        >
                                            <AspectRatio ratio={1}>
                                                <Img className={image?.isResponsive && 'cld-responsive'}
                                                    src={image.url.lastIndexOf('?') > -1 ? image.url.substring(0, image.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : image.url + cloudinary.CLD_TRACKING_PARAM}
                                                    srcSet={!image?.isResponsive && image?.srcset && updateTrackingParam(image?.srcset)}
                                                    sizes={!image?.isResponsive && image?.sizes}
                                                />
                                            </AspectRatio>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </>
                    )}
                </>
            )}
            {cloudinaryImageGallery.videoEnabled &&
                cloudinaryImageGallery.video &&
                cloudinaryImageGallery.video.videoURL && (
                    <>
                        <Box mt={3}>
                            <RenderCloudinaryVideoPlayer
                                cloudinaryImageGallery={cloudinaryImageGallery}
                            />
                        </Box>
                    </>
                )}
        </Flex>
    )
}

CloudinaryImageGallery.propTypes = {
    /**
     * Size of the Image gallery, this will be used to determined the max width from styles
     */
    size: PropTypes.string,
    /**
     * The images array to be rendered
     */
    cloudinaryImageGallery: PropTypes.object,
    isProductSetOrBundle: PropTypes.bool
}

export default CloudinaryImageGallery
