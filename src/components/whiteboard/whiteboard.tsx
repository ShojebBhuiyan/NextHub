import React, { useRef, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface CustomMouseEvent {
  offsetX: number;
  offsetY: number;
}

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let isDrawing = false;

    socket.current = io(); // Connect to the current server (same domain)

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    socket.current.on('draw', ({ x, y, type }: { x: number; y: number; type: string }) => {
      if (type === 'mousedown') startDrawing({ offsetX: x, offsetY: y });
      else if (type === 'mousemove') draw({ offsetX: x, offsetY: y });
      else if (type === 'mouseup' || type === 'mouseout') stopDrawing();
    });

    function startDrawing(e: CustomMouseEvent) {
      isDrawing = true;
      draw(e);
    }

    function draw({ offsetX, offsetY }: CustomMouseEvent) {
      if (!isDrawing) return;

      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);

      if (socket.current) {
        socket.current.emit('draw', {
          x: offsetX,
          y: offsetY,
          type: 'mousemove',
        });
      }
    }

    function stopDrawing() {
      isDrawing = false;
      ctx.beginPath();

      if (socket.current) {
        socket.current.emit('draw', { type: 'mouseup' });
      }
    }

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Whiteboard;
