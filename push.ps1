# Ejecuta esto después de cualquier cambio (tuyo o del asistente): add, commit y push a main.
# Así todo queda en la nube y GitHub Pages se actualiza solo.
Set-Location $PSScriptRoot
git add -A
git status
$msg = "Actualización calendario 2026"
if ($args.Count -gt 0) { $msg = $args -join " " }
$status = git status --porcelain
if ($status) {
  git commit -m $msg
  git branch -M main
  git push origin main
  Write-Host "Listo: cambios subidos a la nube (main)."
} else {
  Write-Host "No hay cambios que subir; ya está todo en la nube."
}
