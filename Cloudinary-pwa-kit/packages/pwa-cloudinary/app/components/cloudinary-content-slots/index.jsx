import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { Box } from '@chakra-ui/react'
import { cloudinary } from '../../../config/default'

const RenderContentSlots = ({ slotResult }) => {

    if (slotResult) {
        useEffect(() => {
            $('.home-slot').html(slotResult)
            var prdDiv
            var anchor
            var imgContainer = $('.home-slot').find('.image-container')
            imgContainer?.map(function (key, value) {
                prdDiv = $(value).parent().parent().data('pid')
                anchor = $(value).find('a')
                if (anchor && anchor.length > 0 && prdDiv) {
                    anchor[0].href = 'product/' + prdDiv
                }
                
                var swatchs = $(value).next()?.find('.color-swatches')?.find('.swatches')?.find('a')
                if (swatchs && swatchs.length > 0) {
                    swatchs?.map(function (key, swatch) {
                        var index = swatch.href?.indexOf('color')
                        index && index != - -1 ? swatch.href = anchor[0].href + '?' + swatch.href.slice(index) : null
                    })
                }
            })
        }, [])
    }
    return (
        <>
            {slotResult && (
                <Box>
                    <div className='home-slot' />
                </Box>

            )}
        </>
    )
}

RenderContentSlots.propTypes = {
    slotResult: PropTypes.text
}

export default RenderContentSlots