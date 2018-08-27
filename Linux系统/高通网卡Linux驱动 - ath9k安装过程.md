# 高通网卡Linux驱动 - ath9k安装过程
	Ath9k 即 Qualcomm Altheros AR9xxx 系列网卡，具体的列表可以在[这里 -> ath9k products][https://wireless.wiki.kernel.org/en/users/drivers/ath9k/products]查看，一些Linux发行版比如笔者在用的 Deepin 内核并没有相关驱动,因此需要自行下载编译。
	
## 查看自己的网卡型号
	在Linux环境下可以使用```lsusb```命令来查看系统PCI设备列表，比如我的结果是：
```bash
dexfire@DESKTOP-NF66BL9:~$ lspci
00:00.0 Host bridge: Intel Corporation 2nd Generation Core Processor Family DRAM Controller (rev 09)
00:02.0 VGA compatible controller: Intel Corporation 2nd Generation Core Processor Family Integrated Graphics Controller (rev 09)
00:16.0 Communication controller: Intel Corporation 7 Series/C216 Chipset Family MEI Controller #1 (rev 04)
00:1a.0 USB controller: Intel Corporation 7 Series/C216 Chipset Family USB Enhanced Host Controller #2 (rev 04)
00:1b.0 Audio device: Intel Corporation 7 Series/C216 Chipset Family High Definition Audio Controller (rev 04)
00:1c.0 PCI bridge: Intel Corporation 7 Series/C216 Chipset Family PCI Express Root Port 1 (rev c4)
00:1d.0 USB controller: Intel Corporation 7 Series/C216 Chipset Family USB Enhanced Host Controller #1 (rev 04)
00:1f.0 ISA bridge: Intel Corporation 7 Series Chipset Family LPC Controller (rev 04)
00:1f.2 SATA controller: Intel Corporation 7 Series Chipset Family 6-port SATA Controller [AHCI mode] (rev 04)
00:1f.3 SMBus: Intel Corporation 7 Series/C216 Chipset Family SMBus Controller (rev 04)
01:00.0 Network controller: **Qualcomm Atheros AR9485 Wireless Network Adapter (rev 01)**
```
	其中加粗的部分就是ath9k系列产品之一。
	
# 检查驱动是否已经加载
使用```lsmod | grep ath9k```来查看已经加载的驱动，
```
dexfire@DESKTOP-NF66BL9:~$ lsmod | grep ath
ath9k                 151552  0
ath9k_common           36864  1 ath9k
ath3k                  20480  0
ath9k_hw              471040  2 ath9k,ath9k_common
ath                    28672  3 ath9k_hw,ath9k,ath9k_common
mac80211              778240  1 ath9k
cfg80211              622592  5 wl,mac80211,ath9k,ath,ath9k_common
bluetooth             544768  13 btrtl,btintel,bnep,btbcm,ath3k,btusb
multipath              16384  0
```
已经加载好了。


