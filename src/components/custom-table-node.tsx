import { Handle, Position } from "@xyflow/react";

interface CustomTableNodeProps {
  data: TableNodeData;
}

function CustomTableNode({ data }: CustomTableNodeProps) {
  return (
    <>
      <div className="border rounded-md bg-white min-w-64 shadow-sm">
        <h1 className="text-sm font-bold text-center flex items-center justify-center border-b bg-primary/10 h-[35px]">
          <span>{data.label}</span>
        </h1>
        <div className="px-3">
          {data.columns?.map((col, index) => (
            <div className="group " key={col.id}>
              <div
                key={col.name}
                className="flex justify-between items-center h-[30px]"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{col.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground lowercase">
                    {col.type}
                  </p>
                </div>
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`r_${col.name}`}
                style={{
                  top: `${index == 0 ? 50 : 35 + index * 30 + 15}px`,
                  background: "#555",
                }}
                isConnectable
              />
              <Handle
                type="target"
                position={Position.Left}
                id={`l_${col.name}`}
                style={{
                  top: `${index == 0 ? 50 : 35 + index * 30 + 15}px`,

                  background: "#555",
                }}
                isConnectable
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomTableNode;
