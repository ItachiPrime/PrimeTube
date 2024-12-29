import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VideoPlayer = () => {
  const { videoId } = useParams();

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="10"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;