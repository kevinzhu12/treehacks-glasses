"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "aframe";

import { buildNote } from "@/lib/notetaker";

const ForceGraph3D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph3D),
  { ssr: false }
);

const Graph = () => {
  const [myData, setMyData] = useState<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const graphRef = React.useRef<any>();

  useEffect(() => {
    const getGraph = async () => {
      const res = await fetch("/api/graph");
      const data = await res.json();
      setMyData(data.graph);
    };
    getGraph();

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (!myData) return null;

  return (
    <div className="absolute inset-0 z-0 w-full h-full text-center">
      <ForceGraph3D
        ref={graphRef}
        graphData={myData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        nodeResolution={100}
        linkDirectionalParticles={2}
        linkDirectionalParticleResolution={12}
        backgroundColor={"rgba(0,0,0,0)"}
        onNodeClick={(node) => {
          // Aim at node from outside it
          const distance = 40;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

          const newPos = node.x || node.y || node.z
            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

          graphRef.current.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            1000 // ms transition duration
          );
        }}
        linkColor={() =>
          document.documentElement.classList.contains("dark")
            ? "#ffffff"
            : "#000000"
        }
        linkVisibility={true}
        linkOpacity={0.8}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

export default Graph;
