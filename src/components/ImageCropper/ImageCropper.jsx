/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import Button from "../Button/Button";
import setCanvasPreview from "./setCanvasPreview";

const MIN_DIMENSION = 300;
const ASPECT_RATIO = 750 / 442;

const ImageCropper = ({ imageUrl, onClose, updateThumbnail }) => {
  const cropperRef = useRef();
  const [crop, setCrop] = useState();
  const imgRef = useRef();
  const canvasRef = useRef();

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] z-[100]  bg-black bg-opacity-90 overflow-auto">
      <div className="h-full grid items-center">
        <div className="max-w-[750px] w-full mx-auto">
          <div>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => {
                setCrop(percentCrop);
              }}
              keepSelection
              aspect={ASPECT_RATIO}
              ref={cropperRef}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                className="crop-image w-full object-cover max-w-full"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <div className="buttons flex gap-1">
            <Button
              styles="w-full mx-auto bg-transparent border border-violet-500 text-violet-500 hover:text-white"
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              styles="w-full mx-auto"
              handleClick={() => {
                setCanvasPreview(
                  imgRef.current,
                  canvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = canvasRef.current.toDataURL();
                updateThumbnail(dataUrl);
                onClose();
              }}
            >
              Crop Image
            </Button>
          </div>
        </div>
        {crop && (
          <canvas
            ref={canvasRef}
            className="mt-4"
            style={{
              display: "none",
              border: "1px solid black",
              width: MIN_DIMENSION,
              height: MIN_DIMENSION,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageCropper;
