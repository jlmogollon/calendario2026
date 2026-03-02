# Ejecuta esto después de que el asistente haga cambios: hace add, commit en main y push.
Set-Location $PSScriptRoot
git add -A
git status
$msg = "Actualización calendario 2026"
if ($args.Count -gt 0) { $msg = $args -join " " }
git commit -m $msg
git branch -M main
git push origin main
