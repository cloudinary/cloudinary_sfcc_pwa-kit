/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import useDNT from './useDNT'
import useAuthContext from './useAuthContext'
import useConfig from './useConfig'

jest.mock('./useAuthContext')
jest.mock('./useConfig')
const mockedUseAuthContext = useAuthContext as jest.MockedFunction<typeof Object>
const mockedUseConfig = useConfig as jest.MockedFunction<typeof Object>
const mockSetDnt = jest.fn()
const mockGetDnt = jest.fn()

describe('useDNT tests', () => {
    beforeEach(() => {
        mockedUseConfig.mockReset()
        mockGetDnt.mockReset()
        mockGetDnt.mockReturnValue(true)
        mockedUseConfig.mockReturnValueOnce({
            defaultDnt: true
        })
        mockedUseAuthContext.mockReturnValue({
            refreshAccessToken: jest.fn(),
            get: (param: string) => {
                if (param === 'customer_type') return 'registered'
                if (param === 'refresh_token_expires_in') return 7776000
            },
            getDnt: mockGetDnt,
            setDnt: mockSetDnt,
            parseSlasJWT: () => {
                return {dnt: '1'}
            }
        })
    })

    it('updateDNT should create dw_dnt cookie', async () => {
        const {updateDNT} = useDNT()
        await updateDNT(true)
        expect(mockSetDnt).toHaveBeenCalledWith(true)
    })

    it('selectedDnt should be false if dw_dnt cookie is "1"', () => {
        const {selectedDnt} = useDNT()
        expect(selectedDnt).toBe(true)
    })

    it('selectedDnt should be false if dw_dnt cookie is "0"', () => {
        mockGetDnt.mockReturnValue(false)
        const {selectedDnt} = useDNT()
        expect(selectedDnt).toBe(false)
    })

    it('selectedDnt should be undefined if dw_dnt cookie is not defined', () => {
        mockGetDnt.mockReturnValueOnce(undefined)
        const {selectedDnt} = useDNT()
        expect(selectedDnt).toBeUndefined()
    })

    it('selectedDnt should be undefined if dw_dnt cookie is invalid', () => {
        mockGetDnt.mockReturnValueOnce(undefined)
        const {selectedDnt} = useDNT()
        expect(selectedDnt).toBeUndefined()
    })
})
