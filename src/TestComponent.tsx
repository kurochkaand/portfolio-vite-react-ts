import { useEffect, useState } from "react";
import DragNdrop from "./DragNdrop";

function TestComponent() {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    console.table(files);
  }, [files]);
  return (
    <div>
      <DragNdrop onFilesSelected={setFiles} width="300px" height="400px" />
    </div>
  );
}

export default TestComponent;
