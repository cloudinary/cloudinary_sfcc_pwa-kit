import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { Box } from '@chakra-ui/react'
//import './index.scss';

const RenderContentAssets = ({ contentResult }) => {

    if (contentResult) {
        useEffect(() => {
            $('.cld-asset').html(contentResult);
            var videoPlayerID;
            var cldObj;
            var cldURLs = [];

            $('.cloudinary-data-container').each(function () {
                cldObj = $(this).data('cloudinary');
                videoPlayerID = $(this).data('cloudinary-video-player-id');

                if (cldObj && cldObj.video && cldObj.video.videoURL &&
                    cldObj.video.videoURL !== '' && cldObj.video.videoURL !== 'null') {
                    if (cldObj.videoPlayerEnabled && typeof cloudinary !== 'undefined') {
                        var cld = cloudinary.Cloudinary.new({ cloud_name: cldObj.cloudName }); // eslint-disable-line no-undef
                        var player = cld.videoPlayer('cld-video-player' + (videoPlayerID ? '-' + videoPlayerID : ''), cldObj.video.widgetOptions);
                        player.source(cldObj.video.videoURL, {}).play();
                        player.transformation(cldObj.video.widgetOptions.transformations);
                    } else {
                        cldURLs.push(cldObj.video.videoURL);
                    }
                }
            });
        }, [])
    }
    return (
        <>
            {contentResult && (
                <div className='cld-asset'></div>

            )}
        </>
    )
}


RenderContentAssets.propTypes = {
    contentResult: PropTypes.text
}

export default RenderContentAssets