import { cloudinary } from '../../config/default'

/**
 * Upate the tracking params in srcsets
 *
 * @param {string} srcset - srcset.
 * @returns {string} - The ImageGroup matching the search criteria
 */
export const updateTrackingParam = (srcset) => {
    const splits = srcset.split(' ')
    const newSrcset = splits.map((split) => {
        if (split.lastIndexOf('?') > -1) {
            return split.substring(0, split.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM
        } else {
            return split
        }
    })

    return newSrcset.join(' ')
}

/**
 * Upate the tracking params in url
 *
 * @param {string} url - url.
 * @returns {string} - The ImageGroup matching the search criteria
 */
export const updateCloudinarySource = (url) => {
    if (url.lastIndexOf('?') > -1) {
        return url.substring(0, url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM
    } else {
        return url + cloudinary.CLD_TRACKING_PARAM
    }
}
