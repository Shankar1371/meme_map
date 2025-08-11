import VoteButtons from './VoteButtons';
import styles from './MemeCard.module.css';

export default function MemeCard({ meme }: { meme: any }) {
  return (
    <div className={styles['meme-card']}>
      <img src={meme.image_url} alt="meme" width={200} />
      <div className="texts">
        <p>{meme.text_top}</p>
        <p>{meme.text_bottom}</p>
      </div>
      <VoteButtons memeId={meme.id} score={meme.score} />
      <div>{meme.comment_count} comments</div>
      <button onClick={() => navigator.share?.({ url: `/m/${meme.id}` })}>Share</button>
    </div>
  );
}
