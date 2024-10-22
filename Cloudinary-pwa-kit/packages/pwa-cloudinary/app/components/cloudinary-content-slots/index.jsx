import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { Box } from '@chakra-ui/react'

const RenderContentSlots = ({ slotResult }) => {

    if (slotResult) {
        useEffect(() => {
            $('.home-slot').html(slotResult)
            const imgContainer = $('.home-slot').find('.image-container')
            imgContainer?.map(function (key, value) {
                const prdDiv = $(value).parent().parent().data('pid')
                const anchor = $(value).find('a')
                if (anchor && anchor.length > 0 && prdDiv) {
                    anchor[0].href = 'product/' + prdDiv
                }
                
                const swatchs = $(value).next()?.find('.color-swatches')?.find('.swatches')?.find('a')
                if (swatchs && swatchs.length > 0) {
                    swatchs?.map(function (key, swatch) {
                        const index = swatch.href?.indexOf('color')
                        if (index && index !== -1) {
                            swatch.href = anchor[0].href + '?' + swatch.href.slice(index)
                        }
                    })
                }
            })
            window?.cldObj?.responsive()
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
    slotResult: PropTypes.string
}

export default RenderContentSlots
