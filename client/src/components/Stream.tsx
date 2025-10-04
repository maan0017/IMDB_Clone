import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const StreamMovie: React.FC = () => {
  const { yt_id } = useParams<{ yt_id: string }>();

  if (!yt_id) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-300">
        <p>Invalid video ID.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="w-full max-w-4xl aspect-video shadow-lg rounded-lg overflow-hidden">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${yt_id}`}
          controls
          playing
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default StreamMovie;
