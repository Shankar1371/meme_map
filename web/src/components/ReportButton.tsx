import { reportMeme } from '../lib/api';

export default function ReportButton({ memeId }: { memeId: string }) {
  return <button onClick={() => reportMeme(memeId, 'inappropriate')}>Report</button>;
}
