"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "aframe";
import { useRouter } from "next/navigation";

import { buildNote } from "@/lib/notetaker";

const ForceGraph3D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph3D),
  { ssr: false }
);

const Graph = () => {
  const router = useRouter();
  const [myData, setMyData] = useState<any>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);

  const graphRef = React.useRef<any>(null);

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
        onNodeClick={async (node: any) => {
          // Aim at node from outside it
          const distance = 75;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

          const newPos = node.x || node.y || node.z
            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

          graphRef.current.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            2500 // ms transition duration
          );

          // Find the note date
          const res = await fetch("/api/notes/find?name=" + node.id);
          const date = await res.json();

          setSelectedNote(date === "undefined" ? null : date);
          setShowButton(false); // Reset button visibility

          // Show button after delay
          setTimeout(() => {
            setShowButton(true);
          }, 2500); // Match the camera transition duration
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
      {selectedNote && showButton && (
        <div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          style={{ fontFamily: "DM Sans, Helvetica" }}
        >
          <button
            onClick={() => router.push(`/notes/${selectedNote}`)}
            className="px-6 py-3 bg-[#faf9f6] dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                     text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors
                     shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
          >
            Open Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Graph;
