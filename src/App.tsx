import React, { Component, ChangeEvent } from "react";

interface AppProps {}

interface AppState {}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  showFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          const text = e.target.result;
          console.log(text);
          alert(text);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      width: 300,
      textAlign: "center",
      border: "2px dashed #4282fe",
    };

    return (
      <div style={containerStyle}>
        <input type="file" onChange={(e) => this.showFile(e)} />
      </div>
    );
  }
}

export default App;
