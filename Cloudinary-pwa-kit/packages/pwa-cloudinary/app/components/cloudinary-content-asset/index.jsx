import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const RenderContentAssets = ({ contentResult }) => {

    useEffect(() => {
        if (contentResult) {
            var videoPlayerID
            var cldObj

            document.querySelectorAll('.cloudinary-data-container').forEach((element) => {
                cldObj = JSON.parse(element.dataset.cloudinary)
                videoPlayerID = element.dataset.cloudinaryVideoPlayerId

                if (cldObj && cldObj.video && cldObj.video.videoURL &&
                    cldObj.video.videoURL !== '' && cldObj.video.videoURL !== 'null') {
                    if (cldObj.videoPlayerEnabled && typeof cloudinary !== 'undefined') {
                        var cld = cloudinary.Cloudinary.new({ cloud_name: cldObj.cloudName })
                        var player = cld.videoPlayer('cld-video-player' + (videoPlayerID ? '-' + videoPlayerID : ''), cldObj.video.widgetOptions)
                        player.source(cldObj.video.videoURL, {}).play()
                        player.transformation(cldObj.video.widgetOptions.transformations)
                    }
                }
            })
        }
    }, [])
    
    return (
        <>
            {contentResult && (
                <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
            )}
        </>
    )
}


RenderContentAssets.propTypes = {
    contentResult: PropTypes.text
}

export default RenderContentAssets
