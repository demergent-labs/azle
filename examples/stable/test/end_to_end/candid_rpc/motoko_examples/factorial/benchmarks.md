# Benchmarks for factorial

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | fac         | 1_308_914    | 6_308_914  | $0.0000086432 | $8.64             | <font color="green">-23_900</font>  |
| 1   | fac         | 1_281_209    | 6_281_209  | $0.0000086053 | $8.60             | <font color="green">-34_627</font>  |
| 2   | fac         | 1_731_601    | 6_731_601  | $0.0000092223 | $9.22             | <font color="green">-66_734</font>  |
| 3   | fac         | 2_950_577    | 7_950_577  | $0.0000108923 | $10.89            | <font color="green">-142_470</font> |
| 4   | fac         | 5_452_102    | 10_452_102 | $0.0000143194 | $14.31            | <font color="green">-256_357</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | fac         | 1_332_814    | 6_332_814  | $0.0000086760 | $8.67             |
| 1   | fac         | 1_315_836    | 6_315_836  | $0.0000086527 | $8.65             |
| 2   | fac         | 1_798_335    | 6_798_335  | $0.0000093137 | $9.31             |
| 3   | fac         | 3_093_047    | 8_093_047  | $0.0000110875 | $11.08            |
| 4   | fac         | 5_708_459    | 10_708_459 | $0.0000146706 | $14.67            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
