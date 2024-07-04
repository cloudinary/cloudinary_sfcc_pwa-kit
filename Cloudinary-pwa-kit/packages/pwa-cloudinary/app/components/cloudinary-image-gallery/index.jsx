/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {AspectRatio, Box, Img, Flex, ListItem, List, useMultiStyleConfig} from '@chakra-ui/react'
import DynamicImage from '@salesforce/retail-react-app/app/components/dynamic-image'
import RenderCloudinaryGalleryWidget from '../../components/cloudinary-widgets'
import RenderCloudinaryVideoPlayer from '../../components/cloudinary-product-video'

const EnterKeyNumber = 13

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryImageGallery = ({size, cloudinaryImageGallery = {}}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    let imageUrls

    useEffect(() => {
        if (
            document.querySelector(
                `script[src="${`https://product-gallery.cloudinary.com/all.js`}"]`
            ) !== null
        ) {
            setIsScriptLoaded(true)
        } else if (cloudinaryImageGallery?.galleryEnabled) {
            const script = document.createElement('script')
            script.src = `https://product-gallery.cloudinary.com/all.js`
            script.onload = () => {
                setIsScriptLoaded(true)
            }
            document.head.appendChild(script)
        }
    }, [])

    const styles = useMultiStyleConfig('ImageGallery', {size})
    if (!cloudinaryImageGallery.galleryEnabled) {
        imageUrls = cloudinaryImageGallery?.images?.imageURLs
    }
    const imageUrl = imageUrls ? imageUrls[selectedIndex] : null
    return (
        <Flex direction="column">
            {cloudinaryImageGallery.galleryEnabled && isScriptLoaded ? (
                <>
                    <RenderCloudinaryGalleryWidget
                        cloudinaryImageGallery={cloudinaryImageGallery}
                    />
                </>
            ) : (
                <>
                    {imageUrls && (
                        <>
                            <Box {...styles.heroImageGroup}>
                                <AspectRatio {...styles.heroImage} ratio={1}>
                                    <DynamicImage src={`${imageUrl.url.lastIndexOf('?') > -1 ? imageUrl.url.substring(0, imageUrl.url.lastIndexOf('?')) + '?_i=AP3' : imageUrl.url + '?_i=AP3'}[?sw={width}&q=60]`} />
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
                                                <Img src={image.url.lastIndexOf('?') > -1 ? image.url.substring(0, image.url.lastIndexOf('?')) + '?_i=AP3' : image.url + '?_i=AP3'} />
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
    cloudinaryImageGallery: PropTypes.object
}

export default CloudinaryImageGallery
