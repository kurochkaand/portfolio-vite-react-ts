import SpectraPlotComponent from "./SpectraPlotComponent";
import DragNdrop from "./DragNdrop";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect, useRef, useState } from "react";
import { useContainerDimensions } from "./useContainerDimensions";

function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(componentRef);

  useEffect(() => {
    console.log(`width is ${width}`);
    console.log(`height is ${height}`);
  }, [width, height]);
  return (
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
  );
}

export default HomePage;
