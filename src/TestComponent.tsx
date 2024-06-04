import { useEffect, useState } from "react";
import DragNdrop from "./DragNdrop";
import PlotSpectra from "./PlotSpectra";

function TestComponent() {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    console.table(files);
  }, [files]);
  return (
    <div>
      <DragNdrop onFilesSelected={setFiles} width="300px" height="400px" />
      <PlotSpectra />
    </div>
  );
}

export default TestComponent;
