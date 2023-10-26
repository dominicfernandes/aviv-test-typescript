import { getRepository } from "@/repositories/listings";
import { mockListings } from "tests/functions/mock-listings";
import { describe, vi, it, expect } from "vitest";

describe("Listing Repository", () => {
    const mockPostgresClient = {
        query: vi.fn().mockImplementation((queryString, queryValues) => {
            return {rows: mockListings.map((listing) => ({...listing, updated_date: new Date(listing.updated_date), created_date: new Date(listing.created_date)}))};
        })
    }

    const repository = getRepository(mockPostgresClient);

    describe("getAllListings", () => {
        it("should return all listings", async() => {
            const result = await repository.getAllListings();
            expect(result.length).toEqual(mockListings.length);
        });
    });
});