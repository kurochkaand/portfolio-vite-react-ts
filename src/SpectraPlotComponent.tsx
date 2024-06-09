import { useEffect, useState } from "react";
import { xyToXYObject } from "ml-spectra-processing";
import { Annotations, Axis, LineSeries, Plot, PlotController, SeriesPoint, useRectangularZoom } from "react-plot";
import { convert as convertJcamp } from "jcampconverter";

interface InfraredZoomablePlotProps {
  files: File[] | undefined;
}

export default function InfraredZoomablePlot(props: InfraredZoomablePlotProps) {
  return (
    <PlotController>
      <ZoomablePlot files={props.files} />
    </PlotController>
  );
}

interface ZoomablePlotProps {
  files: File[] | undefined;
}

function ZoomablePlot(props: ZoomablePlotProps) {
  const [data, setData] = useState<SeriesPoint[]>([]);
  const zoom = useRectangularZoom();

  useEffect(() => {
    const fetchData = async () => {
      if (props.files && props.files.length > 0) {
        const response = props.files[0];
        const jcamp = await response.text();
        const jcampData = convertJcamp(jcamp).flatten[0].spectra[0].data;
        const xyData = xyToXYObject(jcampData).map((point: { x: number; y: number }) => ({
          x: point.x,
          y: point.y,
        }));
        setData(xyData);
      } else {
        setData([{ x: 0, y: 0 }]);
      }
    };
    fetchData();
  }, [props.files]);

  return (
    <Plot width={800} height={300}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="Wavenumber (cm-1)" displayPrimaryGridLines flip={true} />
      <Axis id="y" position="left" label="Transmitance" displayPrimaryGridLines />
      <Annotations>{zoom.annotations}</Annotations>
    </Plot>
  );
}
