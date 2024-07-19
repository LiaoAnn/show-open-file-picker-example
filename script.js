const uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("click", async () => {
  const arrFileHandle = await getArrFileHandle().catch(() => {
    showToast("Reject by user, got no file", "error");
    return [];
  });

  if (arrFileHandle.length === 0) return;

  const files = await Promise.all(
    arrFileHandle.map((fileHandle) => fileHandle.getFile())
  );
  showToast(`Got ${files.length} files`);
});

const getArrFileHandle = () => {
  return new Promise((resolve, reject) => {
    window
      .showOpenFilePicker({
        types: [
          {
            description: "Images",
            accept: {
              "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp"],
            },
          },
        ],
        multiple: true,
      })
      .then(resolve)
      .catch(reject);
  });
};

const showToast = (message, icon = "success") => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  toast.fire({
    icon,
    title: message,
  });
};
