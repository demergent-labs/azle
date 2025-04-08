# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 5_135_055_255 | 4_054_612_102 | $0.0053912961 | $5_391.29         | <font color="red">+41_747_442</font> |
| 1   | ethGetBalance       | 181_989_588   | 73_385_835    | $0.0000975789 | $97.57            | <font color="red">+1_125_521</font>  |
| 2   | ethGetBalance       | 181_916_336   | 73_356_534    | $0.0000975400 | $97.53            | <font color="red">+1_110_539</font>  |
| 3   | ethGetBalance       | 182_027_417   | 73_400_966    | $0.0000975991 | $97.59            | <font color="red">+1_287_608</font>  |
| 4   | ethGetBlockByNumber | 180_817_259   | 72_916_903    | $0.0000969554 | $96.95            | <font color="red">+1_037_987</font>  |
| 5   | ethGetBlockByNumber | 180_862_931   | 72_935_172    | $0.0000969797 | $96.97            | <font color="red">+1_153_573</font>  |
| 6   | ethGetBlockByNumber | 180_776_828   | 72_900_731    | $0.0000969339 | $96.93            | <font color="red">+1_061_104</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_093_307_813 | 4_037_913_125 | $0.0053690919 | $5_369.09         |
| 1   | ethGetBalance       | 180_864_067   | 72_935_626    | $0.0000969803 | $96.98            |
| 2   | ethGetBalance       | 180_805_797   | 72_912_318    | $0.0000969493 | $96.94            |
| 3   | ethGetBalance       | 180_739_809   | 72_885_923    | $0.0000969142 | $96.91            |
| 4   | ethGetBlockByNumber | 179_779_272   | 72_501_708    | $0.0000964033 | $96.40            |
| 5   | ethGetBlockByNumber | 179_709_358   | 72_473_743    | $0.0000963662 | $96.36            |
| 6   | ethGetBlockByNumber | 179_715_724   | 72_476_289    | $0.0000963695 | $96.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
