import { Parallax } from 'react-parallax';

const Cover = ({
  image,
  title,
  subtitle,
  containerClass = "",
  overlayClass = "",
  middleContentClass = "",
  titleClass = "",
  subtitleClass = "",
  strength = 300,
  blur = { min: -15, max: 15 },
}) => {
  return (
    <Parallax
      bgImage={image}
      strength={strength}
      blur={blur}
      className={`w-full ${containerClass}`} // Height control here
    >
      <div className={`w-full h-full ${middleContentClass}`}>
        <div className={`bg-black bg-opacity-60 text-white text-center ${overlayClass}`}>
          <h1 className={`font-bold font-tang mb-3 ${titleClass}`}>{title}</h1>
          <p className={`${subtitleClass}`}>{subtitle}</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
