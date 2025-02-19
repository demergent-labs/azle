# Benchmarks for canister1

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 14_524_607   | 6_399_842 | $0.0000085097 | $8.50             |
| 1   | account          | 15_891_965   | 6_946_786 | $0.0000092369 | $9.23             |
| 2   | balance          | 14_437_161   | 6_364_864 | $0.0000084632 | $8.46             |
| 3   | account          | 15_893_868   | 6_947_547 | $0.0000092379 | $9.23             |
| 4   | accounts         | 13_914_609   | 6_155_843 | $0.0000081852 | $8.18             |
| 5   | transfer         | 15_952_969   | 6_971_187 | $0.0000092694 | $9.26             |
| 6   | balance          | 14_439_652   | 6_365_860 | $0.0000084645 | $8.46             |
| 7   | account          | 15_883_545   | 6_943_418 | $0.0000092325 | $9.23             |
| 8   | balance          | 14_431_221   | 6_362_488 | $0.0000084600 | $8.46             |
| 9   | account          | 15_900_120   | 6_950_048 | $0.0000092413 | $9.24             |
| 10  | accounts         | 13_922_061   | 6_158_824 | $0.0000081892 | $8.18             |
| 11  | trap             | 13_543_452   | 6_007_380 | $0.0000079878 | $7.98             |
| 12  | sendNotification | 2_825_495    | 1_720_198 | $0.0000022873 | $2.28             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_250_498    | 1_490_199 | $0.0000019815 | $1.98             |
| 1   | receiveNotification | 1_406_707    | 1_152_682 | $0.0000015327 | $1.53             |

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
