
# ContextMenu 和 OptionsMenu

## ContextMenu

ContextMenu 是弹窗式菜单

## OptionsMenu

OptionsMenu 是和 ActionBar 紧密联系的，它在 `OnCreateOptionMenu()` 时被创建，
在 `OnOptionMenuSelected()` 中接受回调，并且可以用简单的menu xml形式来设置样式、图标、分组、是否展示到ActionBar等复杂需求，是一个不错的选择。