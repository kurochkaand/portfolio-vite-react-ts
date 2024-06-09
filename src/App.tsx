import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SpectraPlotComponent from "./SpectraPlotComponent";
import DragNdrop from "./DragNdrop";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <HeaderComponent />
      <DragNdrop height={200} width={200} onFilesSelected={setFiles} />
      <SpectraPlotComponent files={files} />
      <FooterComponent />
    </>
  );
}
export default App;
