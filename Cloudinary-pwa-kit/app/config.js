/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export const config = {
  proxy: 'https://localhost:8080',
  headers: {},
  parameters: {
    clientId: 'COMMERCE-CLOUD-CLIENT-ID',
    organizationId: '{COMMERCE-CLOUD-ORGAINZATION-ID}',
    shortCode: '{COMMERCE-CLOUD-SHORT-CODE}',
    siteId: '{COMMERCE-CLOUD-SITE-ID}',
    host: '{COMMERCE-CLOUD-HOST}',
  },
};
