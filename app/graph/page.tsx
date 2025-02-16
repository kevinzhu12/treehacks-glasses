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
    // <main style={{
    //     position: "relative",
    //     width: "100vw",
    //     height: "100vh",
    //     overflow: "hidden",
    //     textAlign: "center"
    // }}>
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <ForceGraph3D
        graphData={myData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        nodeResolution={100}
        linkDirectionalParticles={1}
        linkDirectionalParticleResolution={12}
        backgroundColor="#FAF9F6"
        // linkColor="#000000"
        linkVisibility={true}
        linkOpacity={1}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
    // </main>
  );
};

export default Graph;
