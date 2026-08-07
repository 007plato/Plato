$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

Write-Host "正在启动个人网站本地编辑器..." -ForegroundColor Cyan
Write-Host "打开地址: http://localhost:5173/?edit=1"
Write-Host "关闭这个窗口即可停止本地服务。"
Write-Host ""

Start-Process "http://localhost:5173/?edit=1"
npm.cmd run dev -- --host 0.0.0.0 --port 5173
