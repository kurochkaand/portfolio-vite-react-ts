import { useEffect, useState } from "react";
import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  PlotController,
  useRectangularZoom,
} from "react-plot";

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
    if (props.files && props.files.length > 0) {
      console.log(JSON.stringify(data[0].slice(0, 10)));
    }
  }, [data]);

  useEffect(() => {
    const readFiles = async () => {
      if (props.files && props.files.length > 0) {
        const dataArray: SeriesPoint[][] = await Promise.all(
          props.files.map(async (item) => {
            const text = await item.text();
            const lines = text.split("\r\n");
            const coordinates: SeriesPoint[] = [];
            lines.map((line) => {
              const [x, y] = line.split("\t").map(parseFloat);
              if (!isNaN(x) && !isNaN(y)) {
                coordinates.push({ x, y });
              }
            });

            return coordinates;
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
        flip={false}
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
