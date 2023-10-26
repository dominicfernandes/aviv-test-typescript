import { getListingPrices } from "@/functions/price/handler";
import {describe, expect, it, vi, beforeEach, afterEach} from "vitest";
import * as ListingPricesRepository from "@/repositories/listing-prices";

const mockListingPricesTable = [
    {
        listing_id: 1,
        price_eur: 100000
    },
    {
        listing_id: 1,
        price_eur: 120000
    },
    {
        listing_id: 2,
        price_eur: 140000
    },
    {
        listing_id: 1,
        price_eur: 130000
    },
];

const mockListingPricesRepository = {
    insertListingPrice: vi.fn().mockImplementation((listingPrice) => {
        mockListingPricesTable.push(listingPrice);
    }),
    getListingPrices: vi.fn().mockImplementation((listingId) => mockListingPricesTable.filter((listingPrice) => listingPrice.listing_id === +listingId)),
};

const mockEvent = {
    headers:{}
}

describe("Listing Prices API", () => {
    beforeEach(() => {
        vi.spyOn(ListingPricesRepository,"getRepository").mockImplementation(() => mockListingPricesRepository);
    });
    
    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("getListingPrices", () => {
        it("should return 200 response status with listing price history", async() => {
            const response = await getListingPrices({...mockEvent, pathParameters: { id: 1 }});
            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(response.body)).toEqual(mockListingPricesTable.filter((listingPrice) => listingPrice.listing_id === 1));
        });
    });
});