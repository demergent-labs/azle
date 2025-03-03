# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance        | 80_274_624   | 32_699_849 | $0.0000434800 | $43.48            | <font color="red">+28_855</font>    |
| 1   | getBalance        | 80_125_049   | 32_640_019 | $0.0000434005 | $43.40            | <font color="green">-26_194</font>  |
| 2   | getDepositAddress | 103_586_914  | 42_024_765 | $0.0000558791 | $55.87            | <font color="green">-18_899</font>  |
| 3   | getDepositAddress | 103_541_296  | 42_006_518 | $0.0000558548 | $55.85            | <font color="green">-46_855</font>  |
| 4   | updateBalance     | 103_509_816  | 41_993_926 | $0.0000558381 | $55.83            | <font color="red">+7_354</font>     |
| 5   | updateBalance     | 103_496_068  | 41_988_427 | $0.0000558308 | $55.83            | <font color="green">-153_323</font> |
| 6   | getBalance        | 80_238_605   | 32_685_442 | $0.0000434609 | $43.46            | <font color="red">+61_456</font>    |
| 7   | getBalance        | 80_269_702   | 32_697_880 | $0.0000434774 | $43.47            | <font color="red">+55_605</font>    |
| 8   | transfer          | 88_587_902   | 36_025_160 | $0.0000479016 | $47.90            | <font color="red">+53_968</font>    |
| 9   | getBalance        | 80_227_546   | 32_681_018 | $0.0000434550 | $43.45            | <font color="red">+17_410</font>    |
| 10  | getBalance        | 80_204_070   | 32_671_628 | $0.0000434425 | $43.44            | <font color="green">-41_131</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance        | 80_245_769   | 32_688_307 | $0.0000434647 | $43.46            |
| 1   | getBalance        | 80_151_243   | 32_650_497 | $0.0000434144 | $43.41            |
| 2   | getDepositAddress | 103_605_813  | 42_032_325 | $0.0000558891 | $55.88            |
| 3   | getDepositAddress | 103_588_151  | 42_025_260 | $0.0000558797 | $55.87            |
| 4   | updateBalance     | 103_502_462  | 41_990_984 | $0.0000558342 | $55.83            |
| 5   | updateBalance     | 103_649_391  | 42_049_756 | $0.0000559123 | $55.91            |
| 6   | getBalance        | 80_177_149   | 32_660_859 | $0.0000434282 | $43.42            |
| 7   | getBalance        | 80_214_097   | 32_675_638 | $0.0000434478 | $43.44            |
| 8   | transfer          | 88_533_934   | 36_003_573 | $0.0000478729 | $47.87            |
| 9   | getBalance        | 80_210_136   | 32_674_054 | $0.0000434457 | $43.44            |
| 10  | getBalance        | 80_245_201   | 32_688_080 | $0.0000434644 | $43.46            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
