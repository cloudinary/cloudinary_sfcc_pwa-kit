import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AspectRatio, Box, Image } from '@chakra-ui/react'
import { updateTrackingParam, updateCloudinarySource } from '../../utils/imageSrcset'

/**
 * The image gallery displays The Image Gallery Coming from Cloudinary in Product-Detail Page.
 */
const CloudinaryLineItemImage = ({ cldProduct = {}, image = {}, cloudName }) => {

    useEffect(() => {
        if (cldProduct?.miniCartImage?.isResponsive || cldProduct?.isResponsive) {
            window.cldObj = window.cldObj || window.cloudinary.default.Cloudinary.new({cloud_name: cloudName || cldProduct})
            window.cldObj?.responsive()
        }
    }, [])

    return (
        <>
            {cldProduct?.miniCartImage?.url ? (
                <Box w="24" flex="none">
                    <AspectRatio ratio="1">
                        {cldProduct?.miniCartImage?.isResponsive ? (
                            <Image className={'cld-responsive'}
                                data-src={updateCloudinarySource(cldProduct.miniCartImage.url)} alt={image?.alt}
                            />
                        ) : (
                            <Image
                                src={updateCloudinarySource(cldProduct.miniCartImage.url)} alt={image?.alt}
                                srcSet={cldProduct.miniCartImage.srcset && updateTrackingParam(cldProduct.miniCartImage.srcset)}
                                sizes={cldProduct.miniCartImage.sizes && cldProduct.miniCartImage.sizes}
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
                                    data-src={updateCloudinarySource(cldProduct.url)}
                                />
                            ) : (
                                <Image
                                    alt={image.alt}
                                    src={updateCloudinarySource(cldProduct.url)}
                                    srcSet={cldProduct.srcset && updateTrackingParam(cldProduct.srcset)}
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
