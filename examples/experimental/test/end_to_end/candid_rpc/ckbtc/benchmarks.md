# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance        | 80_129_196   | 32_641_678 | $0.0000434027 | $43.40            | <font color="green">-145_428</font> |
| 1   | getBalance        | 80_128_347   | 32_641_338 | $0.0000434022 | $43.40            | <font color="red">+3_298</font>     |
| 2   | getDepositAddress | 103_631_245  | 42_042_498 | $0.0000559026 | $55.90            | <font color="red">+44_331</font>    |
| 3   | getDepositAddress | 103_521_575  | 41_998_630 | $0.0000558443 | $55.84            | <font color="green">-19_721</font>  |
| 4   | updateBalance     | 103_542_413  | 42_006_965 | $0.0000558554 | $55.85            | <font color="red">+32_597</font>    |
| 5   | updateBalance     | 103_448_381  | 41_969_352 | $0.0000558054 | $55.80            | <font color="green">-47_687</font>  |
| 6   | getBalance        | 80_108_266   | 32_633_306 | $0.0000433915 | $43.39            | <font color="green">-130_339</font> |
| 7   | getBalance        | 80_155_671   | 32_652_268 | $0.0000434167 | $43.41            | <font color="green">-114_031</font> |
| 8   | transfer          | 88_500_437   | 35_990_174 | $0.0000478551 | $47.85            | <font color="green">-87_465</font>  |
| 9   | getBalance        | 80_191_487   | 32_666_594 | $0.0000434358 | $43.43            | <font color="green">-36_059</font>  |
| 10  | getBalance        | 80_210_169   | 32_674_067 | $0.0000434457 | $43.44            | <font color="red">+6_099</font>     |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance        | 80_274_624   | 32_699_849 | $0.0000434800 | $43.48            |
| 1   | getBalance        | 80_125_049   | 32_640_019 | $0.0000434005 | $43.40            |
| 2   | getDepositAddress | 103_586_914  | 42_024_765 | $0.0000558791 | $55.87            |
| 3   | getDepositAddress | 103_541_296  | 42_006_518 | $0.0000558548 | $55.85            |
| 4   | updateBalance     | 103_509_816  | 41_993_926 | $0.0000558381 | $55.83            |
| 5   | updateBalance     | 103_496_068  | 41_988_427 | $0.0000558308 | $55.83            |
| 6   | getBalance        | 80_238_605   | 32_685_442 | $0.0000434609 | $43.46            |
| 7   | getBalance        | 80_269_702   | 32_697_880 | $0.0000434774 | $43.47            |
| 8   | transfer          | 88_587_902   | 36_025_160 | $0.0000479016 | $47.90            |
| 9   | getBalance        | 80_227_546   | 32_681_018 | $0.0000434550 | $43.45            |
| 10  | getBalance        | 80_204_070   | 32_671_628 | $0.0000434425 | $43.44            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
