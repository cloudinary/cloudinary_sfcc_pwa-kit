import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    AspectRatio,
    Box,
    Img,
    Flex,

    // Hooks
    ListItem,
    List,
    useMultiStyleConfig
} from '@chakra-ui/react'
import DynamicImage from '@salesforce/retail-react-app/app/components/dynamic-image'

import RenderCloudinaryGalleryWidget from '../../components/cloudinary-widgets'
import RenderCloudinaryVideoPlayer from '../../components/cloudinary-product-video'

const EnterKeyNumber = 13

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryImageGallery = ({ size, cloudinaryImageGallery = {} }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const styles = useMultiStyleConfig('ImageGallery', { size })
    var imageUrls
    if (!cloudinaryImageGallery.galleryEnabled) {
        imageUrls = cloudinaryImageGallery.images.imageURLs
    }
    const imageUrl = imageUrls ? imageUrls?.[selectedIndex] : null
    return (
        <Flex direction="column">
            {cloudinaryImageGallery.galleryEnabled ? (
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
                                    <DynamicImage src={`${imageUrl.url}[?sw={width}&q=60]`} />
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
                                                <Img src={image.url} />
                                            </AspectRatio>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </>
                    )}
                </>
            )}
            {cloudinaryImageGallery.videoEnabled && cloudinaryImageGallery.video && cloudinaryImageGallery.video.videoURL && (
                <>
                    <Box mt={3}>
                        <RenderCloudinaryVideoPlayer cloudinaryImageGallery={cloudinaryImageGallery} />
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
