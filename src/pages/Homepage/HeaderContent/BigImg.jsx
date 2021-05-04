const ImageReader = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
  });
};

const BigImg = ({ src, alt, ...props }) => {
  console.log(src);
  ImageReader(src).then(() => <img src={src} alt={alt} {...props} />);
  return <img src={src} alt={alt} {...props} />;
};

export default BigImg;
