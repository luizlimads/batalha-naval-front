export class GiraImgs {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private rotatedImages: { [key: number]: string };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.rotatedImages = {};
    }

    loadImage(url: string) {
        const img = new Image();
        img.onload = () => {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.ctx!.drawImage(img, 0, 0);
            this.saveRotatedImages();
        };
        img.src = url;
    }

    private rotateAndSave(degrees: number) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const rotatedCanvas = document.createElement('canvas');
        const rotatedCtx = rotatedCanvas.getContext('2d');

        if (degrees === 90 || degrees === 270) {
            rotatedCanvas.width = height;
            rotatedCanvas.height = width;
        } else {
            rotatedCanvas.width = width;
            rotatedCanvas.height = height;
        }

        rotatedCtx!.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
        rotatedCtx!.rotate(degrees * Math.PI / 180);
        rotatedCtx!.drawImage(this.canvas, -width / 2, -height / 2);

        const imgSrc = rotatedCanvas.toDataURL();
        console.log("imagem:",imgSrc)
        this.rotatedImages[degrees] = imgSrc;
    }

    private saveRotatedImages() {
        this.rotatedImages = {}; // Clear previous images
        this.rotateAndSave(0);
        this.rotateAndSave(90);
        this.rotateAndSave(180);
        this.rotateAndSave(270);
    }

    getRotatedImage(degrees: number): string {
        return this.rotatedImages[degrees];
    }

    getImgGiradas(): any {
        console.log("entrei", this.rotatedImages)
        return this.rotatedImages;
    }
}

