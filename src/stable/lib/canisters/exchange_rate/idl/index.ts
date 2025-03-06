import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Asset {
    class: AssetClass;
    symbol: string;
}
export type AssetClass = { Cryptocurrency: null } | { FiatCurrency: null };
export interface ExchangeRate {
    metadata: ExchangeRateMetadata;
    rate: bigint;
    timestamp: bigint;
    quote_asset: Asset;
    base_asset: Asset;
}
export type ExchangeRateError =
    | { AnonymousPrincipalNotAllowed: null }
    | { CryptoQuoteAssetNotFound: null }
    | { FailedToAcceptCycles: null }
    | { ForexBaseAssetNotFound: null }
    | { CryptoBaseAssetNotFound: null }
    | { StablecoinRateTooFewRates: null }
    | { ForexAssetsNotFound: null }
    | { InconsistentRatesReceived: null }
    | { RateLimited: null }
    | { StablecoinRateZeroRate: null }
    | { Other: { code: number; description: string } }
    | { ForexInvalidTimestamp: null }
    | { NotEnoughCycles: null }
    | { ForexQuoteAssetNotFound: null }
    | { StablecoinRateNotFound: null }
    | { Pending: null };
export interface ExchangeRateMetadata {
    decimals: number;
    forex_timestamp: [] | [bigint];
    quote_asset_num_received_rates: bigint;
    base_asset_num_received_rates: bigint;
    base_asset_num_queried_sources: bigint;
    standard_deviation: bigint;
    quote_asset_num_queried_sources: bigint;
}
export interface GetExchangeRateRequest {
    timestamp: [] | [bigint];
    quote_asset: Asset;
    base_asset: Asset;
}
export type GetExchangeRateResult =
    | { Ok: ExchangeRate }
    | { Err: ExchangeRateError };
export interface _SERVICE {
    get_exchange_rate: ActorMethod<
        [GetExchangeRateRequest],
        GetExchangeRateResult
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const AssetClass = IDL.Variant({
    Cryptocurrency: IDL.Null,
    FiatCurrency: IDL.Null
});
export const Asset = IDL.Record({ class: AssetClass, symbol: IDL.Text });
export const GetExchangeRateRequest = IDL.Record({
    timestamp: IDL.Opt(IDL.Nat64),
    quote_asset: Asset,
    base_asset: Asset
});
export const ExchangeRateMetadata = IDL.Record({
    decimals: IDL.Nat32,
    forex_timestamp: IDL.Opt(IDL.Nat64),
    quote_asset_num_received_rates: IDL.Nat64,
    base_asset_num_received_rates: IDL.Nat64,
    base_asset_num_queried_sources: IDL.Nat64,
    standard_deviation: IDL.Nat64,
    quote_asset_num_queried_sources: IDL.Nat64
});
export const ExchangeRate = IDL.Record({
    metadata: ExchangeRateMetadata,
    rate: IDL.Nat64,
    timestamp: IDL.Nat64,
    quote_asset: Asset,
    base_asset: Asset
});
export const ExchangeRateError = IDL.Variant({
    AnonymousPrincipalNotAllowed: IDL.Null,
    CryptoQuoteAssetNotFound: IDL.Null,
    FailedToAcceptCycles: IDL.Null,
    ForexBaseAssetNotFound: IDL.Null,
    CryptoBaseAssetNotFound: IDL.Null,
    StablecoinRateTooFewRates: IDL.Null,
    ForexAssetsNotFound: IDL.Null,
    InconsistentRatesReceived: IDL.Null,
    RateLimited: IDL.Null,
    StablecoinRateZeroRate: IDL.Null,
    Other: IDL.Record({ code: IDL.Nat32, description: IDL.Text }),
    ForexInvalidTimestamp: IDL.Null,
    NotEnoughCycles: IDL.Null,
    ForexQuoteAssetNotFound: IDL.Null,
    StablecoinRateNotFound: IDL.Null,
    Pending: IDL.Null
});
export const GetExchangeRateResult = IDL.Variant({
    Ok: ExchangeRate,
    Err: ExchangeRateError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const AssetClass = IDL.Variant({
        Cryptocurrency: IDL.Null,
        FiatCurrency: IDL.Null
    });
    const Asset = IDL.Record({ class: AssetClass, symbol: IDL.Text });
    const GetExchangeRateRequest = IDL.Record({
        timestamp: IDL.Opt(IDL.Nat64),
        quote_asset: Asset,
        base_asset: Asset
    });
    const ExchangeRateMetadata = IDL.Record({
        decimals: IDL.Nat32,
        forex_timestamp: IDL.Opt(IDL.Nat64),
        quote_asset_num_received_rates: IDL.Nat64,
        base_asset_num_received_rates: IDL.Nat64,
        base_asset_num_queried_sources: IDL.Nat64,
        standard_deviation: IDL.Nat64,
        quote_asset_num_queried_sources: IDL.Nat64
    });
    const ExchangeRate = IDL.Record({
        metadata: ExchangeRateMetadata,
        rate: IDL.Nat64,
        timestamp: IDL.Nat64,
        quote_asset: Asset,
        base_asset: Asset
    });
    const ExchangeRateError = IDL.Variant({
        AnonymousPrincipalNotAllowed: IDL.Null,
        CryptoQuoteAssetNotFound: IDL.Null,
        FailedToAcceptCycles: IDL.Null,
        ForexBaseAssetNotFound: IDL.Null,
        CryptoBaseAssetNotFound: IDL.Null,
        StablecoinRateTooFewRates: IDL.Null,
        ForexAssetsNotFound: IDL.Null,
        InconsistentRatesReceived: IDL.Null,
        RateLimited: IDL.Null,
        StablecoinRateZeroRate: IDL.Null,
        Other: IDL.Record({ code: IDL.Nat32, description: IDL.Text }),
        ForexInvalidTimestamp: IDL.Null,
        NotEnoughCycles: IDL.Null,
        ForexQuoteAssetNotFound: IDL.Null,
        StablecoinRateNotFound: IDL.Null,
        Pending: IDL.Null
    });
    const GetExchangeRateResult = IDL.Variant({
        Ok: ExchangeRate,
        Err: ExchangeRateError
    });
    return IDL.Service({
        get_exchange_rate: IDL.Func(
            [GetExchangeRateRequest],
            [GetExchangeRateResult],
            []
        )
    });
};
export const init: init = () => {
    return [];
};
