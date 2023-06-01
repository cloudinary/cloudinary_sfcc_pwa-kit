import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { Box } from '@chakra-ui/react'
//import './index.scss';

const RenderContentSlots = ({ slotResult }) => {

    if (slotResult) {
        useEffect(() => {
            $('.home-slot').html(slotResult);
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