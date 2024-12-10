# Benchmarks for timers

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | setTimers   | 10_019_546   | 4_597_818 | $0.0000061136 | $6.11             | <font color="green">-120_804</font> |
| 1   | clearTimer  | 1_205_300    | 1_072_120 | $0.0000014256 | $1.42             | <font color="red">+25_095</font>    |
| 2   | clearTimer  | 1_203_824    | 1_071_529 | $0.0000014248 | $1.42             | <font color="red">+24_078</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setTimers   | 10_140_350   | 4_646_140 | $0.0000061778 | $6.17             |
| 1   | clearTimer  | 1_180_205    | 1_062_082 | $0.0000014122 | $1.41             |
| 2   | clearTimer  | 1_179_746    | 1_061_898 | $0.0000014120 | $1.41             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
