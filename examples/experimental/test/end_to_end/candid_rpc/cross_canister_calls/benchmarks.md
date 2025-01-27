# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init             | 5_496_354_234 | 4_199_131_693 | $0.0055834594 | $5_583.45         |
| 1   | balance          | 14_566_657    | 6_416_662     | $0.0000085320 | $8.53             |
| 2   | account          | 15_990_018    | 6_986_007     | $0.0000092891 | $9.28             |
| 3   | balance          | 14_500_882    | 6_390_352     | $0.0000084971 | $8.49             |
| 4   | account          | 15_977_385    | 6_980_954     | $0.0000092824 | $9.28             |
| 5   | accounts         | 14_000_509    | 6_190_203     | $0.0000082309 | $8.23             |
| 6   | transfer         | 16_022_705    | 6_999_082     | $0.0000093065 | $9.30             |
| 7   | balance          | 14_524_925    | 6_399_970     | $0.0000085098 | $8.50             |
| 8   | account          | 15_947_226    | 6_968_890     | $0.0000092663 | $9.26             |
| 9   | balance          | 14_498_159    | 6_389_263     | $0.0000084956 | $8.49             |
| 10  | account          | 15_962_972    | 6_975_188     | $0.0000092747 | $9.27             |
| 11  | accounts         | 13_990_480    | 6_186_192     | $0.0000082256 | $8.22             |
| 12  | trap             | 13_626_093    | 6_040_437     | $0.0000080318 | $8.03             |
| 13  | sendNotification | 2_071_232     | 1_418_492     | $0.0000018861 | $1.88             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_238_456    | 1_485_382 | $0.0000019751 | $1.97             |
| 1   | receiveNotification | 1_400_549    | 1_150_219 | $0.0000015294 | $1.52             |

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
