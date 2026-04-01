import React, { useEffect, useRef, useState, useCallback } from 'react';

// 节点类型
export type NodeType = 'insight' | 'photo' | 'quote' | 'recommend' | 'thought';
export type Category = 'life' | 'career' | 'tech' | 'philosophy' | 'creative';

// 颜色配置
const CATEGORY_COLORS: Record<Category, { main: string; glow: string; line: string }> = {
  life: { main: '#f4a261', glow: 'rgba(244, 162, 97, 0.6)', line: 'rgba(244, 162, 97, 0.3)' },
  career: { main: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.6)', line: 'rgba(42, 157, 143, 0.3)' },
  tech: { main: '#3a86ff', glow: 'rgba(58, 134, 255, 0.6)', line: 'rgba(58, 134, 255, 0.3)' },
  philosophy: { main: '#e9c46a', glow: 'rgba(233, 196, 106, 0.6)', line: 'rgba(233, 196, 106, 0.3)' },
  creative: { main: '#9b5de5', glow: 'rgba(155, 93, 229, 0.6)', line: 'rgba(155, 93, 229, 0.3)' },
};

// 示例数据 - 你可以在这里添加更多
const MEMORY_NODES: MemoryNode[] = [
  {
    id: '1',
    type: 'photo',
    category: 'life',
    content: '毕业那天，阳光正好',
    x: 0.2,
    y: 0.3,
    connections: ['2', '5'],
  },
  {
    id: '2',
    type: 'insight',
    category: 'career',
    content: '从商科到代码，转行的勇气是一步步积累的',
    x: 0.35,
    y: 0.25,
    connections: ['1', '3'],
  },
  {
    id: '3',
    type: 'quote',
    category: 'philosophy',
    content: '"The only way to do great work is to love what you do." - Steve Jobs',
    source: 'Steve Jobs',
    x: 0.5,
    y: 0.2,
    connections: ['2', '7'],
  },
  {
    id: '4',
    type: 'photo',
    category: 'life',
    content: '小狗说：今天也要开心',
    x: 0.15,
    y: 0.55,
    connections: ['5'],
  },
  {
    id: '5',
    type: 'thought',
    category: 'creative',
    content: '深夜写代码的时候，窗外有只猫一直在看',
    x: 0.3,
    y: 0.5,
    connections: ['1', '4', '6'],
  },
  {
    id: '6',
    type: 'recommend',
    category: 'tech',
    content: '最好用的 AI 工具',
    link: 'claude.ai',
    x: 0.45,
    y: 0.45,
    connections: ['5', '8'],
  },
  {
    id: '7',
    type: 'insight',
    category: 'philosophy',
    content: '技术只是手段，解决问题才是目的',
    x: 0.65,
    y: 0.3,
    connections: ['3', '8'],
  },
  {
    id: '8',
    type: 'recommend',
    category: 'tech',
    content: '设计灵感网站',
    link: 'are.na',
    x: 0.6,
    y: 0.5,
    connections: ['6', '7'],
  },
  {
    id: '9',
    type: 'quote',
    category: 'philosophy',
    content: '"Stay hungry, stay foolish."',
    source: 'Whole Earth Catalog',
    x: 0.75,
    y: 0.25,
    connections: ['7'],
  },
  {
    id: '10',
    type: 'thought',
    category: 'life',
    content: '下雨天最适合读博尔赫斯',
    x: 0.25,
    y: 0.7,
    connections: ['11'],
  },
  {
    id: '11',
    type: 'recommend',
    category: 'creative',
    content: '最爱的播客：忽左忽右',
    link: 'xiaoyuzhoufm.com',
    x: 0.4,
    y: 0.75,
    connections: ['10'],
  },
  {
    id: '12',
    type: 'insight',
    category: 'career',
    content: 'MBA 教会我的：用商业思维写代码',
    x: 0.8,
    y: 0.6,
    connections: ['2', '9'],
  },
];

interface MemoryNode {
  id: string;
  type: NodeType;
  category: Category;
  content: string;
  source?: string;
  link?: string;
  imageUrl?: string;
  x: number;
  y: number;
  connections: string[];
}

const MemoryConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<MemoryNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<MemoryNode[]>([]);

  // 初始化节点位置（转换为像素坐标）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateNodes = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      nodesRef.current = MEMORY_NODES.map(node => ({
        ...node,
        x: node.x * width,
        y: node.y * height,
      }));
    };

    updateNodes();
  }, []);

  // 绘制函数
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // 清除画布（带拖尾效果）
    ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const nodes = nodesRef.current;
    const time = Date.now() * 0.001;

    // 绘制连线
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target || node.id > targetId) return; // 避免重复绘制

        const colors = CATEGORY_COLORS[node.category];
        const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
        gradient.addColorStop(0, colors.line);
        gradient.addColorStop(1, CATEGORY_COLORS[target.category].line);

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 流动的小点
        const flowPos = (time * 0.5) % 1;
        const flowX = node.x + (target.x - node.x) * flowPos;
        const flowY = node.y + (target.y - node.y) * flowPos;
        
        ctx.beginPath();
        ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.main;
        ctx.fill();
      });
    });

    // 绘制节点
    nodes.forEach(node => {
      const colors = CATEGORY_COLORS[node.category];
      const isHovered = hoveredNode?.id === node.id;
      
      // 漂浮效果
      const floatY = Math.sin(time + parseInt(node.id)) * 3;
      const drawX = node.x;
      const drawY = node.y + floatY;

      // 外发光
      if (isHovered) {
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 30);
        gradient.addColorStop(0, colors.glow);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(drawX, drawY, 30, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // 节点圆圈
      ctx.beginPath();
      ctx.arc(drawX, drawY, isHovered ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = colors.main;
      ctx.fill();

      // 内部小点（闪烁）
      const twinkle = 0.7 + Math.sin(time * 2 + parseInt(node.id)) * 0.3;
      ctx.beginPath();
      ctx.arc(drawX, drawY, isHovered ? 4 : 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
      ctx.fill();

      // 类型图标（悬停时显示）
      if (isHovered) {
        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        const icon = getTypeIcon(node.type);
        ctx.fillText(icon, drawX, drawY - 15);
      }
    });

    animationRef.current = requestAnimationFrame(draw);
  }, [hoveredNode]);

  // 类型图标映射
  const getTypeIcon = (type: NodeType): string => {
    const icons: Record<NodeType, string> = {
      insight: '💡',
      photo: '📷',
      quote: '📖',
      recommend: '🔗',
      thought: '💭',
    };
    return icons[type];
  };

  // 类型标签
  const getTypeLabel = (type: NodeType): string => {
    const labels: Record<NodeType, string> = {
      insight: '感悟',
      photo: '瞬间',
      quote: '书摘',
      recommend: '推荐',
      thought: '碎碎念',
    };
    return labels[type];
  };

  // 启动动画
  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    // 查找悬停的节点
    const hovered = nodesRef.current.find(node => {
      const floatY = Math.sin(Date.now() * 0.001 + parseInt(node.id)) * 3;
      const dx = node.x - x;
      const dy = (node.y + floatY) - y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    setHoveredNode(hovered || null);
  };

  // 调整画布大小
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // 重新计算节点位置
      nodesRef.current = MEMORY_NODES.map(node => ({
        ...node,
        x: node.x * canvas.width,
        y: node.y * canvas.height,
      }));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="memory-constellation"
        onMouseMove={handleMouseMove}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto',
          cursor: hoveredNode ? 'pointer' : 'default',
          background: 'radial-gradient(ellipse at center, #0a0a12 0%, #020203 100%)',
        }}
      />
      
      {/* 悬停卡片 */}
      {hoveredNode && (
        <div
          className="memory-card"
          style={{
            position: 'fixed',
            left: mousePos.x + 20,
            top: mousePos.y - 20,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <div 
            className="memory-card-header"
            style={{ 
              borderColor: CATEGORY_COLORS[hoveredNode.category].main,
              background: CATEGORY_COLORS[hoveredNode.category].glow,
            }}
          >
            <span className="memory-card-type">{getTypeIcon(hoveredNode.type)} {getTypeLabel(hoveredNode.type)}</span>
            <span 
              className="memory-card-category"
              style={{ color: CATEGORY_COLORS[hoveredNode.category].main }}
            >
              {hoveredNode.category}
            </span>
          </div>
          <div className="memory-card-content">
            {hoveredNode.imageUrl && (
              <img src={hoveredNode.imageUrl} alt="" className="memory-card-image" />
            )}
            <p className="memory-card-text">{hoveredNode.content}</p>
            {hoveredNode.source && (
              <p className="memory-card-source">— {hoveredNode.source}</p>
            )}
            {hoveredNode.link && (
              <a 
                href={`https://${hoveredNode.link}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="memory-card-link"
                onClick={(e) => e.stopPropagation()}
              >
                {hoveredNode.link} ↗
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MemoryConstellation;
