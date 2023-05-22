import React, { Component } from "react";
import ReactAvatarEditor from 'react-avatar-editor'
import Modal from "../components/Modal"

import AuthService from "../services/auth.service";

export default class CoffeePrint extends Component {
  constructor(props) {
    super(props);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);

    this.state = {
      image: 'avatar.jpg',
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 500,
      height: 500,
      editor: null
    };
  }
  

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  setEditorRef = (editor) => (this.editor = editor)

  render() {
    return (
      <div>
          <div>
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.state.height}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.width / 2}
              image={this.state.image}
              className="editor-canvas"
            />
          </div>
        <br />
        New File:
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
         <button onClick={() => {
          if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.current.getImageScaledToCanvas()
          }
        }}>Save</button>
      </div>
    )
  }
}