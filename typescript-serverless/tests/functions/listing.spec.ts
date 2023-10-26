import { getListings, addListing, updateListing } from "@/functions/listing/handler";
import {describe, expect, it, vi, beforeEach, afterEach} from "vitest";
import * as ListingRepository from "@/repositories/listings";
import * as ListingPricesRepository from "@/repositories/listing-prices";
import { mockListings } from "./mock-listings";
import { EntityNotFound } from "@/libs/errors";

const mockListingsTable = [
    ...mockListings,
];

const mockListingPricesTable = [];

const mockListingsRepository = {
    getAllListings: vi.fn().mockReturnValue(mockListingsTable),
    getListing: vi.fn(),
    insertListing: vi.fn().mockImplementation((listing) => {
        mockListingsTable.push(listing);
        return listing;
    }),
    updateListing: vi.fn().mockImplementation((id, updatedListing) => {
        const indexToUpdate=mockListingsTable.findIndex((listing) => listing.id===+id);
        mockListingsTable[indexToUpdate] = updatedListing;
        return updatedListing;
    }),
};

const mockListingPricesRepository = {
    insertListingPrice: vi.fn().mockImplementation((listingPrice) => {
        mockListingPricesTable.push(listingPrice);
    }),
};

const mockEvent = {
    headers:{}
}

describe("Listings API", () => {
    beforeEach(() => {
        vi.spyOn(ListingRepository,"getRepository").mockImplementation(() => mockListingsRepository);
    });

    beforeEach(() => {
        vi.spyOn(ListingPricesRepository,"getRepository").mockImplementation(() => mockListingPricesRepository);
    });
    
    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("getListings", () => {
        it("should return 200 response status with listings", async() => {
            const response = await getListings(mockEvent)
            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(response.body)).toEqual(mockListingsTable);
        });
    });

    describe("addListing", () => {
        it("should return 201 response status with the new listing", async() => {
            const response = await addListing({...mockEvent, body: {...mockListings[0], id: 3}});
            expect(response.statusCode).toEqual(201);
            expect(JSON.parse(response.body)).toEqual(mockListingsTable[mockListingsTable.length-1]);
            expect(mockListingPricesTable).toEqual([ { created_date: '2023-01-17T16:33:35.960Z', price_eur: 125000 } ]);
        });
    });

    describe("updateListing", () => {
        it("should return 200 response status with the updated listing", async() => {
            const response = await updateListing({...mockEvent, body: {...mockListings[2], latest_price_eur: 100000 }, pathParameters:{id:3}});
            expect(response.statusCode).toEqual(200);
            expect(mockListingsTable[2].latest_price_eur).toEqual(100000);
            expect(mockListingPricesTable[mockListingPricesTable.length-1].price_eur).toEqual(100000);
        });

        it("should handle EntityNotFound error", async() => {
            try {
                vi.spyOn(mockListingsRepository, "updateListing").mockRejectedValue(new EntityNotFound("Unable to Update."));
                await updateListing({...mockEvent, body: {...mockListings[2], latest_price_eur: 100000 }, pathParameters:{id:3}});
            } catch (error) {
                expect(error).toEqual("Unable to Update.")
            }
        });

        it("should handle error", async() => {
            vi.spyOn(mockListingsRepository, "updateListing").mockImplementation(()=>undefined);
            const response = await updateListing({...mockEvent, body: {...mockListings[2], latest_price_eur: 100000 }, pathParameters:{id:3}});
            expect(response.statusCode).toEqual(500);
        });
    });
});