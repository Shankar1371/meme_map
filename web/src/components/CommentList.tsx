import { useState } from 'react';
import { postComment } from '../lib/api';

export default function CommentList({ comments: initial, memeId }: { comments: any[]; memeId: string }) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState('');
  const submit = async () => {
    const c = await postComment(memeId, text);
    setComments([...comments, c]);
    setText('');
  };
  return (
    <div>
      {comments.map(c => <div key={c.id}>{c.body}</div>)}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={submit}>Comment</button>
    </div>
  );
}
