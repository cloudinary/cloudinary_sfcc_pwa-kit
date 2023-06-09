/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
'use strict'

const path = require('path')
const { getRuntime } = require('pwa-kit-runtime/ssr/server/express')
const { isRemote } = require('pwa-kit-runtime/utils/ssr-server')
const { getConfig } = require('pwa-kit-runtime/utils/ssr-config')
const helmet = require('helmet')
const cors = require('cors')

const options = {
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // This is the value of the 'mobify' object from package.json
    mobify: getConfig(),

    // The port that the local dev server listens on
    port: 8080,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development.
    protocol: 'http'
}

const runtime = getRuntime()

const { handler } = runtime.createHandler(options, (app) => {
    // Set HTTP security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'img-src': ["'self'", 'blob:', '*.commercecloud.salesforce.com', '*.cloudinary.com'],
                    'media-src': ["'self'", 'blob:', '*.cloudinary.com', '*.commercecloud.salesforce.com'],
                    'script-src': ["'self'", "'unsafe-eval'", 'blob:', 'storage.googleapis.com', '*.cloudinary.com', 'unpkg.com', '*.commercecloud.salesforce.com'],
                    'connect-src': ["'self'", 'blob:', '*.cloudinary.com', '*.commercecloud.salesforce.com'],
                    'worker-src': ["'self'", '*', 'blob:', 'unpkg.com', '*.commercecloud.salesforce.com'],
                    'frame-src': [
                        "'self'",
                        '*.cloudinary.com', 'unpkg.com', '*.commercecloud.salesforce.com'
                    ],
                    'style-src': [
                        "'self'",
                        "'unsafe-eval'",
                        "'unsafe-inline'",
                        'unpkg.com',
                        '*.googleapis.com',
                        '*.commercecloud.salesforce.com'
                    ],
                    // Do not upgrade insecure requests for local development
                    'upgrade-insecure-requests': isRemote() ? [] : null
                }
            },
            hsts: isRemote()
        })
    )

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
        });

    // Handle the redirect from SLAS as to avoid error
    app.get('/callback?*', (req, res) => {
        res.send()
    })
    app.get('/robots.txt', runtime.serveStaticFile('static/robots.txt'))
    app.get('/favicon.ico', runtime.serveStaticFile('static/ico/favicon.ico'))

    app.get('/worker.js(.map)?', runtime.serveServiceWorker)
    app.get('*', runtime.render)
})
// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
exports.get = handler
