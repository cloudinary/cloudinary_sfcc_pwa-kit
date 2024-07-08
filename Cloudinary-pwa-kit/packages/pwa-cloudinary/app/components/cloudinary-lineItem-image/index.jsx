import React from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryLineItemImage = ({ cldProduct = {}, image = {} }) => {
    return (
        <>
            {cldProduct?.miniCartImage?.url ? (
                <Box w="24" flex="none">
                    <AspectRatio ratio="1">
                        <img src={cldProduct?.miniCartImage?.url.lastIndexOf('?') > -1 ? cldProduct?.miniCartImage?.url.substring(0, cldProduct?.miniCartImage?.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct?.miniCartImage?.url + cloudinary.CLD_TRACKING_PARAM} alt={image && image.alt ? image.alt : null} />
                    </AspectRatio>
                </Box>
            ) : (
                <>
                    {cldProduct?.url && (
                        <Image
                            alt={image.alt}
                            src={`${cldProduct.url.lastIndexOf('?') > -1 ? cldProduct.url.substring(0, cldProduct.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct.url + cloudinary.CLD_TRACKING_PARAM}`}
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
