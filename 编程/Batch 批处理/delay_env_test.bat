@echo off
set VAR=before
if "%VAR%" == "before" (
    set VAR=after
    if "!VAR!" == "after" @echo If you see this, it worked
)

set LIST=
for %i in (*) do set LIST=!LIST! %i
echo %LIST%