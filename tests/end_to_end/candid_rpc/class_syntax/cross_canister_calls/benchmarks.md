# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_296_025    | 1_508_410 | $0.0000020162 | $2.0162           |
| 1   | account          | 3_635_289    | 2_044_115 | $0.0000027322 | $2.7322           |
| 2   | balance          | 2_217_840    | 1_477_136 | $0.0000019744 | $1.9744           |
| 3   | account          | 3_613_420    | 2_035_368 | $0.0000027205 | $2.7205           |
| 4   | accounts         | 1_653_154    | 1_251_261 | $0.0000016724 | $1.6724           |
| 5   | transfer         | 3_562_571    | 2_015_028 | $0.0000026933 | $2.6933           |
| 6   | balance          | 2_213_914    | 1_475_565 | $0.0000019723 | $1.9723           |
| 7   | account          | 3_605_228    | 2_032_091 | $0.0000027161 | $2.7161           |
| 8   | balance          | 2_211_079    | 1_474_431 | $0.0000019707 | $1.9707           |
| 9   | account          | 3_609_636    | 2_033_854 | $0.0000027185 | $2.7185           |
| 10  | accounts         | 1_651_452    | 1_250_580 | $0.0000016715 | $1.6715           |
| 11  | trap             | 1_622_561    | 1_239_024 | $0.0000016561 | $1.6561           |
| 12  | sendNotification | 2_655_331    | 1_652_132 | $0.0000022083 | $2.2083           |

## Baseline benchmarks Azle version: 0.25.0

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_157_380    | 1_452_952 | $0.0000019420 | $1.9420           |
| 1   | receiveNotification | 1_383_243    | 1_143_297 | $0.0000015281 | $1.5281           |

## Baseline benchmarks Azle version: 0.25.0

---

**Note on calculations:**

-   Cycles are calculated using the formula: base*fee + (per_instruction_fee * number*of_instructions) + (additional_fee_per_billion * floor(number_of_instructions / 1_billion))
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400,000,000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.33661 (as of December 18, 2023)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
