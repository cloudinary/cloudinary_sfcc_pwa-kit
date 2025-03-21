/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import {
    Box,
    Flex,
    Button,
    Stack,
    Text,
    Heading,
    Divider,
    Accordion,
    AccordionIcon,
    AccordionItem,
    AccordionButton,
    AccordionPanel
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import { PromoCode, usePromoCode } from '@salesforce/retail-react-app/app/components/promo-code'
import ItemVariantProvider from '@salesforce/retail-react-app/app/components/item-variant'
import CartItemVariantImage from '@salesforce/retail-react-app/app/components/item-variant/item-image'
import CartItemVariantName from '@salesforce/retail-react-app/app/components/item-variant/item-name'
import CartItemVariantAttributes from '@salesforce/retail-react-app/app/components/item-variant/item-attributes'
import CartItemVariantPrice from '@salesforce/retail-react-app/app/components/item-variant/item-price'
import PromoPopover from '@salesforce/retail-react-app/app/components/promo-popover'
import { useProducts } from '@salesforce/commerce-sdk-react'
import { BasketIcon } from '@salesforce/retail-react-app/app/components/icons'

// Cloudinary Component to Render CLD images on Checkout
import CldCartItemVariantImage from '../../../../app/components/cloudinary-item-image'

const CartItems = ({ basket }) => {
{/** Cloudinary Custom Code Starts */ }
const [checkoutEnabled, setCheckoutEnabled] = useState(false)
{/** Cloudinary Custom Code Ends */ }
    const totalItems = basket?.productItems?.reduce((acc, item) => acc + item.quantity, 0) || 0
    const productIds = basket?.productItems?.map(({ productId }) => productId).join(',') ?? ''
    const { data: products } = useProducts(
        {
            parameters: {
                ids: productIds,
                allImages: true
            }
        },
        {
            enabled: Boolean(productIds),
            select: (result) => {
                // Convert array into key/value object with key is the product id
                return result?.data?.reduce((result, item) => {
                    const key = item.id
                    result[key] = item
                    return result
                }, {})
            }
        }
    )

    {/** Cloudinary Custom Code Starts */ }
    useEffect(() => {
        if (products) {
            Object.keys(products).map((key) => {
                setCheckoutEnabled(products[key]?.c_cloudinary?.isCheckoutEnabled)
            })
        }
    }, [products])
    {/** Cloudinary Custom Code Ends */ }

    return (
        <Accordion allowToggle={true} width="100%">
            <AccordionItem style={{ border: 0 }}>
                <AccordionButton color="blue.700">
                    <BasketIcon aria-hidden={true} />
                    <Box px={2}>
                        <FormattedMessage
                            id="order_summary.cart_items.action.num_of_items_in_cart"
                            description="clicking it would expand/show the items in cart"
                            defaultMessage="{itemCount, plural, =0 {0 items} one {# item} other {# items}} in cart"
                            values={{ itemCount: totalItems }}
                        />
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0} py={4}>
                    <Stack spacing={5} align="flex-start" divider={<Divider />}>
                        {basket.productItems?.map((product, idx) => {
                            const variant = {
                                ...product,
                                ...(products && products[product.productId]),
                                price: product.price
                            }
                            return (
                                <ItemVariantProvider
                                    key={product.productId}
                                    index={idx}
                                    variant={variant}
                                >
                                    <Flex width="full" alignItems="flex-start">

                                        {/** Cloudinary Custom Code Starts */}
                                        {checkoutEnabled ? (
                                            <CldCartItemVariantImage pageType={'checkoutImage'} width={['88px', '136px']} mr={4} />
                                        ) : (
                                            <CartItemVariantImage width="80px" mr={2} />
                                        )
                                        }
                                        {/** Cloudinary Custom Code Ends */}

                                        <Stack width="full" spacing={1} marginTop="-3px">
                                            <CartItemVariantName />
                                            <CartItemVariantAttributes includeQuantity />
                                            <CartItemVariantPrice
                                                baseDirection="row"
                                                currency={basket?.currency}
                                            />
                                        </Stack>
                                    </Flex>
                                </ItemVariantProvider>
                            )
                        })}

                        <Button as={Link} to="/cart" variant="link" width="full" color="blue.700">
                            <FormattedMessage
                                defaultMessage="Edit cart"
                                id="order_summary.cart_items.link.edit_cart"
                            />
                        </Button>
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

CartItems.propTypes = {
    basket: PropTypes.object
}

const OrderSummary = ({
    basket,
    showPromoCodeForm = false,
    showCartItems = false,
    isEstimate = false,
    fontSize = 'md'
}) => {
    const { removePromoCode, ...promoCodeProps } = usePromoCode()

    if (!basket?.basketId && !basket?.orderNo) {
        return null
    }
    const shippingItem = basket.shippingItems?.[0]
    const hasShippingPromos = shippingItem?.priceAdjustments?.length > 0

    return (
        <Stack data-testid="sf-order-summary" spacing={5}>
            <Heading fontSize={fontSize} pt={1} id="order-summary-heading">
                <FormattedMessage
                    defaultMessage="Order Summary"
                    id="order_summary.heading.order_summary"
                />
            </Heading>

            <Stack
                spacing={4}
                align="flex-start"
                role="region"
                aria-labelledby="order-summary-heading"
            >
                {showCartItems && <CartItems basket={basket} />}

                <Stack w="full">
                    <Flex justify="space-between" aria-live="polite" aria-atomic="true">
                        <Text fontWeight="bold" fontSize={fontSize}>
                            <FormattedMessage
                                defaultMessage="Subtotal"
                                id="order_summary.label.subtotal"
                            />
                        </Text>
                        <Text fontWeight="bold" fontSize={fontSize}>
                            <FormattedNumber
                                style="currency"
                                currency={basket?.currency}
                                value={basket?.productSubTotal}
                            />
                        </Text>
                    </Flex>

                    {basket.orderPriceAdjustments?.map((adjustment) => (
                        <Flex
                            justify="space-between"
                            key={adjustment.priceAdjustmentId}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <Text fontSize={fontSize}>{adjustment.itemText}</Text>
                            <Text color="green.600" fontSize={fontSize}>
                                <FormattedNumber
                                    style="currency"
                                    currency={basket?.currency}
                                    value={adjustment.price}
                                />
                            </Text>
                        </Flex>
                    ))}

                    <Flex justify="space-between" aria-live="polite" aria-atomic="true">
                        <Flex alignItems="center">
                            <Text lineHeight={1} fontSize={fontSize}>
                                <FormattedMessage
                                    defaultMessage="Shipping"
                                    id="order_summary.label.shipping"
                                />
                                {hasShippingPromos && (
                                    <Text as="span" ml={1}>
                                        (
                                        <FormattedMessage
                                            defaultMessage="Promotion applied"
                                            id="order_summary.label.promo_applied"
                                        />
                                        )
                                    </Text>
                                )}
                            </Text>
                            {hasShippingPromos && (
                                <PromoPopover ml={1}>
                                    <Stack>
                                        {shippingItem?.priceAdjustments?.map((adjustment) => (
                                            <Text key={adjustment.priceAdjustmentId} fontSize="sm">
                                                {adjustment.itemText}
                                            </Text>
                                        ))}
                                    </Stack>
                                </PromoPopover>
                            )}
                        </Flex>

                        {shippingItem?.priceAdjustments?.some(
                            ({ appliedDiscount }) => appliedDiscount?.type === 'free'
                        ) ? (
                            <Text
                                as="span"
                                color="green.700"
                                textTransform="uppercase"
                                fontSize={fontSize}
                            >
                                <FormattedMessage
                                    defaultMessage="Free"
                                    id="order_summary.label.free"
                                />
                            </Text>
                        ) : (
                            <Text fontSize={fontSize}>
                                <FormattedNumber
                                    value={basket.shippingTotal}
                                    style="currency"
                                    currency={basket.currency}
                                />
                            </Text>
                        )}
                    </Flex>

                    <Flex justify="space-between" aria-live="polite" aria-atomic="true">
                        <Text fontSize={fontSize}>
                            <FormattedMessage defaultMessage="Tax" id="order_summary.label.tax" />
                        </Text>
                        {basket.taxTotal != null ? (
                            <Text fontSize={fontSize}>
                                <FormattedNumber
                                    value={basket.taxTotal}
                                    style="currency"
                                    currency={basket.currency}
                                />
                            </Text>
                        ) : (
                            <Text fontSize={fontSize} color="gray.700">
                                TBD
                            </Text>
                        )}
                    </Flex>
                </Stack>

                {showPromoCodeForm ? (
                    <Box w="full">
                        <PromoCode {...promoCodeProps} />
                    </Box>
                ) : (
                    <Divider />
                )}

                <Stack spacing={4} w="full">
                    <Flex w="full" justify="space-between" aria-live="polite" aria-atomic="true">
                        {isEstimate ? (
                            <Text fontWeight="bold" fontSize={fontSize}>
                                <FormattedMessage
                                    defaultMessage="Estimated Total"
                                    id="order_summary.label.estimated_total"
                                />
                            </Text>
                        ) : (
                            <Text fontWeight="bold" fontSize={fontSize}>
                                <FormattedMessage
                                    defaultMessage="Order Total"
                                    id="order_summary.label.order_total"
                                />
                            </Text>
                        )}
                        <Text fontWeight="bold" fontSize={fontSize}>
                            <FormattedNumber
                                style="currency"
                                currency={basket?.currency}
                                value={basket?.orderTotal || basket?.productTotal}
                            />
                        </Text>
                    </Flex>

                    {basket.couponItems?.length > 0 && (
                        <Stack
                            p={4}
                            border="1px solid"
                            borderColor="gray.100"
                            borderRadius="base"
                            bg="white"
                        >
                            <Text fontWeight="medium" fontSize={fontSize}>
                                <FormattedMessage
                                    defaultMessage="Promotions applied"
                                    id="order_summary.label.promotions_applied"
                                />
                                :
                            </Text>
                            <Stack>
                                {basket.couponItems.map((item) => (
                                    <Flex key={item.couponItemId} alignItems="center">
                                        <Text flex="1" fontSize="sm" color="gray.800">
                                            {item.code}
                                        </Text>
                                        {!basket.orderNo && (
                                            <Button
                                                variant="link"
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() => removePromoCode(item.couponItemId)}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Remove"
                                                    id="order_summary.action.remove_promo"
                                                />
                                            </Button>
                                        )}
                                    </Flex>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}

OrderSummary.propTypes = {
    basket: PropTypes.object,
    showPromoCodeForm: PropTypes.bool,
    showCartItems: PropTypes.bool,
    isEstimate: PropTypes.bool,
    fontSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

export default OrderSummary
