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
                        <Image className={cldProduct?.miniCartImage?.isResponsive && 'cld-responsive'}
                            src={cldProduct?.miniCartImage?.url}
                            srcset={!cldProduct?.miniCartImage?.isResponsive && cldProduct?.miniCartImage?.srcset}
                            sizes={!cldProduct?.miniCartImage?.isResponsive && cldProduct?.miniCartImage?.sizes}
                        />
                    </AspectRatio>
                </Box>
            ) : (
                <>
                    {cldProduct?.url && (
                        <Image
                            className={cldProduct?.isResponsive && 'cld-responsive'}
                            alt={image.alt}
                            src={`${cldProduct.url}`}
                            srcset={!cldProduct.isResponsive && cldProduct.srcset}
                            sizes={!cldProduct.isResponsive && cldProduct.sizes}
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
