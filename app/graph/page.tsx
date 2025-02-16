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
    <div
      className="absolute inset-0 z-0 w-full h-full text-center"
    >
      <ForceGraph3D
        graphData={myData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        nodeResolution={100}
        linkDirectionalParticles={2}
        linkDirectionalParticleResolution={12}
        backgroundColor={document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#FAF9F6'}
        linkColor={() => document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000'}
        linkVisibility={true}
        linkOpacity={0.8}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

export default Graph;
