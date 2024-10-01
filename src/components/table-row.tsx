import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { v4 as uuid } from "uuid";

interface TableRowProps {
  onExpand: () => void;
  data: TableNodeData;
  isExpanded?: boolean;
  onUpdate: (id: string, data: Partial<TableNodeData>) => void;
  id: string;
}

const TableRow = ({
  onExpand,
  data,
  isExpanded,
  onUpdate,
  id,
}: TableRowProps) => {
  const Chevron = isExpanded ? ChevronUp : ChevronDown;

  const [isLabelEditable, setIsLabelEditable] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    onUpdate(id, { label: e.target.value });
  };

  const enableEdit = () => {
    setLabel(data.label);
    setIsLabelEditable(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsLabelEditable(false);
    }
  };

  const handleAddColumn = () => {
    const newCol = {
      name: `column${data.columns.length + 1}`,
      type: "bigint",
      id: uuid(),
    };

    onUpdate(id, { ...data, columns: [...data.columns, newCol] });
  };

  const handleRemoveColumn = (toRemove: string) => {
    onUpdate(id, {
      ...data,
      columns: data.columns.filter((el) => el.id != toRemove),
    });
  };

  return (
    <div className="bg-neutral-50 pt-3 rounded-md space-y-2">
      <div className="flex justify-between items-center  border-b px-3 pb-3">
        <div className="flex items-center gap-1">
          <Chevron
            onClick={onExpand}
            role="button"
            className="text-muted-foreground size-4"
          />

          {isLabelEditable ? (
            <input
              value={label}
              className="w-fit"
              onChange={handleNameChange}
              onKeyDown={onKeyDown}
            />
          ) : (
            <h3 onClick={enableEdit} className="text-sm font-bold">
              {label}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <MoreHorizontal
            role="button"
            className="text-muted-foreground size-4"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="pl-5 pr-3 text-xs space-y-1 pb-3">
          {data.columns.map((el) => (
            <div key={el.id} className="flex gap-x-3 items-center ">
              <Input defaultValue={el.name} className="flex-1" />
              <Input defaultValue={el.type} className="flex-1" />

              {/* <Button variant={"secondary"} size={"icon"} className="px-3">
                <Key className="size-4" />
              </Button> */}
              <TrashIcon
                role="button"
                className="size-4"
                onClick={() => {
                  handleRemoveColumn(el.id);
                }}
              />
            </div>
          ))}
          <div className="flex justify-end pt-3">
            <Button size={"sm"} onClick={handleAddColumn}>
              Add column
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRow;
