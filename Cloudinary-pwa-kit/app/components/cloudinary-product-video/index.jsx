import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

const RenderCloudinaryVideoPlayer = ({ cloudinaryImageGallery = {} }) => {
    var cldObj = cloudinaryImageGallery
    var videoPlayerID = cldObj.randomNumber
    var cldURLs = []

    if (cldObj && cldObj.video && cldObj.video.videoURL && cldObj.video.videoURL !== '' && cldObj.video.videoURL !== 'null') {
        useEffect(() => {
            if (cldObj.videoPlayerEnabled && typeof cloudinary !== 'undefined') {
                if (cloudinary.Cloudinary && cloudinary.Cloudinary.new) {
                    if ($ && !($('.cld-video-player').hasClass('video-js'))) {
                        var cld = cloudinary.Cloudinary.new({ cloud_name: cldObj.cloudName }) // eslint-disable-line no-undef
                        if (cld.videoPlayer) {
                            var player = cld.videoPlayer(
                                'cld-video-player' + (videoPlayerID ? '-' + videoPlayerID : ''),
                                cldObj.video.widgetOptions
                            )
                            player.source(cldObj.video.videoURL, {}).play()
                            player.transformation(cldObj.video.widgetOptions.transformations)
                        }
                    }
                }
            } else {
                cldURLs.push(cldObj.video.videoURL)
            }
        })
    }
    return (
        <>
            {cldObj.videoPlayerEnabled && cldObj.video && cldObj.video.videoURL && (
                <video
                    id={`cld-video-player-${videoPlayerID}`}
                    className="cld-video-player cloudinary-data-container"
                ></video>
            )
            }
        </>
    )
}

RenderCloudinaryVideoPlayer.propTypes = {
    cloudinaryImageGallery: PropTypes.object
}

export default RenderCloudinaryVideoPlayer
