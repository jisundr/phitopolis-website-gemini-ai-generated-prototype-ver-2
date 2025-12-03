import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'transparent'); // Background handled by parent

    // Create random nodes
    const numNodes = 50;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 2 + 1
    }));

    // Create links between nodes
    const links: { source: number; target: number }[] = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() < 0.08) {
          links.push({ source: i, target: j });
        }
      }
    }

    const g = svg.append('g');

    const animate = () => {
      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      // Clear previous frame
      g.selectAll('*').remove();

      // Draw links - Light Blue/White lines for Blue background
      g.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('x1', d => nodes[d.source].x)
        .attr('y1', d => nodes[d.source].y)
        .attr('x2', d => nodes[d.target].x)
        .attr('y2', d => nodes[d.target].y)
        .attr('stroke', '#60A5FA') // Blue-400
        .attr('stroke-opacity', 0.15)
        .attr('stroke-width', 1);

      // Draw nodes - Phitopolis Yellow
      g.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
        .attr('fill', '#F6C600') // Brand Yellow
        .attr('opacity', 0.8);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
        if(svgRef.current && containerRef.current) {
            d3.select(svgRef.current)
                .attr('width', containerRef.current.clientWidth)
                .attr('height', containerRef.current.clientHeight);
        }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
        <svg ref={svgRef} className="w-full h-full pointer-events-none" />
    </div>
  );
};

export default NetworkBackground;