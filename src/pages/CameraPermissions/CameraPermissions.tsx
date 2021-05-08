import React from 'react';
import './CameraPermissions.css';

const CameraPermissions:React.FC = () =>
  <div className="App CameraPermissions">
    <div className="TextBox">
    The Osmotic Passage is a real-time interactive work by
crosslucid.<br />
This atmospherically meditative and hallucinatory experience of
undefined length, requires from You - the user - to follow a set of
simple instructions, leading to an initiation pose, a trigger for this
shimmering journey. An input from Your camera will be used to
drive the experience forward, nonetheless no images or videos
will be stored outside of the browser. Should You choose to
navigate long enough through the lucid trail, a bespoke content
might be spawned
    </div>
    <div className="Credits">
    Credits:
    <br />
      experience: crosslucid | soundscape: Giacomo Gianetta <br />
      GAN data alchemists: Martino Sarolli / Emanuela Quaranta <br />
       amulet / merchandise in collaboration with Craig Barrow <br />
       (c) 2021
    </div>
  </div>;

export default CameraPermissions;