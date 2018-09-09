@echo off
bash -c curl http://ip.3322.net 
set ip=`bash -c curl http://ip.3322.net `
echo %ip%