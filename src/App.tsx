import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import TestComponent from "./TestComponent";
import DragNdrop from "./DragNdrop";
import { useEffect, useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    console.table(files);
  }, [files]);
  return (
    <>
      <HeaderComponent />
      <DragNdrop height={200} width={200} onFilesSelected={setFiles} />
      <TestComponent />
      <FooterComponent />
    </>
  );
}
export default App;
