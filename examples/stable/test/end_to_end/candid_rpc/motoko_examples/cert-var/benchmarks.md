# Benchmarks for cert-var

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 2_068_967    | 1_417_586 | $0.0000018849 | $1.88             | <font color="green">-7_954</font> |
| 1   | inc         | 2_311_400    | 1_514_560 | $0.0000020139 | $2.01             | <font color="red">+1_748</font>   |
| 2   | set         | 2_048_174    | 1_409_269 | $0.0000018739 | $1.87             | <font color="red">+2_122</font>   |
| 3   | inc         | 2_309_497    | 1_513_798 | $0.0000020129 | $2.01             | <font color="green">-1_540</font> |
| 4   | set         | 2_044_308    | 1_407_723 | $0.0000018718 | $1.87             | <font color="green">-720</font>   |
| 5   | inc         | 2_312_805    | 1_515_122 | $0.0000020146 | $2.01             | <font color="red">+3_035</font>   |
| 6   | set         | 2_044_223    | 1_407_689 | $0.0000018718 | $1.87             | <font color="red">+124</font>     |
| 7   | inc         | 2_310_011    | 1_514_004 | $0.0000020131 | $2.01             | <font color="red">+1_686</font>   |
| 8   | set         | 2_042_138    | 1_406_855 | $0.0000018707 | $1.87             | <font color="green">-5_423</font> |
| 9   | inc         | 2_314_002    | 1_515_600 | $0.0000020152 | $2.01             | <font color="green">-1_077</font> |
| 10  | set         | 2_048_855    | 1_409_542 | $0.0000018742 | $1.87             | <font color="green">-1_020</font> |
| 11  | inc         | 2_308_961    | 1_513_584 | $0.0000020126 | $2.01             | <font color="green">-6_367</font> |
| 12  | set         | 2_089_215    | 1_425_686 | $0.0000018957 | $1.89             | <font color="red">+87</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_076_921    | 1_420_768 | $0.0000018892 | $1.88             |
| 1   | inc         | 2_309_652    | 1_513_860 | $0.0000020129 | $2.01             |
| 2   | set         | 2_046_052    | 1_408_420 | $0.0000018727 | $1.87             |
| 3   | inc         | 2_311_037    | 1_514_414 | $0.0000020137 | $2.01             |
| 4   | set         | 2_045_028    | 1_408_011 | $0.0000018722 | $1.87             |
| 5   | inc         | 2_309_770    | 1_513_908 | $0.0000020130 | $2.01             |
| 6   | set         | 2_044_099    | 1_407_639 | $0.0000018717 | $1.87             |
| 7   | inc         | 2_308_325    | 1_513_330 | $0.0000020122 | $2.01             |
| 8   | set         | 2_047_561    | 1_409_024 | $0.0000018735 | $1.87             |
| 9   | inc         | 2_315_079    | 1_516_031 | $0.0000020158 | $2.01             |
| 10  | set         | 2_049_875    | 1_409_950 | $0.0000018748 | $1.87             |
| 11  | inc         | 2_315_328    | 1_516_131 | $0.0000020160 | $2.01             |
| 12  | set         | 2_089_128    | 1_425_651 | $0.0000018956 | $1.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
