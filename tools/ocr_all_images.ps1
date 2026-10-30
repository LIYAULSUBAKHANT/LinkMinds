# PowerShell script to OCR all images using Windows.Media.Ocr
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]

$asyncOp = [Windows.Globalization.Language]::new("en-US")
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($asyncOp)
if (-not $engine) {
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
}

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { 
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' 
}[0]

function Await($asyncOp, $type) {
    $netTask = $asTaskGeneric.MakeGenericMethod($type).Invoke($null, @($asyncOp))
    $netTask.Wait()
    return $netTask.Result
}

New-Item -ItemType Directory -Force -Path "reference_extracted\ocr" | Out-Null
$images = Get-ChildItem "reference_extracted\embedded_images\*.png" | Sort-Object Name

foreach ($img in $images) {
    try {
        $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($img.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
        
        $outPath = "reference_extracted\ocr\$($img.BaseName).txt"
        $result.Text | Out-File -FilePath $outPath -Encoding utf8
        Write-Output "OCRed $($img.Name): $($result.Lines.Count) lines"
    } catch {
        Write-Output "Error on $($img.Name): $_"
    }
}
Write-Output "OCR Completed!"

