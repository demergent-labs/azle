# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_231_095    | 1_082_438 | $0.0000014393 | $1.43             | <font color="green">-1_024</font> |
| 1   | count       | 1_178_170    | 1_061_268 | $0.0000014111 | $1.41             | <font color="red">+1_144</font>   |
| 2   | reset       | 1_177_287    | 1_060_914 | $0.0000014107 | $1.41             | <font color="green">-2_240</font> |
| 3   | count       | 1_185_723    | 1_064_289 | $0.0000014152 | $1.41             | <font color="green">-312</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_232_119    | 1_082_847 | $0.0000014398 | $1.43             |
| 1   | count       | 1_177_026    | 1_060_810 | $0.0000014105 | $1.41             |
| 2   | reset       | 1_179_527    | 1_061_810 | $0.0000014119 | $1.41             |
| 3   | count       | 1_186_035    | 1_064_414 | $0.0000014153 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
