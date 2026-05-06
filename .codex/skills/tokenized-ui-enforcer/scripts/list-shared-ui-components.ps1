param(
  [string]$UiPath = "src/components/ui"
)

if (-not (Test-Path -Path $UiPath)) {
  Write-Error "Path not found: $UiPath"
  exit 1
}

$files = Get-ChildItem -Path $UiPath -File -Filter *.tsx |
  Where-Object { $_.Name -notlike "*.stories.tsx" } |
  Sort-Object Name

if ($files.Count -eq 0) {
  Write-Output "No shared UI components found in $UiPath."
  exit 0
}

Write-Output "Shared UI components:"
$files | ForEach-Object {
  $componentName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  Write-Output ("- {0} ({1})" -f $componentName, $_.FullName.Replace("\", "/"))
}

Write-Output ""
Write-Output ("Total components: {0}" -f $files.Count)

