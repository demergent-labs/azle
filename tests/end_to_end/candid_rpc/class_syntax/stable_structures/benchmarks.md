# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap0Remove | 1_997_109    | 1_388_843 | $0.0000018467 | $1.84             |
| 1   | stableMap1Remove | 2_634_081    | 1_643_632 | $0.0000021855 | $2.18             |
| 2   | stableMap2Remove | 1_974_215    | 1_379_686 | $0.0000018345 | $1.83             |
| 3   | stableMap3Remove | 3_043_231    | 1_807_292 | $0.0000024031 | $2.40             |
| 4   | stableMap4Remove | 4_740_082    | 2_486_032 | $0.0000033056 | $3.30             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap5Remove | 2_215_481    | 1_476_192 | $0.0000019628 | $1.96             |
| 1   | stableMap6Remove | 3_569_281    | 2_017_712 | $0.0000026829 | $2.68             |
| 2   | stableMap7Remove | 1_828_225    | 1_321_290 | $0.0000017569 | $1.75             |
| 3   | stableMap8Remove | 1_870_638    | 1_338_255 | $0.0000017794 | $1.77             |
| 4   | stableMap9Remove | 2_918_732    | 1_757_492 | $0.0000023369 | $2.33             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap10Remove | 2_360_055    | 1_534_022 | $0.0000020397 | $2.03             |
| 1   | stableMap11Remove | 6_731_172    | 3_282_468 | $0.0000043646 | $4.36             |
| 2   | stableMap12Remove | 4_315_327    | 2_316_130 | $0.0000030797 | $3.07             |
| 3   | stableMap13Remove | 2_671_413    | 1_658_565 | $0.0000022053 | $2.20             |
| 4   | stableMap14Remove | 7_065_178    | 3_416_071 | $0.0000045422 | $4.54             |
| 5   | stableMap15Remove | 4_263_187    | 2_295_274 | $0.0000030520 | $3.05             |
| 6   | stableMap16Remove | 2_917_245    | 1_756_898 | $0.0000023361 | $2.33             |
| 7   | stableMap17Remove | 3_051_710    | 1_810_684 | $0.0000024076 | $2.40             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
