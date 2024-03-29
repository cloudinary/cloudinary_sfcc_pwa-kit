# The Retail React App

The Retail React App is an isomorphic JavaScript storefront and [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) built using [React](https://reactjs.org/) and [Express](https://expressjs.com/). It uses a modern headless architecture that enables developers to decouple front-end code from back-end systems. It leverages popular open-source libraries in the React ecosystem, such as [Chakra UI](https://chakra-ui.com/) components, [Emotion](https://emotion.sh/docs/introduction) (CSS-in-JS), [Webpack](https://webpack.js.org/), and many more.

Developers don’t have to worry about the underlying infrastructure, whether they’re developing their app locally, deploying it to a [Managed Runtime](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/mrt-overview.html) environment, or testing the app live.

## Requirements

```
  Node ^12.x or ^14.x
  npm ^6.14.4
```

## Getting Started

To start your web server for local development, run the following command in your project directory:

```bash
npm start
```

Now that the development server is running, you can open a browser and preview your commerce app:

-   Go to http://localhost:8080/

## Localization

See the [Localization README.md](./app/translations/README.md) for important setup instructions for localization.

## Retail Project Configurations

The Retail React App's configuration is located within the `app/config` folder, and more specifically the `default.js` file. Within this file you can make changes to how your application runs on the Managed Runtime via your SSR options like `ssrParameters`, `pageNotFoundURL`, etc. Similarly you can make changes to how your Retail React App works by changing the configuration options under the `app` key. Some of those options are your Commerce API and Einstein API connection strings, your URL settings, and site and site alias configurations.

The sites supported by your application are defined in a file called `config/sites.js`. Here, you can synchronize the sites supported by your Retail App and those defined in your Business Manager backend. 

The configuration features include:

1. Using `.js`, `.yml`, `.yaml`, or `.json` to define your configuration. 
3. Chose whether locale and site options are available in the URL query parameters, sub-path, or not appear at all.
4. Optionally assign aliases to locale ID and site ID. 
5. Manage multiple business manager sites that are hosted in the same domain.
6. Manage multiple business manager sites based on multiple domains that can be deployed to different Managed Runtime environments.

### Dedicated Configuration Files

At project generation, a single `default` configuration is created. For most cases a single configuration file will get the job done. But there are times when you want to have a different configuration for a different environment. These environments for example could be, a developer's local machine, a remote `production` environment, or a remote `staging` environment. In all these cases you want to use a different configuration for each. 

When multiple configurations are present, here's how the correct configuration file is chosen:

1. Check to see if there is a config file named after your remote Managed Runtime environment and use this if one is present.
2. If we are running on a developer machine, look for a `local` configuration and use this if one is present.
3. Load the `default` config file `config/default.js`.

This configuration system allows you to do the following:

- Each developer can have their own configuration, and connection to their own Commerce API sandboxes.
- Deploy a single codebase application to multiple environments with their own specific configurations (multiple B2C sites with different domains).


### Customize URLs

You can customize how storefront URLs are formatted in `config/default.js`. The Retail React App allows you to configure site or locale references (IDs or aliases) to be in the path or a query parameter. You can also not have them in the URL altogether. 

```js
// config/default.js
module.exports = {
    url: {
        locale: 'path|query_param|none',
        site: 'path|query_param|none',
        showDefaults: false|true
    }
}
```
You can choose how the current locale appears (or doesn't appear) in the URL by setting `url.locale` to one of the following values:

- `path`: Locale is included in the URL path. Example: `/en-US/women/dress`
- `query_param`: Locale is included as a query parameter. Example: `/women/dress?locale=en-US`
- `none`: Locale isn’t included in the URL. Example: `/women/dress`

`url.showDefaults`: This boolean value dictates whether the default site or locale values are shown in the URL. Defaults to: false. 

By default, a new project is configured to not include the locale and site in the URL path.

### Manage Multiple B2C Commerce Sites with the Same Domain

By default, the Retail App is configured to a single locale, single-site project. However, it can be extended to run multiple sites in one single code base. 

The `sites.js` file contains definitions of the sites that you have configured in Business Manager. The following example shows configuration for `{COMMERCE-CLOUD-SITE-ID}` and `{COMMERCE-CLOUD-SITE-ID}Global` sites:

```js
// /config/sites.js

module.exports = [
    {
        id: '{COMMERCE-CLOUD-SITE-ID}',
        l10n: {
            supportedCurrencies: ['USD'],
            defaultCurrency: 'USD',
            defaultLocale: 'en-US',
            supportedLocales: [
                {
                    id: 'en-US',
                    alias: 'us',
                    preferredCurrency: 'USD'
                },
                {
                    id: 'en-CA',
                    preferredCurrency: 'USD'
                }
            ]
        }
    },
    {
        id: '{COMMERCE-CLOUD-SITE-ID}Global',
        l10n: {
            supportedCurrencies: ['GBP', 'EUR', 'JPY'],
            defaultCurrency: 'GBP',
            supportedLocales: [
                {
                    id: 'de-DE',
                    alias: 'de',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'en-GB',
                    preferredCurrency: 'GBP'
                },
                {
                    id: 'ja-JP',
                    preferredCurrency: 'JPY'
                }
            ],
            defaultLocale: 'en-GB'
        }
    }
]
```

Optionally, You can then map the site IDs with aliases in `/config/default.js` file and also set the default site. If no alias is defined for the site, then IDs are used in URLs. 

```js
// /config/default.js
module.exports = {
    defaultSite: '{COMMERCE-CLOUD-SITE-ID}Global',
    siteAliases: {
        {COMMERCE-CLOUD-SITE-ID}: 'us',
        {COMMERCE-CLOUD-SITE-ID}Global: 'global',
        NTOManaged: 'nto'
    },
    // the rest of the config
} 
  
```

If you set `url.showDefault` to `true` in `/config/default.js` file, then the default locale and site are set in the URL of your Retail app. In addition to site alias, you can also configure aliases for your locale in `sites.js` file. If you configured an alias, the URL will reflect that instead of your locale ID. 

> *Note*: URLs constructed using canonical site and locale IDs are still valid URLs even when aliases are used.

## Cloudinary main SFCC cartridges
For more information, see the [SFCC cartridge repo](https://github.com/cloudinary/cloudinary_sfcc_site_cartridge).

## Documentation

The full documentation for the PWA Kit is hosted on the [Salesforce Developers](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/overview) portal.


### Useful Links:

-   [Getting Started](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/getting-started.html)
-   [Setting Up API Access](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/setting-up-api-access.html)
-   [Configuration Options](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html)
-   [Pushing and Deploying Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html)
-   [The Retail React App](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/retail-react-app.html)
-   [Proxying Requests](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/proxying-requests.html)
-   [Cloudinary Documentation](https://cloudinary.com/documentation/sfcc_b2c_commerce_cartridge_headless)


