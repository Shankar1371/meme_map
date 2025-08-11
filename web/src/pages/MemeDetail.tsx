import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MemeCard from '../components/MemeCard';
import CommentList from '../components/CommentList';
import ReportButton from '../components/ReportButton';
import { fetchMeme, fetchComments } from '../lib/api';

export default function MemeDetail() {
  const { id } = useParams();
  const [meme, setMeme] = useState<any>();
  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    if (id) {
      fetchMeme(id).then(setMeme);
      fetchComments(id).then(setComments);
    }
  }, [id]);
  if (!meme) return null;
  return (
    <div>
      <MemeCard meme={meme} />
      <ReportButton memeId={id!} />
      <CommentList comments={comments} memeId={id!} />
    </div>
  );
}
