import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const RenderCloudinaryVideoPlayer = ({ cloudinaryImageGallery = {} }) => {
    const cldObj = cloudinaryImageGallery
    const videoPlayerID = cldObj.randomNumber

    useEffect(() => {
        if (cldObj && cldObj.video && cldObj.video.videoURL && cldObj.video.videoURL !== 'null') {
            if (cldObj.videoPlayerEnabled && typeof cloudinary !== 'undefined') {
                if (cloudinary.Cloudinary && cloudinary.Cloudinary.new) {
                    if (document.querySelector('.cld-video-player') && !document.querySelector('.cld-video-player').classList.contains('video-js')) {
                        const cld = cloudinary.Cloudinary.new({ cloud_name: cldObj.cloudName })
                        if (cld.videoPlayer) {
                            const player = cld.videoPlayer(
                                'cld-video-player' + (videoPlayerID ? '-' + videoPlayerID : ''),
                                cldObj.video.widgetOptions
                            )
                            player.source(cldObj.video.videoURL, {}).play()
                            player.transformation(cldObj.video.widgetOptions.transformations)
                        }
                    }
                }
            }
        }
    }, [cldObj, videoPlayerID])

    return (
        <>
            {cldObj.videoPlayerEnabled && cldObj.video && cldObj.video.videoURL && (
                <video
                    id={`cld-video-player-${videoPlayerID}`}
                    className="cld-video-player cloudinary-data-container"
                ></video>
            )}
        </>
    )
}

RenderCloudinaryVideoPlayer.propTypes = {
    cloudinaryImageGallery: PropTypes.object
}

export default RenderCloudinaryVideoPlayer
