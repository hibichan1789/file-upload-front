const inputFile = document.querySelector("#upload-file") as HTMLInputElement;
const fileInfo = document.querySelector("#file-info") as HTMLParagraphElement;
const fileArea = document.querySelector("#file-upload-area") as HTMLDivElement;
const uploadButton = document.querySelector("#upload-button") as HTMLButtonElement;
let fileState:File|null = null;
function extractFileName(uploadFile:File):string{
    return uploadFile.name;
}
function showFileName(uploadFile:File, para:HTMLParagraphElement):void{
    const fileName = extractFileName(uploadFile);
    para.textContent = `選択されたファイル名: ${fileName}`;
}
function validateFileSize(uploadFile:File, maxMB:number=2):boolean{
    return uploadFile.size <= maxMB * 1024 * 1024;
}
inputFile.addEventListener("change", ()=>{
    console.log("ファイルが選択された");
    const uploadFiles = inputFile.files;
    if(!uploadFiles){
        return;
    }
    const uploadFile = uploadFiles[0] as File;
    console.log(uploadFile)
    if(!validateFileSize(uploadFile)){
        window.alert("ファイルサイズが大きすぎます");
        return;
    }
    showFileName(uploadFile, fileInfo);
    fileState = uploadFile;
});
fileArea.addEventListener("dragover", (event:DragEvent)=>{
    event.preventDefault();
    fileInfo.textContent = "ここにドロップしてください";
    fileArea.classList.add("drag-over");
});
fileArea.addEventListener("dragleave", ()=>{
    fileArea.classList.remove("drag-over");
    if(fileState){
        showFileName(fileState, fileInfo);
    }
    else{
        fileInfo.textContent =  "ここにファイルをドラッグするか選択してください";
    }
});
fileArea.addEventListener("drop", (event:DragEvent)=>{
    event.preventDefault();
    const uploadFiles = event.dataTransfer?.files;
    if(!uploadFiles){
        return;
    }
    const uploadFile = uploadFiles[0] as File;
    console.log(uploadFile);
    fileArea.classList.remove("drag-over");
    if(!validateFileSize(uploadFile)){
        window.alert("ファイルサイズが大きすぎます");
        return;
    }
    showFileName(uploadFile, fileInfo);
    fileState = uploadFile;
});

uploadButton.addEventListener("click", (event)=>{
    event.preventDefault();
    if(!fileState){
        window.alert("ファイルを選択してください");
        return;
    }
    console.log(`${fileState.name}をアップロード中`);
    //ここに将来的にfetch処理を書けたら面白そう
    fileState = null;
    fileInfo.textContent = "ここにファイルをドラッグするか選択してください";
});