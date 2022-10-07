import React, { useState, useEffect } from 'react';

const ImageUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    console.log('useEffect');
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  return (
    <div>
      {selectedFile &&  <img src={preview} alt='img' className='w-64 mb-4' /> }
      <input type='file' onChange={onSelectFile} />
    </div>
  );
}

export default ImageUpload;