import { useColorModeValue, useToken } from "@chakra-ui/react";
import { useEffect } from "react";

interface IllustrationProps {
  errorsAmount: number;
}

const drawBase = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(20, 220);
  ctx.lineTo(75, 220);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(45, 220);
  ctx.lineTo(45, 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(45, 20);
  ctx.lineTo(200, 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 20);
  ctx.lineTo(200, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(45, 70);
  ctx.lineTo(90, 20);
  ctx.stroke();
};

const drawHead = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(200, 70, 20, 0, 2 * Math.PI);
  ctx.stroke();
};

const drawBody = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(200, 90);
  ctx.lineTo(200, 150);
  ctx.stroke();
};

const drawLeftArm = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(170, 120);
  ctx.stroke();
};

const drawRightArm = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(230, 120);
  ctx.stroke();
};

const drawLeftLeg = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(200, 150);
  ctx.lineTo(170, 170);
  ctx.stroke();
};

const drawRightLeg = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(200, 150);
  ctx.lineTo(230, 170);
  ctx.stroke();
};

const setStroke = (ctx: CanvasRenderingContext2D, color: string) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
};

const resetDraw = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
};

const drawActions = [
  drawHead,
  drawBody,
  drawLeftArm,
  drawRightArm,
  drawLeftLeg,
  drawRightLeg,
];

const draw = (
  ctx: CanvasRenderingContext2D,
  errorsAmount: number,
  color: string
) => {
  setStroke(ctx, color);

  drawBase(ctx);

  const neccesaryDrawActions = drawActions.slice(0, errorsAmount);
  neccesaryDrawActions.forEach((drawAction) => drawAction(ctx));
};

const Illustration: React.FC<IllustrationProps> = ({ errorsAmount }) => {
  const [textDefault, textDefaultDark] = useToken("colors", [
    "text.default",
    "text.defaultDark",
  ]);

  const color = useColorModeValue(textDefault, textDefaultDark);

  useEffect(() => {
    const canvas = document.getElementById(
      "hangman-illustration"
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      if (errorsAmount === 0) {
        resetDraw(ctx, canvas.width, canvas.height);
      }

      draw(ctx, errorsAmount, color);
    }
  }, [errorsAmount, color]);

  return <canvas id="hangman-illustration" width={230} height={230}></canvas>;
};

export default Illustration;
