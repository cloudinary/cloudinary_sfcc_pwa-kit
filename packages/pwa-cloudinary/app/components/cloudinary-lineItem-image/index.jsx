import React from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'
import { updateTrackingParam } from '../../utils/imageSrcset'

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
                            src={cldProduct?.miniCartImage?.url.lastIndexOf('?') > -1 ? cldProduct?.miniCartImage?.url.substring(0, cldProduct?.miniCartImage?.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct?.miniCartImage?.url + cloudinary.CLD_TRACKING_PARAM} alt={image && image.alt ? image.alt : null}
                            srcSet={!cldProduct?.miniCartImage?.isResponsive && cldProduct?.miniCartImage?.srcset && updateTrackingParam(cldProduct?.miniCartImage?.srcset)}
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
                            src={`${cldProduct.url.lastIndexOf('?') > -1 ? cldProduct.url.substring(0, cldProduct.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct.url + cloudinary.CLD_TRACKING_PARAM}`}
                            srcSet={!cldProduct.isResponsive && cldProduct.srcset && updateTrackingParam(cldProduct.srcset)}
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
