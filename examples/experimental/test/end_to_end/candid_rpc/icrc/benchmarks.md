# Benchmarks for proxy

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | icrc1_transfer      | 95_215_963   | 38_676_385 | $0.0000514268 | $51.42            | <font color="red">+71_436</font>   |
| 1   | icrc2_approve       | 102_811_397  | 41_714_558 | $0.0000554666 | $55.46            | <font color="red">+34_167</font>   |
| 2   | icrc2_transfer_from | 100_370_179  | 40_738_071 | $0.0000541682 | $54.16            | <font color="green">-2_194</font>  |
| 3   | icrc2_allowance     | 86_620_767   | 35_238_306 | $0.0000468553 | $46.85            | <font color="green">-83_660</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | icrc1_transfer      | 95_144_527   | 38_647_810 | $0.0000513888 | $51.38            |
| 1   | icrc2_approve       | 102_777_230  | 41_700_892 | $0.0000554484 | $55.44            |
| 2   | icrc2_transfer_from | 100_372_373  | 40_738_949 | $0.0000541694 | $54.16            |
| 3   | icrc2_allowance     | 86_704_427   | 35_271_770 | $0.0000468998 | $46.89            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
