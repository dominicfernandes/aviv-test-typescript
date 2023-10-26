import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listing-prices";
import { Price } from "@/types.generated";

export const getListingPrices = functionHandler<Price[]>(async (event, context) => {
  const listingPrices = await getRepository(context.postgres).getListingPrices(+event.pathParameters.id);
  return {
    statusCode: 200,
    response: listingPrices,
  };
});
