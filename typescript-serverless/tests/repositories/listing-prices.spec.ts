import { ListingPriceTableRow, getRepository } from "@/repositories/listing-prices";
import { describe, vi, it, expect } from "vitest";
import { sqlInsertToJsonObject } from "./utils";

const mockListingPricesTable: ListingPriceTableRow[] = [
    {
        listing_id: 1,
        price_eur: 100000,
        created_date: new Date()
    },
    {
        listing_id: 1,
        price_eur: 120000,
        created_date: new Date()
    },
    {
        listing_id: 2,
        price_eur: 140000,
        created_date: new Date()
    },
    {
        listing_id: 1,
        price_eur: 130000,
        created_date: new Date()
    },
];

describe("Listing Prices Repository", () => {
    const mockPostgresClient = {
        query: vi.fn().mockImplementation((queryString, queryValues) => {
        const action = queryString.trim().split(" ")[0].toUpperCase();
        switch(action){
            case "SELECT": return {rows: mockListingPricesTable.filter((listingPrice) => listingPrice.listing_id===queryValues[0])};
            case "INSERT": const priceRecord = sqlInsertToJsonObject(queryString, queryValues);
            mockListingPricesTable.push(priceRecord as ListingPriceTableRow);
            return {rows: [{...priceRecord}]}
        }
        })
    }

    const repository = getRepository(mockPostgresClient);

    describe("getListingPrices", () => {
        it("should return listing price history", async() => {
            const result = await repository.getListingPrices(1);
            expect(result.length).toEqual(3);
        });
    });

    describe("insertListingPrice", () => {
        it("should create a new listing price record", async() => {
            const result = await repository.insertListingPrice({created_date: new Date().toISOString(), price_eur: 200000}, 2);
            expect(result.price_eur).toEqual(mockListingPricesTable[mockListingPricesTable.length-1].price_eur)
        });
    });
});