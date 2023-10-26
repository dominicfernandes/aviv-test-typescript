import { extractVariables } from "@/libs/postgres";
import { Price } from "@/types.generated";
import PostgresClient from "serverless-postgres";

export type ListingPriceTableRow = {
    listing_id: number;
    price_eur: number;
    created_date: Date;
  };


  function tableRowToListingPrice(row: ListingPriceTableRow): Price {
    return {
      price_eur: row.price_eur,
      created_date: row.created_date.toISOString(),
    };
  }

  function listingPriceToTableRow(
    listingPrice: Price,
    listingId: number,
    createdDate: Date,
  ): ListingPriceTableRow {
    return {
        listing_id: listingId,
        price_eur: listingPrice.price_eur,
        created_date: createdDate
    };
  }

  export function getRepository(postgres: PostgresClient) {
    return {
      async getListingPrices(listingId: number): Promise<Price[]> {
        const queryString = `SELECT * FROM listing_prices WHERE listing_id = $1`;
        const queryValues = [listingId];
        const result = await postgres.query(queryString, queryValues);
        return result.rows.map(tableRowToListingPrice);
      },
      async insertListingPrice(listingPrice: Price, listingId:number) {
        const tableRow = listingPriceToTableRow(listingPrice,listingId, new Date());
  
        const {
          columns,
          variables,
          values: queryValues,
        } = extractVariables(tableRow);
  
        const queryString = `
          INSERT INTO listing_prices (${columns.join(",")})
          VALUES(${variables})
          RETURNING *
        `;
        const result = await postgres.query(queryString, queryValues);
  
        return tableRowToListingPrice(result.rows[0]);
      },
    }
  }