import React, { useState, useEffect, useRef, useCallback } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Button, Modal } from 'react-bootstrap';
import './App.css';

const svgUrl = "http://localhost:3000/corpo-avatar.svg";

export default function App() {
  const [svgReady, setSvgReady] = useState(false);
  const [show, setShow] = useState(false);
  const [part, setPart] = useState("");
  const svgRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBodyPartsIds = useCallback(() => {
    const arrayOfIds = [ 
      "head", 
      "neck", 
      "left-shoulder",
      "right-shoulder",
      "left-arm",
      "right-arm",
      "right-hand", 
      "left-hand", 
      "chest",
      "upper-abdomen",
      "lower-abdomen",
      "pelvis",
      "right-breech",
      "left-breech",
      "right-leg",
      "left-leg",
      "right-foot",
      "left-foot"
    ] ;
    return arrayOfIds || null;
  }, []);

  useEffect(() => {
    if (svgReady) {
      getBodyPartsIds().forEach((item) => {
        document.getElementById(`${item}`).addEventListener(
          'mouseover', function( event ) {   
            // highlight the mouseenter target
            event.target.style.cursor = "pointer";
            event.target.style.transition = "fill 0.5s";
            event.target.style.fill = "red";
          }, false
        );
        document.getElementById(`${item}`).addEventListener(
          'mouseleave', function( event ) {   
            // highlight the mouseenter target
            event.target.style.fill = "black";
          }, false
        );
        document.getElementById(`${item}`).addEventListener('click', function( event ) { 
          setPart(event.target.id)
          handleShow();
        });
      });
    }
  }, [svgReady]);

  return (
    <React.Fragment>
      <div>
        <SvgLoader 
          path={svgUrl}
          onSVGReady={() => setSvgReady(true)}
          ref={svgRef}
          id="svg-container"
        >
          {/* Important! this proxy will reset the color to black,
            otherwise old elements would still be shown in red
            because this library doesn't store previous states */}
          <SvgProxy selector={"path"} fill="black" />
        </SvgLoader>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Woohoo, you discovered a body part!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is <strong>{part}</strong></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            keep exploring!
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};