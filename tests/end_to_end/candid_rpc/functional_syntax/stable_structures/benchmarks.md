# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 3_522_629_572 | 2_609_641_828 | $0.0034699624 | $3_469.96         |
| 1   | stableMap0Remove | 2_057_725     | 1_413_090     | $0.0000018789 | $1.87             |
| 2   | stableMap1Remove | 2_735_944     | 1_684_377     | $0.0000022397 | $2.23             |
| 3   | stableMap2Remove | 2_065_591     | 1_416_236     | $0.0000018831 | $1.88             |
| 4   | stableMap3Remove | 3_574_636     | 2_019_854     | $0.0000026857 | $2.68             |
| 5   | stableMap4Remove | 5_492_107     | 2_786_842     | $0.0000037056 | $3.70             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 3_504_714_071 | 2_602_475_628 | $0.0034604338 | $3_460.43         |
| 1   | stableMap5Remove | 2_364_852     | 1_535_940     | $0.0000020423 | $2.04             |
| 2   | stableMap6Remove | 3_646_823     | 2_048_729     | $0.0000027241 | $2.72             |
| 3   | stableMap7Remove | 1_888_023     | 1_345_209     | $0.0000017887 | $1.78             |
| 4   | stableMap8Remove | 1_927_986     | 1_361_194     | $0.0000018099 | $1.80             |
| 5   | stableMap9Remove | 2_963_663     | 1_775_465     | $0.0000023608 | $2.36             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 3_564_273_101 | 2_626_299_240 | $0.0034921113 | $3_492.11         |
| 1   | stableMap10Remove | 2_547_051     | 1_608_820     | $0.0000021392 | $2.13             |
| 2   | stableMap11Remove | 7_460_485     | 3_574_194     | $0.0000047525 | $4.75             |
| 3   | stableMap12Remove | 4_853_343     | 2_531_337     | $0.0000033658 | $3.36             |
| 4   | stableMap13Remove | 2_756_970     | 1_692_788     | $0.0000022508 | $2.25             |
| 5   | stableMap14Remove | 7_605_110     | 3_632_044     | $0.0000048294 | $4.82             |
| 6   | stableMap15Remove | 4_839_310     | 2_525_724     | $0.0000033584 | $3.35             |
| 7   | stableMap16Remove | 2_980_729     | 1_782_291     | $0.0000023699 | $2.36             |
| 8   | stableMap17Remove | 3_110_491     | 1_834_196     | $0.0000024389 | $2.43             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
