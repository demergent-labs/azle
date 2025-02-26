# Benchmarks for proxy

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | icrc1_transfer      | 15_448_016   | 6_769_206 | $0.0000090008 | $9.00             | <font color="green">-75_976</font> |
| 1   | icrc2_approve       | 19_061_665   | 8_214_666 | $0.0000109228 | $10.92            | <font color="green">-74_077</font> |
| 2   | icrc2_transfer_from | 17_991_657   | 7_786_662 | $0.0000103537 | $10.35            | <font color="green">-80_567</font> |
| 3   | icrc2_allowance     | 10_434_728   | 4_763_891 | $0.0000063344 | $6.33             | <font color="green">-44_160</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 15_523_992   | 6_799_596 | $0.0000090412 | $9.04             |
| 1   | icrc2_approve       | 19_135_742   | 8_244_296 | $0.0000109622 | $10.96            |
| 2   | icrc2_transfer_from | 18_072_224   | 7_818_889 | $0.0000103965 | $10.39            |
| 3   | icrc2_allowance     | 10_478_888   | 4_781_555 | $0.0000063579 | $6.35             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
