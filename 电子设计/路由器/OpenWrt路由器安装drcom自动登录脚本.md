---
title: Openwrt 路由器安装drcom自动登录脚本
---

# Openwrt 路由器安装drcom自动登录脚本

## 在Windows中打开ssh

可以使用 `putty.exe` 终端，也可以使用 `ssh root@192.168.1.1` 来连接ssh。

输出这个就算是ok了。

```s
H:\Software\Python27>ssh root@192.168.10.1
root@192.168.10.1's password:

BusyBox v1.23.2 (2017-02-07 22:21:24 CST) built-in shell (ash)

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------
 CHAOS CALMER (Chaos Calmer, r49407)
 -----------------------------------------------------
  * 1 1/2 oz Gin            Shake with a glassful
  * 1/4 oz Triple Sec       of broken ice and pour
  * 3/4 oz Lime Juice       unstrained into a goblet.
  * 1 1/2 oz Orange Juice
  * 1 tsp. Grenadine Syrup
  * This firmware is compiled by rapistor(明月永在). QQ 273584038
 -----------------------------------------------------
root@OpenWrt:~# ls
```

## 下载 & 安装 依赖包

需要的软件包有：

- libffi*.ipk
- python-mini*.ipk
- python_2.*.ipk

来源地址：  
    `http://archive.openwrt.org/<version_name>/<version_code>/<device_cpu_series>/generic/packages/packages/`  
例如：  
    `http://archive.openwrt.org/chaos_calmer/15.05.1/ar71xx/generic/packages/packages/`

下载方法：

    1. 进入/tmp `cd /tmp`
    2. 使用wget下载 `wget -c wget -c http://archive.openwrt.org/chaos_calmer/15.05.1/ar71xx/generic/packages/packages/libffi_3.0.13-1_ar71xx.ipk`
    3. 使用opkg安装 `opkg install libffi_3.0.13-1_ar71xx.ipk`
    4. 剩下的均按照此方法安装...

---
更新依赖列表：

- python-light
- python-openssl
- python-logging

注：只需要使用 `opkg` 安装这三个就可以，依赖会自动解析。