import React, { useRef, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface CustomMouseEvent {
  offsetX: number;
  offsetY: number;
}

enum Tool {
  DRAW = 'draw',
  ERASE = 'erase',
}

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useRef<Socket>();
  const [tool, setTool] = useState<Tool>(Tool.DRAW);
  const [drawing, setDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let isDrawing = false;

    socket.current = io(); // Connect to the current server (same domain)

    const startDrawing = (e: MouseEvent) => {
      const currentTool = tool;
      isDrawing = true;
      setDrawing(true);
      if (currentTool === Tool.DRAW) draw({ offsetX: e.offsetX, offsetY: e.offsetY });
      else erase({ offsetX: e.offsetX, offsetY: e.offsetY });
    };

    const draw = ({ offsetX, offsetY }: CustomMouseEvent) => {
      if (!isDrawing || tool !== Tool.DRAW) return;

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
          tool: Tool.DRAW,
        });
      }
    };

    const erase = ({ offsetX, offsetY }: CustomMouseEvent) => {
        const eraseSize = 10; // Size of the eraser
        ctx.clearRect(offsetX - eraseSize / 2, offsetY - eraseSize / 2, eraseSize, eraseSize);
        if (socket.current) {
          socket.current.emit('draw', {
            x: offsetX,
            y: offsetY,
            type: 'mousemove',
            tool: Tool.ERASE,
          });
        }
      };
      

    const stopDrawing = () => {
      isDrawing = false;
      setDrawing(false);
      ctx.beginPath();

      if (socket.current) {
        socket.current.emit('draw', { type: 'mouseup' });
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    socket.current.on('draw', ({ x, y, type, tool }: { x: number; y: number; type: string; tool: Tool }) => {
      if (type === 'mousedown') startDrawing({ offsetX: x, offsetY: y } as MouseEvent);
      else if (type === 'mousemove') draw({ offsetX: x, offsetY: y });
      else if (type === 'mouseup' || type === 'mouseout') stopDrawing();
    });

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [tool]);

  const switchToDraw = () => setTool(Tool.DRAW);
  const switchToErase = () => setTool(Tool.ERASE);

  return (
    <div style={{ border: '1px solid black', marginBottom: '20px', padding: '10px' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={switchToDraw} style={{ marginRight: '10px' }}>Draw</button>
        <button onClick={switchToErase} style={{ marginRight: '10px' }}>Erase</button>
      </div>
    </div>
  );
};

export default Whiteboard;
