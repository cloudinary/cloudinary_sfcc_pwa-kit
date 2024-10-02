import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'
import { updateTrackingParam } from '../../utils/imageSrcset'

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryLineItemImage = ({ cldProduct = {}, image = {}, cloudName }) => {

    useEffect(() => {
        if (cldProduct?.miniCartImage?.isResponsive || cldProduct?.isResponsive) {
            window.cldObj = window.cldObj || window?.cloudinary?.default?.Cloudinary?.new({cloud_name: cloudName || cldProduct}); // eslint-disable-line no-undef
            window?.cldObj?.responsive();
        }
    }, [])

    return (
        <>
            {cldProduct?.miniCartImage?.url ? (
                <Box w="24" flex="none">
                    <AspectRatio ratio="1">
                        {cldProduct?.miniCartImage?.isResponsive ? (
                            <Image className={'cld-responsive'}
                                data-src={cldProduct?.miniCartImage?.url.lastIndexOf('?') > -1 ? cldProduct?.miniCartImage?.url.substring(0, cldProduct?.miniCartImage?.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct?.miniCartImage?.url + cloudinary.CLD_TRACKING_PARAM} alt={image && image.alt ? image.alt : null}
                            />
                        ) : (
                            <Image
                                src={cldProduct?.miniCartImage?.url.lastIndexOf('?') > -1 ? cldProduct?.miniCartImage?.url.substring(0, cldProduct?.miniCartImage?.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct?.miniCartImage?.url + cloudinary.CLD_TRACKING_PARAM} alt={image && image.alt ? image.alt : null}
                                srcSet={cldProduct?.miniCartImage?.srcset && updateTrackingParam(cldProduct?.miniCartImage?.srcset)}
                                sizes={cldProduct?.miniCartImage?.sizes && cldProduct?.miniCartImage?.sizes}
                            />
                        )}
                    </AspectRatio>
                </Box>
            ) : (
                <>
                    {cldProduct?.url && (
                        <>
                            {cldProduct?.isResponsive ? (
                                <Image
                                    className={'cld-responsive'}
                                    alt={image.alt}
                                    data-src={cldProduct.url.lastIndexOf('?') > -1 ? cldProduct.url.substring(0, cldProduct.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct.url + cloudinary.CLD_TRACKING_PARAM}
                                />
                            ) : (
                                <Image
                                    alt={image.alt}
                                    src={cldProduct.url.lastIndexOf('?') > -1 ? cldProduct.url.substring(0, cldProduct.url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM : cldProduct.url + cloudinary.CLD_TRACKING_PARAM}
                                    srcset={cldProduct.srcset && updateTrackingParam(cldProduct.srcset)}
                                    sizes={cldProduct.sizes && cldProduct.sizes}
                                />
                            )}
                        </>

                    )}
                </>
            )
            }
        </>
    )
}

CloudinaryLineItemImage.propTypes = {
    cldProduct: PropTypes.object,
    image: PropTypes.object,
    cloudName: PropTypes.string
}

export default CloudinaryLineItemImage
