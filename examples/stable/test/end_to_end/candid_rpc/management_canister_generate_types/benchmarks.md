# Benchmarks for management_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_928_003   | 6_961_201  | $0.0000092561 | $9.25             |
| 1   | executeUpdateSettings     | 17_242_771   | 7_487_108  | $0.0000099554 | $9.95             |
| 2   | getCanisterStatus         | 3_745_653    | 2_088_261  | $0.0000027767 | $2.77             |
| 3   | executeInstallCode        | 29_137_646   | 12_245_058 | $0.0000162819 | $16.28            |
| 4   | executeUninstallCode      | 4_399_403    | 2_349_761  | $0.0000031244 | $3.12             |
| 5   | getCanisterStatus         | 3_742_050    | 2_086_820  | $0.0000027748 | $2.77             |
| 6   | executeUploadChunk        | 17_923_669   | 7_759_467  | $0.0000103175 | $10.31            |
| 7   | getStoredChunks           | 3_053_841    | 1_811_536  | $0.0000024087 | $2.40             |
| 8   | getStoredChunks           | 3_054_166    | 1_811_666  | $0.0000024089 | $2.40             |
| 9   | executeInstallChunkedCode | 20_721_538   | 8_878_615  | $0.0000118056 | $11.80            |
| 10  | executeUninstallCode      | 4_403_245    | 2_351_298  | $0.0000031265 | $3.12             |
| 11  | executeClearChunkStore    | 3_048_216    | 1_809_286  | $0.0000024058 | $2.40             |
| 12  | getStoredChunks           | 3_050_843    | 1_810_337  | $0.0000024072 | $2.40             |
| 13  | getCanisterStatus         | 3_740_203    | 2_086_081  | $0.0000027738 | $2.77             |
| 14  | executeDepositCycles      | 3_055_765    | 1_812_306  | $0.0000024098 | $2.40             |
| 15  | getCanisterStatus         | 3_744_038    | 2_087_615  | $0.0000027758 | $2.77             |
| 16  | executeUninstallCode      | 4_395_666    | 2_348_266  | $0.0000031224 | $3.12             |
| 17  | getCanisterStatus         | 3_743_116    | 2_087_246  | $0.0000027753 | $2.77             |
| 18  | executeStopCanister       | 3_061_406    | 1_814_562  | $0.0000024128 | $2.41             |
| 19  | getCanisterStatus         | 3_760_085    | 2_094_034  | $0.0000027844 | $2.78             |
| 20  | getCanisterStatus         | 3_755_970    | 2_092_388  | $0.0000027822 | $2.78             |
| 21  | executeStartCanister      | 3_063_712    | 1_815_484  | $0.0000024140 | $2.41             |
| 22  | getCanisterStatus         | 3_751_725    | 2_090_690  | $0.0000027799 | $2.77             |
| 23  | getCanisterStatus         | 3_744_267    | 2_087_706  | $0.0000027760 | $2.77             |
| 24  | getCanisterInfo           | 6_631_347    | 3_242_538  | $0.0000043115 | $4.31             |
| 25  | executeStopCanister       | 3_051_030    | 1_810_412  | $0.0000024073 | $2.40             |
| 26  | executeDeleteCanister     | 3_050_714    | 1_810_285  | $0.0000024071 | $2.40             |
| 27  | getRawRand                | 910_453      | 954_181    | $0.0000012687 | $1.26             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
