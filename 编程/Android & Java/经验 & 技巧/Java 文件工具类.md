

## ReadFile from Samsung

```java
public static byte[] readFile(String path) {
    Exception e;
    Throwable th;
    FileInputStream fis = null;
    byte[] data = null;
    try {
        FileInputStream fis2 = new FileInputStream(path);
        try {
            data = new byte[fis2.available()];
            fis2.read(data);
            close(fis2);
            fis = fis2;
        } catch (Exception e2) {
            e = e2;
            fis = fis2;
            try {
                e.printStackTrace();
                close(fis);
                return data;
            } catch (Throwable th2) {
                th = th2;
                close(fis);
                throw th;
            }
        } catch (Throwable th3) {
            th = th3;
            fis = fis2;
            close(fis);
            throw th;
        }
    } catch (Exception e3) {
        e = e3;
        e.printStackTrace();
        close(fis);
        return data;
    }
    return data;
}
```

## WriteFile(File,byte[]) from Samsung

```java
public static void writeFile(String path, byte[] data) {
    Exception e;
    Throwable th;
    FileOutputStream fos = null;
    try {
        FileOutputStream fos2 = new FileOutputStream(path);
        try {
            fos2.write(data);
            close(fos2);
            fos = fos2;
        } catch (Exception e2) {
            e = e2;
            fos = fos2;
            try {
                e.printStackTrace();
                close(fos);
            } catch (Throwable th2) {
                th = th2;
                close(fos);
                throw th;
            }
        } catch (Throwable th3) {
            th = th3;
            fos = fos2;
            close(fos);
            throw th;
        }
    } catch (Exception e3) {
        e = e3;
        e.printStackTrace();
        close(fos);
    }
}
```

## 读取文件示例，getcid() from Samsung

```java
public byte[] getCid() {
    Exception e;
    Throwable th;
    File file = new File("/sys/block/mmcblk0/device/cid");
    byte[] cid = new byte[32];
    Arrays.fill(cid, IKwbToken.PADDING);
    if (file.isFile()) {
        int bytesRead = 0;
        FileInputStream fis = null;
        try {
            FileInputStream fis2 = new FileInputStream(file);
            try {
                bytesRead = fis2.read(cid, 0, 32);
                KwbUtils.close(fis2);
                fis = fis2;
            } catch (Exception e2) {
                e = e2;
                fis = fis2;
                try {
                    e.printStackTrace();
                    KwbUtils.close(fis);
                    if (bytesRead != 32) {
                        return cid;
                    }
                    Log.d("LibKwb", "wrong cid");
                    return cid;
                } catch (Throwable th2) {
                    th = th2;
                    KwbUtils.close(fis);
                    throw th;
                }
            } catch (Throwable th3) {
                th = th3;
                fis = fis2;
                KwbUtils.close(fis);
                throw th;
            }
        } catch (Exception e3) {
            e = e3;
            e.printStackTrace();
            KwbUtils.close(fis);
            if (bytesRead != 32) {
                return cid;
            }
            Log.d("LibKwb", "wrong cid");
            return cid;
        }
        if (bytesRead != 32) {
            return cid;
        }
        Log.d("LibKwb", "wrong cid");
        return cid;
    }
    cid = unitarraycopy(SystemProperties.get(READONLY_SERIAL_NUM).getBytes());
    Log.d("LibKwb", "No cid");
    return cid;
}
```
