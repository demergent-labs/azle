# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | getBalance        | 80_156_302   | 32_652_520 | $0.0000434171 | $43.41            | <font color="red">+74_718_126</font> |
| 1   | getBalance        | 80_175_693   | 32_660_277 | $0.0000434274 | $43.42            | <font color="red">+74_790_568</font> |
| 2   | getDepositAddress | 103_667_617  | 42_057_046 | $0.0000559220 | $55.92            | <font color="red">+97_952_725</font> |
| 3   | getDepositAddress | 103_597_916  | 42_029_166 | $0.0000558849 | $55.88            | <font color="red">+97_881_882</font> |
| 4   | updateBalance     | 103_435_923  | 41_964_369 | $0.0000557988 | $55.79            | <font color="red">+97_725_069</font> |
| 5   | updateBalance     | 103_503_305  | 41_991_322 | $0.0000558346 | $55.83            | <font color="red">+97_795_695</font> |
| 6   | getBalance        | 80_257_390   | 32_692_956 | $0.0000434708 | $43.47            | <font color="red">+74_866_049</font> |
| 7   | getBalance        | 80_187_046   | 32_664_818 | $0.0000434334 | $43.43            | <font color="red">+74_796_828</font> |
| 8   | transfer          | 88_569_361   | 36_017_744 | $0.0000478917 | $47.89            | <font color="red">+74_672_652</font> |
| 9   | getBalance        | 80_157_898   | 32_653_159 | $0.0000434179 | $43.41            | <font color="red">+74_766_568</font> |
| 10  | getBalance        | 80_140_608   | 32_646_243 | $0.0000434087 | $43.40            | <font color="red">+74_746_708</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance        | 5_438_176    | 2_765_270 | $0.0000036769 | $3.67             |
| 1   | getBalance        | 5_385_125    | 2_744_050 | $0.0000036487 | $3.64             |
| 2   | getDepositAddress | 5_714_892    | 2_875_956 | $0.0000038241 | $3.82             |
| 3   | getDepositAddress | 5_716_034    | 2_876_413 | $0.0000038247 | $3.82             |
| 4   | updateBalance     | 5_710_854    | 2_874_341 | $0.0000038219 | $3.82             |
| 5   | updateBalance     | 5_707_610    | 2_873_044 | $0.0000038202 | $3.82             |
| 6   | getBalance        | 5_391_341    | 2_746_536 | $0.0000036520 | $3.65             |
| 7   | getBalance        | 5_390_218    | 2_746_087 | $0.0000036514 | $3.65             |
| 8   | transfer          | 13_896_709   | 6_148_683 | $0.0000081757 | $8.17             |
| 9   | getBalance        | 5_391_330    | 2_746_532 | $0.0000036520 | $3.65             |
| 10  | getBalance        | 5_393_900    | 2_747_560 | $0.0000036533 | $3.65             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
