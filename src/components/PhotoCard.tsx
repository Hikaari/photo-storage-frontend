import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Photo {
  id: number;
  public_url: string;
  created_at: string;
  hashtags: Array<{ id: number; name: string }>;
}

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard = ({ photo }: PhotoCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      to={`/photo/${photo.id}`}
      className="group block rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth bg-card"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={photo.public_url}
          alt="Photo"
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(photo.created_at)}</span>
        </div>
        {photo.hashtags && photo.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {photo.hashtags.slice(0, 3).map((hashtag) => (
              <Badge key={hashtag.id} variant="secondary" className="text-xs">
                #{hashtag.name}
              </Badge>
            ))}
            {photo.hashtags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{photo.hashtags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
