import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import CustomTableNode from "./components/custom-table-node";
import TableRow from "./components/table-row";
import { v4 as uuid } from "uuid";

const initialNodes: any[] = [];
const initialEdges: any = [];

export default function App() {
  const nodeTypes = useMemo(() => ({ table: CustomTableNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [expands, setExpands] = useState<Record<string, boolean>>({});

  const onExpand = (id: string) => {
    setExpands((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = ({ label }: { label?: string }) => {
    setNodes((prev) => {
      return [
        ...prev,
        {
          id: ((prev.length || 0) + 1).toString(),
          position: { x: 0, y: 100 },
          data: {
            label: label || `table_${(prev.length || 0) + 1}`,
            columns: [{ name: "id", type: "bigint", id: uuid() }],
          },
          type: "table",
        },
      ];
    });
  };

  const handleUpdateNote = (id: string, data: Partial<TableNodeData>) => {
    setNodes((prev) => {
      return prev.map((el) =>
        el.id == id ? { ...el, data: { ...el.data, ...data } } : el
      );
    });
  };

  return (
    <div className="flex ">
      <div className="w-[25%] h-screen bg-primary/5 px-3 py-5">
        <h1 className="text-xl font-bold">Query Builder</h1>

        <Button onClick={handleAddNode.bind(null, {})} className="w-full mt-4">
          <Plus className="size-4 mr-2" />
          New Table
        </Button>
        <div className="flex flex-col gap-y-2 mt-6">
          {nodes.map((el) => (
            <TableRow
              onUpdate={handleUpdateNote}
              key={el.id}
              id={el.id}
              data={el.data}
              isExpanded={!!expands[el.id]}
              onExpand={() => {
                onExpand(el.id);
              }}
            />
          ))}
        </div>
      </div>
      <div className="w-[calc(100%-25%)] h-screen">
        <ReactFlow
          selectionOnDrag
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onPaneScroll={(e) => {
            console.log(e);
          }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
