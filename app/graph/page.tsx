"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "aframe";

import { buildNote } from "@/lib/notetaker";

// import { getGraph } from "@/lib/storage";

// import { ForceGraph3D } from "react-force-graph-3d";
const ForceGraph3D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph3D),
  { ssr: false }
);
//myData is { nodes: [], links: [] }

// let myData = import

// id is the title of the chunk, group is number, content is snapshot. 
// let myData = getGraph();

const Graph = () => {
    const [myData, setMyData] = useState<any>();

    useEffect(() => {
        const getGraph = async () => {
            const res = await fetch("/api/graph");
            const data = await res.json();
            setMyData(data.graph);
        };
        getGraph();

        console.log(myData);
    }, [])

    return (
        <div>
            <ForceGraph3D
                graphData={myData}
                nodeLabel="id"
                nodeAutoColorBy="group"
                // onNodeClick={handleClick}
                nodeResolution={50}
                linkDirectionalParticles={1}
                linkDirectionalParticleResolution={12}
                // scene={(e) => {
                //     console.log(e)
                // }}
                backgroundColor="#FAF9F6"
                linkColor="black"
                linkOpacity={1}
                width = {400}
                height = {400}
            />
        </div>
    );
};

export default Graph;
