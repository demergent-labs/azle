# Benchmarks for management_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | executeCreateCanister     | 164_975_809  | 66_580_323 | $0.0000885299 | $88.52            | <font color="red">+949_384</font>   |
| 1   | executeUpdateSettings     | 166_367_897  | 67_137_158 | $0.0000892703 | $89.27            | <font color="red">+1_118_191</font> |
| 2   | getCanisterStatus         | 153_549_568  | 62_009_827 | $0.0000824526 | $82.45            | <font color="red">+1_067_719</font> |
| 3   | executeInstallCode        | 178_685_814  | 72_064_325 | $0.0000958218 | $95.82            | <font color="red">+937_285</font>   |
| 4   | executeUninstallCode      | 154_083_706  | 62_223_482 | $0.0000827367 | $82.73            | <font color="red">+1_184_481</font> |
| 5   | getCanisterStatus         | 153_557_252  | 62_012_900 | $0.0000824567 | $82.45            | <font color="red">+1_174_063</font> |
| 6   | executeUploadChunk        | 168_046_916  | 67_808_766 | $0.0000901633 | $90.16            | <font color="red">+1_054_178</font> |
| 7   | getStoredChunks           | 152_476_778  | 61_580_711 | $0.0000818820 | $81.88            | <font color="red">+1_035_168</font> |
| 8   | getStoredChunks           | 152_657_288  | 61_652_915 | $0.0000819780 | $81.97            | <font color="red">+1_115_775</font> |
| 9   | executeInstallChunkedCode | 170_438_458  | 68_765_383 | $0.0000914353 | $91.43            | <font color="red">+963_646</font>   |
| 10  | executeUninstallCode      | 153_965_427  | 62_176_170 | $0.0000826738 | $82.67            | <font color="red">+980_793</font>   |
| 11  | executeClearChunkStore    | 152_946_053  | 61_768_421 | $0.0000821316 | $82.13            | <font color="red">+1_032_490</font> |
| 12  | getStoredChunks           | 152_528_520  | 61_601_408 | $0.0000819095 | $81.90            | <font color="red">+1_018_850</font> |
| 13  | getCanisterStatus         | 153_451_931  | 61_970_772 | $0.0000824007 | $82.40            | <font color="red">+1_039_765</font> |
| 14  | executeDepositCycles      | 152_478_905  | 61_581_562 | $0.0000818832 | $81.88            | <font color="red">+952_451</font>   |
| 15  | getCanisterStatus         | 153_387_661  | 61_945_064 | $0.0000823665 | $82.36            | <font color="red">+880_328</font>   |
| 16  | executeUninstallCode      | 153_974_415  | 62_179_766 | $0.0000826786 | $82.67            | <font color="red">+897_715</font>   |
| 17  | getCanisterStatus         | 153_491_858  | 61_986_743 | $0.0000824219 | $82.42            | <font color="red">+1_042_926</font> |
| 18  | executeStopCanister       | 152_532_610  | 61_603_044 | $0.0000819117 | $81.91            | <font color="red">+921_062</font>   |
| 19  | getCanisterStatus         | 153_475_062  | 61_980_024 | $0.0000824130 | $82.41            | <font color="red">+970_687</font>   |
| 20  | getCanisterStatus         | 153_466_030  | 61_976_412 | $0.0000824082 | $82.40            | <font color="red">+1_014_411</font> |
| 21  | executeStartCanister      | 152_675_111  | 61_660_044 | $0.0000819875 | $81.98            | <font color="red">+961_498</font>   |
| 22  | getCanisterStatus         | 153_563_422  | 62_015_368 | $0.0000824600 | $82.45            | <font color="red">+1_102_820</font> |
| 23  | getCanisterStatus         | 153_394_034  | 61_947_613 | $0.0000823699 | $82.36            | <font color="red">+919_841</font>   |
| 24  | getCanisterInfo           | 156_694_954  | 63_267_981 | $0.0000841255 | $84.12            | <font color="red">+1_020_565</font> |
| 25  | executeStopCanister       | 152_616_930  | 61_636_772 | $0.0000819566 | $81.95            | <font color="red">+1_124_208</font> |
| 26  | executeDeleteCanister     | 152_577_201  | 61_620_880 | $0.0000819354 | $81.93            | <font color="red">+1_013_373</font> |
| 27  | getRawRand                | 150_555_745  | 60_812_298 | $0.0000808603 | $80.86            | <font color="red">+1_220_752</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 164_026_425  | 66_200_570 | $0.0000880249 | $88.02            |
| 1   | executeUpdateSettings     | 165_249_706  | 66_689_882 | $0.0000886755 | $88.67            |
| 2   | getCanisterStatus         | 152_481_849  | 61_582_739 | $0.0000818847 | $81.88            |
| 3   | executeInstallCode        | 177_748_529  | 71_689_411 | $0.0000953233 | $95.32            |
| 4   | executeUninstallCode      | 152_899_225  | 61_749_690 | $0.0000821067 | $82.10            |
| 5   | getCanisterStatus         | 152_383_189  | 61_543_275 | $0.0000818322 | $81.83            |
| 6   | executeUploadChunk        | 166_992_738  | 67_387_095 | $0.0000896026 | $89.60            |
| 7   | getStoredChunks           | 151_441_610  | 61_166_644 | $0.0000813315 | $81.33            |
| 8   | getStoredChunks           | 151_541_513  | 61_206_605 | $0.0000813846 | $81.38            |
| 9   | executeInstallChunkedCode | 169_474_812  | 68_379_924 | $0.0000909227 | $90.92            |
| 10  | executeUninstallCode      | 152_984_634  | 61_783_853 | $0.0000821521 | $82.15            |
| 11  | executeClearChunkStore    | 151_913_563  | 61_355_425 | $0.0000815825 | $81.58            |
| 12  | getStoredChunks           | 151_509_670  | 61_193_868 | $0.0000813677 | $81.36            |
| 13  | getCanisterStatus         | 152_412_166  | 61_554_866 | $0.0000818477 | $81.84            |
| 14  | executeDepositCycles      | 151_526_454  | 61_200_581 | $0.0000813766 | $81.37            |
| 15  | getCanisterStatus         | 152_507_333  | 61_592_933 | $0.0000818983 | $81.89            |
| 16  | executeUninstallCode      | 153_076_700  | 61_820_680 | $0.0000822011 | $82.20            |
| 17  | getCanisterStatus         | 152_448_932  | 61_569_572 | $0.0000818672 | $81.86            |
| 18  | executeStopCanister       | 151_611_548  | 61_234_619 | $0.0000814218 | $81.42            |
| 19  | getCanisterStatus         | 152_504_375  | 61_591_750 | $0.0000818967 | $81.89            |
| 20  | getCanisterStatus         | 152_451_619  | 61_570_647 | $0.0000818686 | $81.86            |
| 21  | executeStartCanister      | 151_713_613  | 61_275_445 | $0.0000814761 | $81.47            |
| 22  | getCanisterStatus         | 152_460_602  | 61_574_240 | $0.0000818734 | $81.87            |
| 23  | getCanisterStatus         | 152_474_193  | 61_579_677 | $0.0000818806 | $81.88            |
| 24  | getCanisterInfo           | 155_674_389  | 62_859_755 | $0.0000835827 | $83.58            |
| 25  | executeStopCanister       | 151_492_722  | 61_187_088 | $0.0000813586 | $81.35            |
| 26  | executeDeleteCanister     | 151_563_828  | 61_215_531 | $0.0000813965 | $81.39            |
| 27  | getRawRand                | 149_334_993  | 60_323_997 | $0.0000802110 | $80.21            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
