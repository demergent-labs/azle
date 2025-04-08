# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | getBytes    | 1_978_977    | 1_381_590  | $0.0000018371 | $1.83             | <font color="red">+2_733</font>   |
| 1   | getBytes    | 2_653_040    | 1_651_216  | $0.0000021956 | $2.19             | <font color="green">-299</font>   |
| 2   | getBytes    | 9_734_595    | 4_483_838  | $0.0000059620 | $5.96             | <font color="green">-1_535</font> |
| 3   | getBytes    | 79_935_018   | 32_564_007 | $0.0000432994 | $43.29            | <font color="green">-749</font>   |
| 4   | getBytes    | 157_929_868  | 63_761_947 | $0.0000847823 | $84.78            | <font color="green">-616</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_976_244    | 1_380_497  | $0.0000018356 | $1.83             |
| 1   | getBytes    | 2_653_339    | 1_651_335  | $0.0000021957 | $2.19             |
| 2   | getBytes    | 9_736_130    | 4_484_452  | $0.0000059628 | $5.96             |
| 3   | getBytes    | 79_935_767   | 32_564_306 | $0.0000432998 | $43.29            |
| 4   | getBytes    | 157_930_484  | 63_762_193 | $0.0000847827 | $84.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
