const uploadBox = document.querySelector('.upload-box');
const previewImg = uploadBox.querySelector('img');
const fileInput = uploadBox.querySelector('input');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const ratioInput = document.querySelector('#lock-asp');
const qualityInput = document.querySelector('#compress');
const downloadBtn = document.querySelector('.btn.download');

let ogAspectRatio, fileName;
const loadFile = function (e) {
	try {
		const file = e.target.files[0];
		fileName = file.name;
		console.log(file);
		previewImg.src = URL.createObjectURL(file);
		previewImg.addEventListener('load', function () {
			widthInput.value = previewImg.naturalWidth;
			heightInput.value = previewImg.naturalHeight;
			ogAspectRatio = previewImg.naturalWidth / previewImg.naturalHeight;
			document.querySelector('.wrapper').classList.add('active');
		});
	} catch (error) {
		console.log(new Error(error.message));
	}
};
widthInput.addEventListener('keyup', () => {
	const height = ratioInput.checked ? widthInput.value / ogAspectRatio : heightInput.value;
	heightInput.value = Math.trunc(height);
});
heightInput.addEventListener('keyup', () => {
	const width = ratioInput.checked ? heightInput.value * ogAspectRatio : widthInput.value;
	widthInput.value = Math.trunc(width);
});
const resizeAndDownload = function () {
	const anchor = document.createElement('a');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const imgQuality = qualityInput.checked ? 0.7 : 1.0;
	canvas.width = widthInput.value;
	canvas.height = heightInput.value;

	ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
	anchor.href = canvas.toDataURL('image/jpeg', imgQuality);
	anchor.download = fileName.replace(/\.[^/.]+$/, '') + '(1)';
	anchor.click();
};
downloadBtn.addEventListener('click', resizeAndDownload);
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', () => fileInput.click());
