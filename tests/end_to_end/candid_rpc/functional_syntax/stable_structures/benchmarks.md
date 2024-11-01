# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 5_447_474_724 | 4_179_579_889 | $0.0055574620 | $5_557.46         |
| 1   | stableMap0Remove | 2_056_488     | 1_412_595     | $0.0000018783 | $1.87             |
| 2   | stableMap1Remove | 2_728_731     | 1_681_492     | $0.0000022358 | $2.23             |
| 3   | stableMap2Remove | 2_061_116     | 1_414_446     | $0.0000018807 | $1.88             |
| 4   | stableMap3Remove | 3_575_239     | 2_020_095     | $0.0000026861 | $2.68             |
| 5   | stableMap4Remove | 5_493_573     | 2_787_429     | $0.0000037064 | $3.70             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 5_423_908_253 | 4_170_153_301 | $0.0055449277 | $5_544.92         |
| 1   | stableMap5Remove | 2_367_310     | 1_536_924     | $0.0000020436 | $2.04             |
| 2   | stableMap6Remove | 3_642_144     | 2_046_857     | $0.0000027216 | $2.72             |
| 3   | stableMap7Remove | 1_888_073     | 1_345_229     | $0.0000017887 | $1.78             |
| 4   | stableMap8Remove | 1_931_002     | 1_362_400     | $0.0000018115 | $1.81             |
| 5   | stableMap9Remove | 2_964_796     | 1_775_918     | $0.0000023614 | $2.36             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 5_489_594_153 | 4_196_427_661 | $0.0055798640 | $5_579.86         |
| 1   | stableMap10Remove | 2_542_121     | 1_606_848     | $0.0000021366 | $2.13             |
| 2   | stableMap11Remove | 7_460_734     | 3_574_293     | $0.0000047526 | $4.75             |
| 3   | stableMap12Remove | 4_860_617     | 2_534_246     | $0.0000033697 | $3.36             |
| 4   | stableMap13Remove | 2_760_080     | 1_694_032     | $0.0000022525 | $2.25             |
| 5   | stableMap14Remove | 7_600_262     | 3_630_104     | $0.0000048268 | $4.82             |
| 6   | stableMap15Remove | 4_843_225     | 2_527_290     | $0.0000033605 | $3.36             |
| 7   | stableMap16Remove | 2_980_774     | 1_782_309     | $0.0000023699 | $2.36             |
| 8   | stableMap17Remove | 3_110_977     | 1_834_390     | $0.0000024391 | $2.43             |

## Baseline benchmarks Azle version: No previous benchmarks

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
