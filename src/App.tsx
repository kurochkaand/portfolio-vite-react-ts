import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SpectraPlotComponent from "./SpectraPlotComponent";
import DragNdrop from "./DragNdrop";
import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useContainerDimensions } from "./useContainerDimensions";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(componentRef);

  useEffect(() => {
    console.log(`width is ${width}`);
    console.log(`height is ${height}`);
  }, [width, height]);

  return (
    <>
      <HeaderComponent />
      <Container>
        <Row>
          <Col md={3}>
            <DragNdrop onFilesSelected={setFiles} />
          </Col>
          <Col md={9} ref={componentRef}>
            <SpectraPlotComponent files={files} width={width} height={height} />
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
}
export default App;
