# BCDEdit 概述
> BCDEdit 是 Windows 启动管理程序，灵活使用可以解决很多问题，比如简洁优雅的安装 Ubuntu ISO 镜像。

### BCDEdit help

微软的帮助简直又臭又长，GUID=__众所周知的标识符__这翻译也是活见鬼了，看完还是不知道怎么使用，又没有 Linux man 那样强大的 manual 手册，只有自己一步一步摸索了~

```
C:\>bcdedit /? /create

此命令在启动配置数据存储中创建新项。如果
指定了众所周知的标识符，则不能
指定 /application、/inherit 和 /device 选项。如果未指定 <id>，
或者 <id> 非众所周知，则必须指定 /application、/inherit
或 /device 选项。

bcdedit /create [{<id>}] [/d <description>] [/application <apptype> |
    /inherit [<apptype>] | /inherit DEVICE | /device]

    <id>                    指定要用于新项的
                            标识符。有关标识符的详细信息，请运行
                            "bcdedit /? ID"。

    <description>           指定要应用于新项的
                            描述。

    /application <apptype>  指定新项必须是应用程
                            序项。<apptype> 指定应用程序类型。
                            <apptype> 可以是下列类型之一:

                                BOOTAPP
                                BOOTSECTOR
                                OSLOADER
                                RESUME
                                STARTUP

                            如果使用其他应用程序类型而不是
                            这些类型之一，则还必须指定众所周知的
                            标识符。

    /inherit [<apptype>]    指定新项必须是继
                            承项，<apptype> 指定应用程序
                            类型。如果未指定 <apptype>，则任何项
                            都可以继承该项。如果已指定，
                            则 <apptype> 可以是下列类型之一:

                                BOOTMGR
                                BOOTSECTOR
                                FWBOOTMGR
                                MEMDIAG
                                NTLDR
                                OSLOADER
                                RESUME

                            此修饰符可防止 <apptype> 的
                            应用程序项继承该继承项。

    /inherit DEVICE         指定新项必须是继承
                            项，且该项只能由
                            设备选项项继承。

    /device                 指定新项必须是附加的
                            设备选项项。
...
```

### 系统启动项配置示例
```
C:\>bcdedit

Windows 启动管理器
--------------------
标识符                  {bootmgr}
**device                  partition=C:**
description             Windows Boot Manager
locale                  zh-CN
inherit                 {globalsettings}
default                 {current}
resumeobject            {7d24403d-9e54-11e8-a98a-b05e96d7a6af}
displayorder            {current}
                        {334d38b1-b3ef-11e7-8bea-ac9e17e11ccd}
toolsdisplayorder       {memdiag}
timeout                 10

Windows 启动加载器
-------------------
标识符                  {current}
**device                  partition=C:
path                    \WINDOWS\system32\winload.exe**
description             Windows 10
locale                  zh-CN
inherit                 {bootloadersettings}
recoverysequence        {ac014489-9e54-11e8-b56a-8d4f42caf12a}
displaymessageoverride  Recovery
recoveryenabled         Yes
allowedinmemorysettings 0x15000075
osdevice                partition=C:
systemroot              \WINDOWS
resumeobject            {7d24403d-9e54-11e8-a98a-b05e96d7a6af}
nx                      OptIn
bootmenupolicy          Standard

实模式启动扇区
---------------------
标识符                  {334d38b1-b3ef-11e7-8bea-ac9e17e11ccd}
**device                  partition=F:
path                    \deepin\winboot\wubildr.mbr**
description             Deepin
```

    这里可以看到，同样是 Linux 系统出身的 Deepin 启动项非常简洁，从所有启动项都有device项来看，device是必须存在的值。
    暂时还看不出来启动方式是什么，要知道系统启动方式，我们先要了解系统从通电按开机键到系统启动进入桌面都经历了哪些初始化过程。

## PC OS 启动流程

    首先我们知道，我们的开机操作（戳一下开机按钮）是在直接对主板操作的，根据常识来说，这一步之后应该有以下流程。

    按开机键 --> 主板通电 --> 主板初始化基本外设[CPU、内存、键盘、鼠标、显示器]
     --> 启动BIOS，BIOS决定从哪里引导系统 --> OS Loader --> 硬件完全初始化 --> 软件系统初始化 --> 进入登陆界面  --> 见到可爱的桌面

## 主板管理的引导方式 - BIOS（Basic Iput Output System）/ UEIF（Unified Extensible Fimware Interface）启动
    比较新的PC主板一般都支持UEFI引导模式了，同时出于兼容性考虑一般会保留传统的BIOS引导方式，只是换了个名字叫做Legacy Mode。    
**BIOS和UEFI简单比较**
    因为偏离话题，这里简答概括： 
        - BIOS 效率低下，只能使用16位模式，不支持GPT（GUID Partition Table）的磁盘；
        - UEFI接口统一，在主板上就可以初始化到32bit或者64bit模式，支持大容量硬盘、大容量内存。

### BIOS（Legacy）引导模式
    BIOS引导，现在被称作Legacy（传统，遗留）模式也就是老版本的引导模式，只支持MBR分区表的硬盘。 
[我心目中的BIOS大概是这个样子。][https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=22316f5d700e0cf3b4fa46a96b2f997a/d058ccbf6c81800aabbb4b41b33533fa828b4727.jpg]

#### **MBR引导程序**
> MBR: Master Boot Record主引导记录，位于硬盘第一个Sector（扇区）结构为[分区表446 Bytes -- 引导程序54 Bytes -- 校验数据8 Bytes]。

启动的时候，从硬盘最开头512字节读取出引导程序--MBR，MBR的引导程序包含了活动分区标识（Windows磁盘管理或者Diskgenius之类的工具可以查看和修改），MBR引导程序做的事情很简单，就是把系统控制权转让给活动分区头部定义的引导程序--VBR。

没有图，因为从来没有人见过这个东东，MBR引导没有UI界面。
[非要有图的话大概就是这个样子吧。][https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534270416575&di=dc8f2f2edc89ac8f247d4b28d0bef7ac&imgtype=0&src=http%3A%2F%2Fwww.xinjiadiy.com%2Fimages%2Farticle_img%2Ftuwen%2F20170509%2F4524.jpg]


#### **VBR引导程序**
> VBR: Volume Boot Record，分区启动记录，是__Windows分区格式__[FAT系列，NTFS系列...]的头部第一个扇区内的的启动程序。
因为是Windows系分区才有的东西，所以不难想到VBR也是MS家独有的。
VBR可以使用bootsect.exe工具来修改。

和MBR一样，VBR也是见光死的东东，VBR本来也应该没有界面，但其实也不算是完全无界面，因为那个左上角一直在闪的小下划线就是VBR展示出来的。当系统启动文件丢失的时候，还会出现这个↓
[NTLDR is missing ...][https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534270970234&di=c65d7f7287cafec7b837caeca5706eb4&imgtype=0&src=http%3A%2F%2Fs16.sinaimg.cn%2Fmiddle%2F73c4589egb85cf69da05f%26690]
启动之后将控制权转给 OS Loader，OS Loader主要分为NT52和NT60两个分支，以下是详细介绍：
##### **NTLDR NT系统引导器(NT52)**
这是XP时代占领了我们90S几乎全部童年的主流引导方式，
[哇~是熟悉的感觉..][https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534271261752&di=626295e5a5b7d925a7dd41ef0553ab9a&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D150412567%2C61855605%26fm%3D214%26gp%3D0.jpg]
主要组成是
```
NTLDR
```

```
NTDETECT.COM
```

```
boot.ini
```

这三个文件，且必须位于分区根目录，
启动界面就是上面看到的熟悉的系统选择界面，然后从特定文件夹(Windows)，由NTLDR这个机器码程序来完成NT系统kernel的启动，系统的完全启动。
过程比较简单，这里就不过多分析了。

#####  **Windows Boot Manager(NT60)**
> Windows Boot Manager（WBM）是从Windows Vista时代开始进入我们视线的，微软重写了NTLDR代码，也就升级成bootmgr，它和NTLDR是处于同一层次的，至于开机是进入旧版的NTLDR，还是新版的WBM取决于VBR的配置。
[电脑被玩坏的时候会出现这个有木有？][https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534271437916&di=d751711827ba5b14700cc27beaf8277d&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4afbfbedab64034fff8d9bafadc379310b551dd2.jpg]
- 程序本体bootmgr
位于
```
C:\bootmgr
```

，且只能位于活动分区根目录。
- 配置文件BCD
WBM的配置文件是BCD（Boot Configure Data），BCD文件结构是类似于注册表二进制文件，启动时被挂载到注册表的[HKEY_LOCAL_MACHINE\BCD00000000]位置，你可以在这里看到相关的启动参数，有权限的话也可以用regedit.exe在这里修改启动参数（前提是要能看得懂它的神秘代码T^T）。
BCD在Legacy模式对应于文件
```
C:\Boot\BCD
```

，同时还有一份用于UEFI模式的拷贝，位于
```
C:\EFI\Microsoft\Boot\BCD
```

**修改BCD数据的工具**
- bcdedit.exe
命令行，无界面，高效，强大。
- regedit.exe
可能只有Geek才会用吧，毕竟12000004代表description这种事情只有程序员才会去记是不是？😳
- EasyBCD
比较好用，不过也是要按教程来操作。
- BCDTICE
小而强大。
- Visual BCD Editor
没听过，没用过。

**Windows 10 无法修改BCD的解释**
在win10下传统打开CMD 是无法编辑BCDedit
需要按 Win+X+Shift+A 以管理员的身份打开CMD ，然后再输入bcdedit

**Windows Boot Manager所支持的启动类型**
选择非常丰富，它实现了启动过程的多样化跳转，具体支持的启动方式如下：
- application - 从某个二进制文件启动。
    - bootapp
    启动器文件，可以是ntldr，bootmgr，gnu grub(类unix系统)等等。
    - bootsector
    从一个分区启动，比如Win 10、XP双系统在启动XP时候就是用的这一类型。
    - osloader
    启动一个NT6+类Windows系统，对应于winload.exe，包括Vista、Win 7、Win 8、Win 10都可以按照这个类型来启动。
    - resume
    网上资料很少，似乎是一种数据恢复模式，启动文件为winresume.exe。
    - startup
    猜测是继续启动。

- inherit - 继承模式
    - bootmgr
    - bootsector
    - fwbootmgr
    Firmware boot这个选项支持启动到特殊固件区域，比如平板电脑的刷机模式。
    - ntldr
    - osloader
    - resume
    - device

- special - 系统内置标识符，都是特殊启动方式
    - { bootmgr } 
    指定启动管理器程序，没错，你可以换一个启动管理器。
    - { ntldr }
    类XP系统。
    - { default }
    默认启动项。
    - ...

- device - 设备启动，U盘、光盘或者第二硬盘的启动。


### EFI启动模式
> EFI 和 Legacy 模式的区别很大，UEFI在微软的文档中被描述为
```
- Firmware boot loaders provided by the SoC vendor.
- UEFI (Unified Extensible Firmware Interface) environment provided by the SoC vendor.
```
，EFI模式由板载系统直接将系统硬件初始化，然后从EFI保留分区读取
```
.efi
```
格式数据。
通过EFI可以直接启动 Boot Manager 甚至是直接启动一个系统，相比于传统启动模式，EFI省略了很多跳转，对于硬件条件足够强大的今天，EFI可以大大加快启动速度，减少启动过程中出现的问题（传统模式中任何一个环节出错系统都无法正常启动）。

[EFI启动模式][https://docs.microsoft.com/en-us/windows-hardware/drivers/bringup/images/oem-boot-flow-overview.png]


#### First-Stage bootloaders (FSBL)
根据 Wikipedia 的描述，系统在启动之前先初始化部分内存，



