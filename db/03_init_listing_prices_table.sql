CREATE TABLE IF NOT EXISTS public.listing_prices
(
    listing_id           integer references public.listing(id),
    price_eur            double precision not null,
    created_date         timestamp
);
