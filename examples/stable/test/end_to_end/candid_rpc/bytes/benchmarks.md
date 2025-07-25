⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBytes    | 2_017_313    | 1_396_925  | $0.0000018574 | $1.85             | <font color="green">-4_324</font>   |
| 1   | getBytes    | 2_623_344    | 1_639_337  | $0.0000021798 | $2.17             | <font color="red">+6_683</font>     |
| 2   | getBytes    | 9_350_754    | 4_330_301  | $0.0000057579 | $5.75             | <font color="red">+95_131</font>    |
| 3   | getBytes    | 75_951_838   | 30_970_735 | $0.0000411809 | $41.18            | <font color="red">+1_002_693</font> |
| 4   | getBytes    | 149_946_233  | 60_568_493 | $0.0000805361 | $80.53            | <font color="red">+2_004_293</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 2_021_637    | 1_398_654  | $0.0000018597 | $1.85             |
| 1   | getBytes    | 2_616_661    | 1_636_664  | $0.0000021762 | $2.17             |
| 2   | getBytes    | 9_255_623    | 4_292_249  | $0.0000057073 | $5.70             |
| 3   | getBytes    | 74_949_145   | 30_569_658 | $0.0000406476 | $40.64            |
| 4   | getBytes    | 147_941_940  | 59_766_776 | $0.0000794701 | $79.47            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
