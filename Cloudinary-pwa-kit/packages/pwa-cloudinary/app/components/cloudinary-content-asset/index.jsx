import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const RenderContentAssets = ({ contentResult }) => {

    useEffect(() => {
        if (contentResult) {
            document.querySelectorAll('.cloudinary-data-container').forEach((element) => {
                const cldObj = JSON.parse(element.dataset.cloudinary)
                const videoPlayerID = element.dataset.cloudinaryVideoPlayerId

                if (cldObj && cldObj.video && cldObj.video.videoURL &&
                    cldObj.video.videoURL !== '' && cldObj.video.videoURL !== 'null') {
                    if (cldObj.videoPlayerEnabled && typeof cloudinary !== 'undefined') {
                        const cld = cloudinary.Cloudinary.new({ cloud_name: cldObj.cloudName })
                        const player = cld.videoPlayer('cld-video-player' + (videoPlayerID ? '-' + videoPlayerID : ''), cldObj.video.widgetOptions)
                        player.source(cldObj.video.videoURL, {}).play()
                        player.transformation(cldObj.video.widgetOptions.transformations)
                    }
                }
            })
            if (window?.cldObj) {
                window?.cldObj?.responsive()
            }
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
    contentResult: PropTypes.string
}

export default RenderContentAssets
