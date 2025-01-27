# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap0Remove | 2_192_930    | 1_467_172 | $0.0000019509 | $1.95             |
| 1   | stableMap1Remove | 2_859_815    | 1_733_926 | $0.0000023055 | $2.30             |
| 2   | stableMap2Remove | 2_173_397    | 1_459_358 | $0.0000019405 | $1.94             |
| 3   | stableMap3Remove | 3_335_191    | 1_924_076 | $0.0000025584 | $2.55             |
| 4   | stableMap4Remove | 5_216_807    | 2_676_722 | $0.0000035592 | $3.55             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap5Remove | 2_387_476    | 1_544_990 | $0.0000020543 | $2.05             |
| 1   | stableMap6Remove | 3_976_941    | 2_180_776 | $0.0000028997 | $2.89             |
| 2   | stableMap7Remove | 2_000_563    | 1_390_225 | $0.0000018485 | $1.84             |
| 3   | stableMap8Remove | 2_038_284    | 1_405_313 | $0.0000018686 | $1.86             |
| 4   | stableMap9Remove | 3_117_870    | 1_837_148 | $0.0000024428 | $2.44             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister3

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | stableMap10Remove | 2_613_043    | 1_635_217 | $0.0000021743 | $2.17             |
| 1   | stableMap11Remove | 7_331_737    | 3_522_694 | $0.0000046840 | $4.68             |
| 2   | stableMap12Remove | 4_695_164    | 2_468_065 | $0.0000032817 | $3.28             |
| 3   | stableMap13Remove | 2_925_311    | 1_760_124 | $0.0000023404 | $2.34             |
| 4   | stableMap14Remove | 7_501_179    | 3_590_471 | $0.0000047741 | $4.77             |
| 5   | stableMap15Remove | 4_673_941    | 2_459_576 | $0.0000032704 | $3.27             |
| 6   | stableMap16Remove | 3_211_684    | 1_874_673 | $0.0000024927 | $2.49             |
| 7   | stableMap17Remove | 3_371_817    | 1_938_726 | $0.0000025779 | $2.57             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
