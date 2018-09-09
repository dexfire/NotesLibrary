# Vmware Linux 系统共享 Windows 文件夹

## 安装 Vmware Tools

可以使用自带的 Vmware Tools， 也可以使用 apt 来获取。

## 查询共享的文件夹

使用`vmware-hgfsclient`来查询共享文件夹。

## 挂载共享文件夹

使用`/usr/bin/vmhgfs-fuse .host:/ /mnt/win -o subtype=vmhgfs-fuse,allow_other`来挂载共享文件夹到`/mnt/win`下。