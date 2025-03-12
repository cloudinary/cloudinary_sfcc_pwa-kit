/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, { useEffect, useState } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'

// Components
import {
    Box,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link
} from '@salesforce/retail-react-app/app/components/shared/ui'

// Project Components
import Hero from '@salesforce/retail-react-app/app/components/hero'
import Seo from '@salesforce/retail-react-app/app/components/seo'
import Section from '@salesforce/retail-react-app/app/components/section'
import ProductScroller from '@salesforce/retail-react-app/app/components/product-scroller'

// Others
import { getAssetUrl } from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import { heroFeatures, features } from '@salesforce/retail-react-app/app/pages/home/data'

//Hooks
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'

// Constants
import {
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
    MAX_CACHE_AGE,
    STALE_WHILE_REVALIDATE
} from '@salesforce/retail-react-app/app/constants'
import { useServerContext } from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import { useProductSearch } from '@salesforce/commerce-sdk-react'

// CLD Component to render Content Assets
import RenderContentAssets from '../../../../app/components/cloudinary-content-asset'
import RenderContentSlots from '../../../../app/components/cloudinary-content-slots'
import { cloudinary } from '../../../../config/default'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = () => {
    const intl = useIntl()
    const einstein = useEinstein()
    const { pathname } = useLocation()
    // CLD Custom Code Starts
    const [contentResult, setContentResult] = useState()
    const [slotResult, setSlotResult] = useState()
    // CLD Custom Code Ends
    const { res } = useServerContext()
    if (res) {
        res.set(
            'Cache-Control',
            `s-maxage=${MAX_CACHE_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
        )
    }

    const { data: productSearchResult, isLoading } = useProductSearch({
        parameters: {
            allImages: true,
            allVariationProperties: true,
            expand: ['promotions', 'variations', 'prices', 'images', 'custom_properties'],
            limit: HOME_SHOP_PRODUCTS_LIMIT,
            perPricebook: true,
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master']
        }
    })

    // CLD Custom Code Starts
    const getAsset = async () => {
        //Make a call to get Content Assets from SFCC
        const res = await fetch(
            `https://${cloudinary.parameters.host}/on/demandware.store/Sites-${cloudinary.parameters.siteId}-Site/default/CloudinaryStaticContent-RenderAsset?contentId=${cloudinary.parameters.contentAssetId}`
        )
        if (res.ok) {
            setContentResult(await res.text())
        }
        //Make a call to get Content Slots from SFCC
        const slotRes = await fetch(
            `https://${cloudinary.parameters.host}/on/demandware.store/Sites-${cloudinary.parameters.siteId}-Site/default/CloudinaryStaticContent-RenderSlots`
        )
        if (slotRes.ok) {
            setSlotResult(await slotRes.text())
        }
    }
    // CLD Custom Code Ends

    /**************** Einstein ****************/
    useEffect(() => {
        einstein.sendViewPage(pathname)
        {/* Cloudinary Custom Code Starts */ }
        getAsset()
        {/* Cloudinary Custom Code Ends */ }
    }, [])

    {/* Cloudinary Custom Code Starts */ }
    useEffect(() => {
        productSearchResult?.hits?.map((prd) => {
            if (prd.c_cloudinary?.url) {
                let url = prd.c_cloudinary.url
                prd.c_cloudinary.url = url.lastIndexOf('?') > -1
                    ? url.substring(0, url.lastIndexOf('?')) + cloudinary.CLD_TRACKING_PARAM
                    : url + cloudinary.CLD_TRACKING_PARAM
            }
        })
    }, [productSearchResult])
    {/* Cloudinary Custom Code Ends */ }

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Cloudinary Demo"
                description="Cloudinary PWA Kit Demo eShop"
                keywords="SFCC,B2C,Mobify,React,ReactJS,store,shop"
            />

            {/* Cloudinary Custom Code Starts */}
            {contentResult && (
                <RenderContentAssets contentResult={contentResult} />
            )}
            {slotResult && (
                <RenderContentSlots slotResult={slotResult} />
            )}
            {/* Cloudinary Custom Code Ends */}

            {productSearchResult && (
                <Section
                    padding={4}
                    paddingTop={16}
                    title={intl.formatMessage({
                        defaultMessage: 'Shop Products',
                        id: 'home.heading.shop_products'
                    })}
                    subtitle={intl.formatMessage(
                        {
                            defaultMessage:
                                'This section contains content from the catalog. {docLink} on how to replace it.',
                            id: 'home.description.shop_products',
                            description:
                                '{docLink} is a html button that links the user to https://sfdc.co/business-manager-manage-catalogs'
                        },
                        {
                            docLink: (
                                <Link
                                    target="_blank"
                                    href={'https://sfdc.co/business-manager-manage-catalogs'}
                                    textDecoration={'none'}
                                    position={'relative'}
                                    _after={{
                                        position: 'absolute',
                                        content: `""`,
                                        height: '2px',
                                        bottom: '-2px',
                                        margin: '0 auto',
                                        left: 0,
                                        right: 0,
                                        background: 'gray.700'
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    {intl.formatMessage({
                                        defaultMessage: 'Read docs',
                                        id: 'home.link.read_docs'
                                    })}
                                </Link>
                            )
                        }
                    )}
                >
                    <Stack pt={8} spacing={16}>
                        <ProductScroller
                            products={productSearchResult?.hits}
                            isLoading={isLoading}
                        />
                    </Stack>
                </Section>
            )}

            <Section
                padding={4}
                paddingTop={32}
                title={intl.formatMessage({
                    defaultMessage: 'Features',
                    id: 'home.heading.features'
                })}
                subtitle={intl.formatMessage({
                    defaultMessage:
                        'Out-of-the-box features so that you focus only on adding enhancements.',
                    id: 'home.description.features'
                })}
            >
                <Container maxW={'6xl'} marginTop={10}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                        {features.map((feature, index) => {
                            const featureMessage = feature.message
                            return (
                                <HStack key={index} align={'top'}>
                                    <VStack align={'start'}>
                                        <Flex
                                            width={16}
                                            height={16}
                                            align={'center'}
                                            justify={'left'}
                                            color={'gray.900'}
                                            paddingX={2}
                                        >
                                            {feature.icon}
                                        </Flex>
                                        <Text
                                            as="h3"
                                            color={'black'}
                                            fontWeight={700}
                                            fontSize={20}
                                        >
                                            {intl.formatMessage(featureMessage.title)}
                                        </Text>
                                        <Text color={'black'}>
                                            {intl.formatMessage(featureMessage.text)}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        })}
                    </SimpleGrid>
                </Container>
            </Section>

            <Section
                padding={4}
                paddingTop={32}
                title={intl.formatMessage({
                    defaultMessage: "We're here to help",
                    id: 'home.heading.here_to_help'
                })}
                subtitle={
                    <>
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'Contact our support staff.',
                                id: 'home.description.here_to_help'
                            })}
                        </>
                        <br />
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'They will get you to the right place.',
                                id: 'home.description.here_to_help_line_2'
                            })}
                        </>
                    </>
                }
                actions={
                    <Button
                        as={Link}
                        href="https://help.salesforce.com/s/?language=en_US"
                        target="_blank"
                        width={'auto'}
                        paddingX={7}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <FormattedMessage defaultMessage="Contact Us" id="home.link.contact_us" />
                    </Button>
                }
                maxWidth={'xl'}
            />
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home
