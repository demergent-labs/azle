# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance               | 158_491_407  | 63_986_562 | $0.0000850810 | $85.08            | <font color="red">+1_048_461</font> |
| 1   | getUtxos                 | 160_512_130  | 64_794_852 | $0.0000861558 | $86.15            | <font color="red">+1_070_063</font> |
| 2   | getCurrentFeePercentiles | 156_752_038  | 63_290_815 | $0.0000841559 | $84.15            | <font color="red">+1_047_083</font> |
| 3   | sendTransaction          | 157_384_796  | 63_543_918 | $0.0000844924 | $84.49            | <font color="red">+1_055_308</font> |
| 4   | getCurrentFeePercentiles | 156_856_754  | 63_332_701 | $0.0000842116 | $84.21            | <font color="red">+1_165_146</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 157_442_946  | 63_567_178 | $0.0000845234 | $84.52            |
| 1   | getUtxos                 | 159_442_067  | 64_366_826 | $0.0000855866 | $85.58            |
| 2   | getCurrentFeePercentiles | 155_704_955  | 62_871_982 | $0.0000835990 | $83.59            |
| 3   | sendTransaction          | 156_329_488  | 63_121_795 | $0.0000839312 | $83.93            |
| 4   | getCurrentFeePercentiles | 155_691_608  | 62_866_643 | $0.0000835919 | $83.59            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
