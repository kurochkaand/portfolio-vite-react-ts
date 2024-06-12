import { useEffect, useState } from "react";
import { xyToXYObject } from "ml-spectra-processing";
import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  PlotController,
  useRectangularZoom,
} from "react-plot";
import { convert as convertJcamp } from "jcampconverter";

interface InfraredZoomablePlotProps {
  files: File[] | undefined;
  width: number;
  height: number;
}

export default function InfraredZoomablePlot(props: InfraredZoomablePlotProps) {
  return (
    <PlotController>
      <ZoomablePlot
        files={props.files}
        width={props.width}
        height={props.height}
      />
    </PlotController>
  );
}

interface SeriesPoint {
  x: number;
  y: number;
}

interface ZoomablePlotProps {
  files: File[] | undefined;
  width: number;
  height: number;
}

function ZoomablePlot(props: ZoomablePlotProps) {
  const [data, setData] = useState<SeriesPoint[][]>([]);
  const zoom = useRectangularZoom();

  useEffect(() => {
    console.log(typeof data);
  }, [data]);

  useEffect(() => {
    const readFiles = async () => {
      if (props.files && props.files.length > 0) {
        const dataArray: SeriesPoint[][] = await Promise.all(
          props.files.map(async (item) => {
            const text = await item.text();
            const jcampData = convertJcamp(text).flatten[0].spectra[0].data;
            return xyToXYObject(jcampData).map(
              (point: { x: number; y: number }) => ({
                x: point.x,
                y: point.y,
              })
            );
          })
        );
        setData(dataArray);
      } else {
        setData([[{ x: 0, y: 0 }]]);
      }
    };
    readFiles();
  }, [props.files]);

  return (
    <Plot width={props.width} height={props.height}>
      {data.map((item) => (
        <LineSeries key={crypto.randomUUID()} data={item} xAxis="x" yAxis="y" />
      ))}

      <Axis
        id="x"
        position="bottom"
        label="Wavenumber (cm-1)"
        displayPrimaryGridLines
        flip={true}
      />
      <Axis
        id="y"
        position="left"
        label="Transmitance"
        displayPrimaryGridLines
      />
      <Annotations>{zoom.annotations}</Annotations>
    </Plot>
  );
}
