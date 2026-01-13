// ===================================
// Image Cropper Functionality
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadArea = document.getElementById('uploadArea');
    const cropperArea = document.getElementById('cropperArea');
    const cropperImage = document.getElementById('cropperImage');
    const previewArea = document.getElementById('previewArea');
    const previewCanvas = document.getElementById('previewCanvas');
    
    const cropBtn = document.getElementById('cropBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const newImageBtn = document.getElementById('newImageBtn');
    const backToEditBtn = document.getElementById('backToEditBtn');
    
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const flipHBtn = document.getElementById('flipH');
    const flipVBtn = document.getElementById('flipV');
    const resetBtn = document.getElementById('reset');
    
    let cropper = null;
    let scaleX = 1;
    let scaleY = 1;
    
    // Upload button click
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            imageInput.click();
        });
    }
    
    // Upload area click
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            imageInput.click();
        });
    }
    
    // Drag and drop support
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
            uploadArea.style.backgroundColor = 'var(--bg-secondary)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });
    }
    
    // File input change
    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileSelect(file);
            }
        });
    }
    
    // Handle file selection
    function handleFileSelect(file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPG, PNG, or WEBP)');
            return;
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            cropperImage.src = e.target.result;
            initCropper();
            
            // Show cropper area, hide upload area
            uploadArea.classList.add('hidden');
            cropperArea.classList.remove('hidden');
            previewArea.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
    
    // Initialize Cropper.js
    function initCropper() {
        if (cropper) {
            cropper.destroy();
        }
        
        cropper = new Cropper(cropperImage, {
            aspectRatio: NaN, // Free aspect ratio
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.8,
            restore: false,
            guides: true,
            center: true,
            highlight: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
            responsive: true,
            background: true,
        });
        
        // Reset scale values
        scaleX = 1;
        scaleY = 1;
    }
    
    // Aspect ratio buttons
    document.querySelectorAll('.btn-control[data-ratio]').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.btn-control[data-ratio]').forEach(b => {
                b.classList.remove('active');
            });
            // Add active class to clicked
            btn.classList.add('active');
            
            const ratio = btn.dataset.ratio;
            if (cropper) {
                if (ratio === 'free') {
                    cropper.setAspectRatio(NaN);
                } else {
                    cropper.setAspectRatio(parseFloat(ratio));
                }
            }
        });
    });
    
    // Control buttons
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', () => {
            if (cropper) cropper.rotate(-45);
        });
    }
    
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', () => {
            if (cropper) cropper.rotate(45);
        });
    }
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (cropper) cropper.zoom(0.1);
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (cropper) cropper.zoom(-0.1);
        });
    }
    
    if (flipHBtn) {
        flipHBtn.addEventListener('click', () => {
            if (cropper) {
                scaleX = scaleX === 1 ? -1 : 1;
                cropper.scaleX(scaleX);
            }
        });
    }
    
    if (flipVBtn) {
        flipVBtn.addEventListener('click', () => {
            if (cropper) {
                scaleY = scaleY === 1 ? -1 : 1;
                cropper.scaleY(scaleY);
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (cropper) {
                cropper.reset();
                scaleX = 1;
                scaleY = 1;
            }
        });
    }
    
    // Crop and preview button
    if (cropBtn) {
        cropBtn.addEventListener('click', () => {
            if (!cropper) return;
            
            // Get cropped canvas
            const croppedCanvas = cropper.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            
            if (!croppedCanvas) {
                alert('Failed to crop image. Please try again.');
                return;
            }
            
            // Display preview
            const ctx = previewCanvas.getContext('2d');
            previewCanvas.width = croppedCanvas.width;
            previewCanvas.height = croppedCanvas.height;
            ctx.drawImage(croppedCanvas, 0, 0);
            
            // Show preview area, hide cropper area
            cropperArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
            
            // Scroll to preview
            previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (!previewCanvas) return;
            
            // Create download link
            previewCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const timestamp = new Date().getTime();
                link.download = `nano-cropper-${timestamp}.png`;
                link.href = url;
                link.click();
                
                // Clean up
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 100);
            });
        });
    }
    
    // Back to edit button
    if (backToEditBtn) {
        backToEditBtn.addEventListener('click', () => {
            previewArea.classList.add('hidden');
            cropperArea.classList.remove('hidden');
            
            // Scroll to cropper
            cropperArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Upload new image button
    if (newImageBtn) {
        newImageBtn.addEventListener('click', () => {
            if (cropper) {
                cropper.destroy();
                cropper = null;
            }
            
            // Reset file input
            imageInput.value = '';
            
            // Show upload area, hide others
            uploadArea.classList.remove('hidden');
            cropperArea.classList.add('hidden');
            previewArea.classList.add('hidden');
            
            // Reset aspect ratio buttons
            document.querySelectorAll('.btn-control[data-ratio]').forEach(b => {
                b.classList.remove('active');
            });
            document.querySelector('.btn-control[data-ratio="free"]').classList.add('active');
            
            // Scroll to upload
            uploadArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});