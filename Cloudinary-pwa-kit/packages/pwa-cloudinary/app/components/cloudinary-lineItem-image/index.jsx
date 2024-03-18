import React from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryLineItemImage = ({ cldProduct = {}, image = {} }) => {
    return (
        <>
            {cldProduct?.miniCartImage?.url ? (
                <Box w="24" flex="none">
                    <AspectRatio ratio="1">
                        <img src={cldProduct?.miniCartImage?.url} alt={image && image.alt ? image.alt : null} />
                    </AspectRatio>
                </Box>
            ) : (
                <>
                    {cldProduct?.url && (
                        <Image
                            alt={image.alt}
                            src={`${cldProduct.url}`}
                            ignoreFallback={true}
                        />
                    )}
                </>
            )
            }
        </>
    )
}

CloudinaryLineItemImage.propTypes = {
    cldProduct: PropTypes.object,
    image: PropTypes.object
}

export default CloudinaryLineItemImage
