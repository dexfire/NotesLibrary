## TeamViewer 的一个Banner背景
[原地址](https://community.teamviewer.com/t5/Knowledge-Base/Zendesk-Support-User-Guide/ta-p/42248)
当时看到这个背景觉得还不错，就想着保存下来，结果发现这是对TeamViewer程序猿大大的大不敬...
进去一看，发现没有明确的背景url
找到两个url，
还发现是几乎全透明的。
结果去掉那个url，发现背景瞬变...

凭什么以为人家只会用img来作背景啊？
人家在TeamViewer用css代码写背景

附上代码：
```css
background-color: rgba(2, 123, 210, 0.9);
background-image: url(https://community.teamviewer.com/html/assets/bg_particles-left.png), url(https://community.teamviewer.com/html/assets/bg_particles-right.png), linear-gradient(61deg, rgba(0, 130, 235, 0.17) 0%, rgba(194, 217, 52, 0.29) 82%, rgba(235, 235, 13, 0.32) 100%);
background-position: 0, 100% 0, 0;
background-repeat: no-repeat, no-repeat, no-repeat;
padding-top: 50px;
padding-bottom: 30px;
```