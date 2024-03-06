import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryLineItemImage = ({ cldProduct = {}, image = {} }) => {
    const [url, setUrl] = useState(null)
    if (cldProduct.miniCartImage && cldProduct.miniCartImage.url) { // Render CLD Image URL for Mini Cart
        setUrl(cldProduct.miniCartImage.url)
    } else if (cldProduct.url) { // Render CLD Image URL for (Cart Checkout Order Confirmation Order History and Order Detail)
        setUrl(cldProduct.url)
    }

    return (
        <>
            {cldProduct && cldProduct.miniCartImage && url ? (
                <Box w="24" flex="none">
                    <AspectRatio ratio="1">
                        <img src={url} alt={image && image.alt ? image.alt : null} />
                    </AspectRatio>
                </Box>
            ) : (
                <>
                    {cldProduct.url && (
                        <Image
                            alt={image.alt}
                            src={`${url}`}
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
