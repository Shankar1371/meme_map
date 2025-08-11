import { useState } from 'react';
import { uploadMeme } from '../lib/api';

export default function CreateMeme() {
  const [file, setFile] = useState<File | null>(null);
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');

  const handleSubmit = async () => {
    if (!file) return;
    await uploadMeme({ file, text_top: textTop, text_bottom: textBottom, lat: 0, lng: 0 });
    // TODO: redirect after upload
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input value={textTop} onChange={e => setTextTop(e.target.value)} placeholder="Top text" />
      <input value={textBottom} onChange={e => setTextBottom(e.target.value)} placeholder="Bottom text" />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
