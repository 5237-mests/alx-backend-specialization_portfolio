import { useState } from 'react';
import API from './API';

function BulkInsertQuestions() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick =  async () => {
    if (!file) {
      return;
    }

    const csrf = API.get("auth/getcsrf/");

    API.defaults.headers["X-CSRFToken"] = `${(await csrf).data.csrftoken}`;

    const formData = new FormData();
    formData.append('file', file);

    await API.post("api/add-questions/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <div className='view-result mt-5 container '>
      <h3>The file must be csv tye.</h3>
      <h5><strong>Hint:</strong>You can prepare the file using Excel. On the first row give the name, "text" for questions, "cha" for choice A, "chb" for choice B, "chc" for choice C, "chd" for choice D, "ans" for anwser and "job" for JobCode.</h5>
      <input className='btn btn-info  p-3' type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button className='btn btn-primary mt-3' onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default BulkInsertQuestions;
