import Image from "next/image";

interface IllustrationProps {
  errorsAmount: number;
}

const Illustration: React.FC<IllustrationProps> = ({ errorsAmount }) => {
  const imgProps = [
    { src: "/illustrations/ahorcado_empty.png", alt: "No errors" },
    { src: "/illustrations/ahorcado_1.png", alt: "1 errors" },
    { src: "/illustrations/ahorcado_2.png", alt: "2 errors" },
    { src: "/illustrations/ahorcado_3.png", alt: "3 errors" },
    { src: "/illustrations/ahorcado_4.png", alt: "4 errors" },
    { src: "/illustrations/ahorcado_5.png", alt: "5 errors" },
    { src: "/illustrations/ahorcado_6.png", alt: "6 errors" },
  ][errorsAmount];

  return (
    <Image src={imgProps.src} alt={imgProps.alt} width={360} height={360} />
  );
};

export default Illustration;
