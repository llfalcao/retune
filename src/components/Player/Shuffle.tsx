import { ShuffleRounded } from "@material-ui/icons";
import useAudioPlayer from "@/hooks/useAudioPlayer";

export default function Shuffle() {
  const { shuffle, onShuffle } = useAudioPlayer();

  return (
    <button
      className={`player__shuffle ${
        shuffle ? "player__btn--active" : ""
      }`.trim()}
      aria-label="Shuffle Playlist"
      onClick={onShuffle}
    >
      <ShuffleRounded />
    </button>
  );
}
